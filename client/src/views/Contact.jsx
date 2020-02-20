import React from "react";
// custom tools
import FormContact from "../components/form/FormContact";

export default function Contact() {
  return (
    <React.Fragment>
      <h1 className="title diy">D.I.Y</h1>
      <p className="parag">
        Use the provided client/server code to send email messages.<br />
        Use the course's form snippet to code the react component !<br />
        The server side code should integrate the nodemailer library !
        <br />
        This{" "}
        <a
          href="https://codeburst.io/sending-an-email-using-nodemailer-gmail-7cfa0712a799"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          tutorial
        </a>{" "}
        may be usefull :)
      </p>
      <hr />
      <FormContact />
    </React.Fragment>
  );
}
