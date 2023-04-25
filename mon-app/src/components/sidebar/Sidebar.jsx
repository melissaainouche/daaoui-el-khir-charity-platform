import {
    ExitToAppOutlined,
    FileCopyOutlined,
    GroupOutlined,
    HomeOutlined,
    List,
    MovieCreationOutlined,
    PhotoSizeSelectActualOutlined,
    ScheduleOutlined,
    Settings,
    ShoppingBasketOutlined,
  } from "@mui/icons-material";
  import { useContext } from "react";
  import MenuLink from "../menuLink/MenuLink";
  import "./sidebar.scss";
  import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";



  
  const Sidebar = () => {
    const { dispatch } = useContext(AuthContext );
    const navigate = useNavigate();
  
    const handleLogout = (e) => {
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    };
  
    return (
      <div className="sidebar">
        <div className="sidebarbarWrapper">
          <MenuLink icon={<HomeOutlined />} text="Accueil" />
          <MenuLink icon={<List />} text="Listes" />
          <MenuLink icon={<ShoppingBasketOutlined />} text="Produits" />
          <MenuLink icon={<GroupOutlined />} text="Groupes" />
          <MenuLink icon={<FileCopyOutlined />} text="Pages" />
          <MenuLink icon={<PhotoSizeSelectActualOutlined />} text="Photos" />
          <MenuLink icon={<MovieCreationOutlined />} text="Videos" />
          <MenuLink icon={<ScheduleOutlined />} text="Calendrier" />
          <MenuLink icon={<Settings />} text="Paramètres" />
          <span onClick={handleLogout}>
            <MenuLink icon={<ExitToAppOutlined />} text="Se déconnecter" />
          </span>
        </div>
      </div>
    );
  };
  
  export default Sidebar;