import React, { useState, useEffect } from "react";
import withRouter from "../../auth/withRouter";
import apiHandler from "../../api/APIHandler";
import FormComment from "./FormComment";
import Comment from "./Comment";

export default withRouter(function Comments({ resourceType, match }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    apiHandler.get(`/comments/${resourceType}/${match.params.id}`)
      .then(({ data }) => setComments(data))
      .catch(apiErr => console.error(apiErr))
  }, []);

  const pushComment = (c) => {
    setComments(prev => [c, ...prev])
  };

  return (
    <div className="comments">
      <FormComment pushComment={pushComment} resourceType={resourceType} />
      {
        comments.map((c, i) => (
          <Comment key={i} data={c} />
        ))
      }
    </div>
  )
});
