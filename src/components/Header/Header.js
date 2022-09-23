import React from "react";
import './Header.css'
import {Link} from "react-router-dom";

const MenuItem = ({active, children, to}) => (
    <div className="menu-item">
        <Link to={to}>{children}</Link>
    </div>
)

const Header = () => {
    return (
        <div>
            <div className="header">
                Acroriver
            </div>
            <div className="menu">
                <MenuItem to='/'>홈</MenuItem>
                <MenuItem to='/matchDay'>경기 일정</MenuItem>
                <MenuItem to='/player'>선수단</MenuItem>
                <MenuItem to='/post'>게시판</MenuItem>
            </div>
        </div>
    )
};

export default Header;