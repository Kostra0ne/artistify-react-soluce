import React, { useContext, useState } from "react";
import IconAvatarAdmin from "../icon/IconAvatarAdmin";
import UserContext from "../../auth/UserContext";
// styles
import "../../styles/form.css";

export default function FormEditAccount() {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;

  const [newAvatar, setAvatar] = useState(
    currentUser ? currentUser.avatar : ""
  );

  const [newAvatarTmp, setAvatarTmp] = useState("");
  const [newEmail, setEmail] = useState(currentUser ? currentUser.email : "");
  const [newUsername, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("12345");
  const [oldPassword, setOldPassword] = useState("12345");

  const handleSubmit = e => {
    e.preventDefault();
    console.log("new user infos => @ todo send data to server for patch");
    console.log(newEmail, newAvatar, newUsername, oldPassword, newPassword);
  };

  const handleAvatar = file => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // when the fileReader ends reading image  ...
      const baseString = reader.result;
      setAvatar(file);
      setAvatarTmp(baseString); // set the tmp avatar as an image source before upload
    };
    reader.readAsDataURL(file); // read the file from the local disk
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="title diy">D.I.Y (Form Edit Profile)</h3>
      <p className="parag">
        The profile update process is incomplete...<br></br>
        Use the provided code and send the state to server with axios.
        <br />
        ---------------------------
      </p>

      <div className="row">
        <IconAvatarAdmin
          avatar={newAvatarTmp || currentUser.avatar}
          clbk={e => handleAvatar(e.target.files[0])}
        />

        <div>
          <p>Welcome {currentUser.username} </p>
          <h2 className="title medium">Edit your account</h2>
        </div>
      </div>
      <div>
        <label htmlFor="email">email</label>
        <input
          className="input"
          id="email"
          type="email"
          defaultValue={currentUser.email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="username">username</label>
        <input
          className="input"
          id="username"
          type="text"
          defaultValue={currentUser.username}
          onChange={e => setUsername(e.target.value)}
        />
        <label htmlFor="password">old password</label>
        <input
          className="input"
          id="old-password"
          type="password"
          placeholder="your previous password here"
          onChange={e => setOldPassword(e.target.value)}
        />
        <label htmlFor="password">new password</label>
        <input
          className="input"
          id="new-pasword"
          type="password"
          placeholder="your new password here"
          onChange={e => setNewPassword(e.target.value)}
        />

        <button className="btn">ok</button>
      </div>
    </form>
  );
}
