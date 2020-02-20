import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
// custom tools
import apiHandler from "../api/APIHandler";
import { getTableRowsTemplate } from "./../components/admin/AdminTableRows";
import Head from "./../components/admin/AdminTableHead";
import IconPlusAdmin from "./../components/icon/IconPlusAdmin";
// styles
import "./../styles/table.css";
import "./../styles/icon-color.css";
// IMPORTANT NOTE :
// The AdminTables component below uses genericity
// for your project : Be aware that it's really easier to create separate tables components for your different collection
// ...

const headColumns = {
  artists: ["name", "style", "rates"],
  albums: ["name", "release", "rates", "label"],
  labels: ["name", "country", "city"],
  styles: ["name", "color"]
};

let RowTds;
let _endpoint;

export default class AdminTables extends Component {
  state = {
    resources: [],
    headColumns: []
  };

  updateState = async () => {
    try {
      const res = await apiHandler.get(`/${_endpoint}`);
      RowTds = getTableRowsTemplate(_endpoint);

      this.setState({
        resources: res.data[_endpoint],
        headColumns: headColumns[_endpoint]
      });
    } catch (err) {
      this.setState({
        resources: []
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.endpoint !== this.props.match.params.endpoint) {
      _endpoint = this.props.match.params.endpoint;
      this.updateState();
    }
  }

  componentDidMount() {
    _endpoint = this.props.match.params.endpoint;
    this.updateState();
  }

  handleDeleteRow = async e => {
    try {
      await apiHandler.delete(
        _endpoint,
        e.target.getAttribute("data-ressource-id")
      );
      this.updateState();
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { headColumns, resources } = this.state;

    return (
      <React.Fragment>
        <h1 className="title">
          <span>Admin {_endpoint}</span>
          <IconPlusAdmin endpoint={_endpoint} />
        </h1>

        {!resources.length ? (
          <p>Sorry ! No resources yet :/</p>
        ) : (
          <table className="table">
            <thead>
              <Head columns={headColumns} />
            </thead>

            <tbody>
              {resources.map((r, i) => (
                <tr key={i}>
                  <RowTds key={i} data={r} />
                  {/* TODO CODE ONE MODULE FOR ACTION TDS */}
                  <th
                    data-ressource-id={r._id}
                    className="is-clickable"
                  >
                    <Link
                      className="link"
                      to={`/admin/${_endpoint}/edit/${r._id}`}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                  </th>
                  <th
                    onClick={this.handleDeleteRow}
                    data-ressource-id={r._id}
                    className="is-clickable"
                  >
                    <FontAwesomeIcon
                      className="no-pointer-events"
                      icon={faTimes}
                    />
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </React.Fragment>
    );
  }
}
