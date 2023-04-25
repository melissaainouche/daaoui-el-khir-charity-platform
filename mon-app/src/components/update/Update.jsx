import React, { useContext, useState } from "react";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateProfile,
  updateEmail,
} from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { v4 as uuid } from "uuid";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import "./update.scss";

const Update = () => {
  const [data, setData] = useState({
    username: "",
    newEmail: "",
    oldPassword: "",
  });
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (img) {
      const storageRef = ref(storage, "usersImages/" + uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(currentUser, {
              photoURL: downloadURL,
              displayName: data.username,
            });

            const credential = EmailAuthProvider.credential(
              currentUser.email,
              data.oldPassword
            );

            await reauthenticateWithCredential(currentUser, credential).then(
              async () => {
                // User re-authenticated.
                await updateEmail(currentUser, data.newEmail);
              }
            );
          });
        }
      );
    } else {
      await updateProfile(currentUser, {
        displayName: data.username,
      });
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        data.oldPassword
      );

      await reauthenticateWithCredential(currentUser, credential).then(
        async () => {
          // User re-authenticated.
          await updateEmail(currentUser, data.newEmail);
        }
      );
    }

    navigate("/login");
  };
  // console.log(data);
  return (
    <div className="update">
      <div className="updateWrapper">
        <h3 className="updateTitle">Modifier le profil</h3>
        <span>Adresse E-mail: {currentUser.email}</span>

        <div className="updateContainer">
          <form onSubmit={handleUpdate}>
            <div className="formItem">
              <span>Photo de profil</span>
              <div className="profilePic">
                <img
                  src={
                    img
                      ? URL.createObjectURL(img)
                      : "/Photos/DefaultProfile.jpeg"
                  }
                  alt=""
                  className="profileImg"
                />
                <label htmlFor="file">
                  <span className="change">Importer</span>
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setImg(e.target.files[0])}
                />
              </div>
            </div>
            <div className="formItem">
              <label>Nom d'utilisateur</label>
              <input
                className="formInput"
                type="text"
                name="username"
                placeholder={currentUser.displayName}
                onChange={handleChange}
              />
            </div>
            <div className="formItem">
              <label>E-mail</label>
              <input
                className="formInput"
                type="email"
                name="newEmail"
                placeholder={currentUser.email}
                onChange={handleChange}
              />
            </div>
            <div className="formItem">
              <label>Mot de passe</label>
              <input
                className="formInput"
                name="oldPassword"
                type="password"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="updateButton">
              Valider les changements
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;