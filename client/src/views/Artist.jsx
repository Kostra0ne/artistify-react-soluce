import React, { useState, useEffect, useContext } from "react";
// custom tools
import apiHandler from "../api/APIHandler";
import CardAlbum from "../components/card/CardAlbum";
import Comments from "../components/comment/Comments";
import List from "../components/List";
import Stars from "../components/star/Stars";
import UserContext from "./../auth/UserContext";
// styles
import "./../styles/artist.css";
import "./../styles/comment.css";
import "./../styles/star.css";

export default function Artists({ match }) {
  const [artist, setArtist] = useState({});
  const [albums, setAlbums] = useState([]);
  const [userRate, setUserRate] = useState(0);
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;

  const getArtist = async () => {
    const apiRes = await apiHandler.get(`/artists/${match.params.id}`);
    setArtist(apiRes.data.artist);
    setAlbums(apiRes.data.albums);
  };

  const getUserRate = async () => {
    const apiRes = await apiHandler.get(
      `/rates/artists/${match.params.id}/users/${currentUser._id}`
    );
    setUserRate(apiRes.data.userRate);
  };

  const updateUserRate = async evt => {
    try {
      const rate = Number(evt.currentTarget.getAttribute("data-rate"));
      await apiHandler.patch(`/rates/artists/${match.params.id}/`, { rate });
      getArtist();
      getUserRate();
    } catch (apiErr) {
      console.error(apiErr);
    }
  };

  useEffect(() => {
    try {
      getArtist();
      if (currentUser._id) getUserRate();
    } catch (err) {
      console.error(err);
    }
  }, [currentUser]);

  return (
    <>
      <h1 className="title">D.I.Y (Artist)</h1>
      <p>
        Use the image below to code the {`<Artist />`} component.
        <br />
        This component import child components: {`<Stars />`}, {`<Comments />`}{" "}
        and {`<Discography />`}
      </p>

      <h1 className="title">D.I.Y (Stars)</h1>
      <p>
        The Stars component allow the end-users to rate an artist/album.
        <br />
        The black stars represent the average rate for a give resource.
        <br />
        The yellow stars represent the logged in user rate.
        <br />
        Bonus: make it modular to rate labels/styles as well.
      </p>

      <hr />

      <h1 className="title">D.I.Y (Discography)</h1>
      <p>
        Code a Discography component displaying all the albums related to the
        current artist if any, else display the appropriate message.
        <br />
      </p>
      <hr />

      <h1 className="title">D.I.Y (Comments)</h1>
      <p>
        Import a custom {`<Comments />`} allowing the end-users to post comments in database
        related to the current artist.
        <br />
      </p>

      <div className="page artist">
        <h1 className="title">{artist.name}</h1>
        <p className="description">{artist.description}</p>

        <div className="all-stars">
          <Stars avgRate={artist.avg} title="average rate" />
          <Stars
            css="user"
            avgRate={userRate}
            clbk={updateUserRate}
            title="your rate"
          />
        </div>
        <Comments id={match.params.id} type="artist" />
        <div className="discography">
          <h2 className="title">Discography</h2>
          <List
            data={albums}
            Component={CardAlbum}
            cssList="grid albums mini"
            cssItem="album"
          />
        </div>
      </div>
    </>
  );
}
