import React, {useState} from "react";
import '../css/Header.css'
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
const A = styled.a`
  display: flex;
  transform: translate(30px);
`
const HeaderImg = styled.img`
  height: 3rem;
`

const Instagram = styled.img`
  height: 2rem;
`
const Header = () => {

    return (
        <div>
            <div className="header" >
                <HeaderLink to ='/'>
                    <HeaderImg src='/img/acroriver.png'/>
                    Acroriver FC
                </HeaderLink>
                <A href='https://www.instagram.com/acroriver_official/'>
                    <Instagram src='/img/instagram_logo.svg'/>
                </A>
            </div>
            <div className="menu">
                <MenuItem to='/rank'>랭킹</MenuItem>
                <MenuItem to='/matchDay'>경기 일정</MenuItem>
                <MenuItem to='/player/fw'>선수단</MenuItem>
                <MenuItem to='/post'>게시판</MenuItem>
            </div>
        </div>
    )
};

export default Header;