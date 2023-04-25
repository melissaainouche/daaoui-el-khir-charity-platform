import React, { useContext } from "react";

import "./widget.scss";
import { AuthContext } from "../../context/AuthContext";

const Widget = ({ type }) => {
  const { currentUser } = useContext(AuthContext );
  const title =
    type === "user"
      ? "Recommandé pour " + currentUser.displayName
      : type === "popular"
      ? "Les actualités de l'association"
      : "Activités réalisées par "+ currentUser.displayName;

  const img =
    type === "user"
     // ? "/Photos/Google.png"
      //: type === "popular"
      //? "/Photos/Google.png"
     // : "/Photos/Google.png";

  return (
    <div className="widget">
      <span className="rightTitle">{title}</span>
      <img className="rightImg" src={img} alt="" />
    </div>
  );
};

export default Widget;