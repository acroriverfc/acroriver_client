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

const HeaderLink = styled(Link)`
  color: black;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  display: flex;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`
const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  display: flex;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`

const HeaderImg = styled.img`
  height: 3rem;
`
const Header = () => {

    return (
        <div>
            <div className="header" >
                <HeaderLink to ='/'>
                    <HeaderImg src='/img/acroriver.png'/>
                    Acroriver FC
                </HeaderLink>
            </div>
            <div className="menu">
                <MenuItem to='/stats'>기록실</MenuItem>
                <MenuItem to='/matchDay'>경기 일정</MenuItem>
                <MenuItem to='/player/fw'>선수단</MenuItem>
                <MenuItem to='/post'>게시판</MenuItem>
            </div>
        </div>
    )
};

export default Header;