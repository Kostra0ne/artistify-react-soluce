import React, { Component } from "react";
import FormComment from "../form/FormComment";
import apiHandler from "../../api/APIHandler";

import Comment from "./Comment";

export default class Comments extends Component {
  state = {
    comments: []
  };

  componentDidMount() {
    console.log(this.props)
    this.updateState();
  }

  updateState = async () => {
    const apiRes = await apiHandler.get(`/comments/${this.props.type}/${this.props.id}`);
    this.setState({ comments: apiRes.data.comments }, () => {
      console.log(this.state);
    });
  };

  postComment = async message => {
    if (!message) return;
    await apiHandler.post(`/comments/${this.props.type}/${this.props.id}`, { message });
    this.updateState();
  };

  render() {
    const { comments } = this.state;

    return (
      <div className="comments">
        <header className="header">
          <h1 className="title medium">express y@self</h1>
          <FormComment clbk={this.postComment} />
        </header>
        {!comments.length ? (
          <p>no comments yet :/</p>
        ) : (
          comments.map((c, i) => <Comment data={c} key={i} />)
        )}
      </div>
    );
  }
}
