import React from "react";
import { NavLink } from "react-router-dom";
import { GiArchiveRegister} from "react-icons/gi";
import { MdOutlineDashboard } from "react-icons/md";


export default function SidenavbarDIT() {


  const menus = [
    { name: "Dashboard", link: "/DitDashboard", icon: MdOutlineDashboard },
    
    // { name: "SearchCustomer", link: "/SearchCustomer", icon: BiSearch },
  
  ];

  return (
    
    <div className='sidebar'>
    

       
        {menus?.map((menu, i) => (
          <NavLink className="sidebar-Link" key={i} to={menu?.link} activeClassName="active">
            <div className="sidebarhedsty">
            <div>{React.createElement(menu?.icon, { size: "25" })}</div>
            <div>
            <text className="sidebartext">{menu?.name}</text>
            </div>
            </div>
          </NavLink>
        ))}

      </div>

      // <div style={{ marginTop: 40, marginBottom: 30, marginLeft: 5 }}>
      //   <text style={{ fontSize: 15, fontWeight: 400, color: "#ffffff" }}>
      //     Version 1.0{" "}
      //   </text>
      // </div>
    
  );
}
