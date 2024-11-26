import React from "react";
import {NavLink} from "react-router-dom";
import { GiArchiveRegister} from "react-icons/gi";
import { MdOutlineDashboard } from "react-icons/md";
import { BiSearch, BiSolidReport } from "react-icons/bi";
import {BsBuildingAdd} from "react-icons/bs";

export default function Sidenavbar() {


  const menus = [
    { name: "Dashboard", link:"/SroDashboard" ,icon: MdOutlineDashboard },
    { name: "Registration", link: "/Progress", icon: GiArchiveRegister },
    { name: "Add Company", link: "/AddNewCustomer", icon: BsBuildingAdd },
    { name: "Search Customer", link: "/SearchCustomer", icon: BiSearch },
    { name: "Report", link: "/Report", icon: BiSolidReport },
  
  ];

  return (
    
    <div className='sidebar'>
    {/* <div className='logocolor'>
      <img src={logo} alt='logo'/>
    </div> */}
   
 
       
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
