import React, {useState} from "react";
import styled, {css} from "styled-components";
import {Link, useLocation} from "react-router-dom";

interface Props {
    active: string
}

type Menu = {
    to: string
    name: string
    active: string
}

const MenuBar = styled.div`
  height: 3rem;
  font-family: "Noto Sans Regular";
;
`
const Div = styled.div`
  background-color: white;
  display: inline-block;
  font-size: 0.9rem;
  line-height: 2.5rem;
  width: 25%;
  text-align: center;
  justify-content: center;
  align-content: center;
  text-decoration: none;
  transition: background-color 0.3s;
  
  ${(props:Props) => props.active === "true" && 
          css`
            border-bottom: 3px solid darkgray;
          `}
  &:hover{
    border-bottom: 3px solid darkgray;
  }
  
  &:active, Div.active{
    border-bottom: 3px solid darkgray;
    background-color: dimgray;
    opacity: 0.3;
  }

`

const MenuItem = ({active, to, name}:Menu) => (
    (
        <Div active={active}>
            <StyledLink active={active} to={to}>{name}</StyledLink>
        </Div>
    )
)

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  text-align: center;
  display: block;
  width: 100%;
  height: 100%;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
  &:hover{
    color: dimgray;
  }
  ${(props:Props) => props.active === "true" &&
          css`
            color: dimgray;
          `}
`

const SubBar = () => {
    const location = useLocation();
    return (
      <MenuBar>
          <MenuItem to='/player/fw' name='공격수' active={location.pathname === '/player/fw' ? "true" : "false" }/>
          <MenuItem to='/player/mf' name='미드필더' active={location.pathname==='/player/mf' ? "true" : "false" } />
          <MenuItem to='/player/df' name='수비수' active={location.pathname==='/player/df' ? "true" : "false" }/>
          <MenuItem to='/player/gk' name='골키퍼' active={location.pathname==='/player/gk' ? "true" : "false" } />
      </MenuBar>
    );
}

export default SubBar;