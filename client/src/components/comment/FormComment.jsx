import React, { useState, useRef } from 'react';
import withRouter from "../../auth/withRouter";
import apiHandler from "../../api/APIHandler";

export default withRouter(function FormComment({ pushComment, match, resourceType }) {
    const [message, setMessage] = useState("");
    const refForm = useRef(null);
    const handleChange = e => setMessage(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();
        apiHandler.post(`/comments/${resourceType}/${match.params.id}`, { message })
            .then(apiRes => {
                pushComment(apiRes.data);
                refForm.current.reset();
            })
            .catch(apiErr => console.error(apiErr))
    }

    return (
        <form className="header form"
            ref={refForm}
            onSubmit={handleSubmit}
            onChange={handleChange}>
            <h1 className="title">express y@self</h1>
            <div className="row">
                <input type="text" className="input" placeholder="leave a comment here" />
                <button className="btn">post</button>
            </div>
        </form>
    )
});
