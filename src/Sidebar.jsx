import React from 'react';
import './Sidebar.css'; // Import CSS for styling
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo" style={{display:'flex',}}>
        {/* 此处文件路径比较标准 */}
        <img src={process.env.PUBLIC_URL + '/headicon.png'} alt="Icon" style={{width:'40px',height:'40px' }}/>
        <h3 style={{textAlign:'center',marginTop:'5px',marginLeft:'10px'}}>Music-Emotion</h3>
      </div>
      <NavLink exact to="/" className="sidebar-item" activeClassName="active" style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src="icon1.png" alt="Icon" />
        <span>使用说明</span>
      </NavLink>
      <NavLink to="/adjustPage" className="sidebar-item" activeClassName="active" style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src="icon1.png" alt="Icon" />
        <span>实验界面1</span>
      </NavLink>
      <NavLink to="/orderPage" className="sidebar-item" activeClassName="active" style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src="icon1.png" alt="Icon" />
        <span>实验界面2</span>
      </NavLink>
    </div>
  );
}

export default Sidebar;
