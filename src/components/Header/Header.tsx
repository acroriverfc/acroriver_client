import React, {useState} from "react";
import './Header.css'
import {Link} from "react-router-dom";
import styled from "styled-components";

type Menu = {
    to: string;
    children: string;
}
const MenuItem = ({children, to}:Menu) => (
    (
        <div className="menu-item">
            <StyledLink to={to}>{children}</StyledLink>
        </div>
    )
);

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: block;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`

const Header = () => {

    return (
        <div>
            <div className="header" >
                <StyledLink to ='/'>Acroriver FC</StyledLink>
            </div>
            <div className="menu">
                <MenuItem to='/'>홈</MenuItem>
                <MenuItem to='/matchDay'>경기 일정</MenuItem>
                <MenuItem to='/player/fw'>선수단</MenuItem>
                <MenuItem to='/post'>게시판</MenuItem>
            </div>
        </div>
    )
};

export default Header;