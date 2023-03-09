import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = (user) => {

  return <div style={{ display: 'flex', minHeight: '100vh', overflow: 'scroll initial' }}>
    <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            React App
        </a>
        </CDBSidebarHeader>
        
        <CDBSidebarContent className="sidebar-content">
            {user ?
                <CDBSidebarMenu>
                    <NavLink exact to="/" activeClassName="activeClicked">
                        <CDBSidebarMenuItem icon="home">Dashboard</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink exact to="/profile" activeClassName="activeClicked">
                        <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink exact to="/users" activeClassName="activeClicked">
                        <CDBSidebarMenuItem icon="users">User List</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink exact to="/tools" activeClassName="activeClicked">
                        <CDBSidebarMenuItem icon="cog">Tools</CDBSidebarMenuItem>
                    </NavLink>
                </CDBSidebarMenu>
                :
                <CDBSidebarMenu>
                
                    <NavLink exact to="/login" activeClassName="activeClicked">
                        <CDBSidebarMenuItem icon="user">Login</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink exact to="/register" activeClassName="activeClicked">
                        <CDBSidebarMenuItem icon="user">Register</CDBSidebarMenuItem>
                    </NavLink>
                </CDBSidebarMenu>
            }
        </CDBSidebarContent>
    </CDBSidebar>
    </div>
};

export default Sidebar;