import { AuthContext } from "../../context/AuthContext";
import "./navbar.scss";
import { useContext } from "react";


const Navbar = () => {
  const { currentUser } = useContext(AuthContext );
  // console.log(currentUser);
  return (
    <div className="navbar">
      <div className="navbarWrapper">
        <div className="navbarLeft">
          <span className="logo">جمعية دعاوي الخير</span>
        </div>
        <div className="navbarCenter">
          <div className="search">
            <input
              type="text"
              placeholder="Effectuer une recherche..."
              className="searchInput"
            />
          </div>
        </div>
        <div className="navbarRight">
          <img
            className="profileImg"
            src={
              currentUser.photoURL
                ? currentUser.photoURL
                : "/Photos/DefaultProfile.jpeg"
            }
            alt=""
          />
          <span className="navbarName">{currentUser.displayName}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;