import React from "react";
import styled from "styled-components";

type Player = {
    playerName : string,
    birthDate : string,
    height : number,
    weight : number,
    appearances : number,
    goals : number,
    assists : number,
    position : string,
    backNum : number,
    imageUrl : string,
};

const imageOnErrorHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = "/img/person.png";
};

const TableImg = styled.img`
  display: block;
  width: 250px;
  margin: 5px auto;
`
const CustomTh = styled.th`
  font-family: "Noto Sans Medium";
  border-width: 1px;
  border-style: solid;
  border-color: #495057;
  background-color: black;
  color: white;
  height: 35px;
;
`
const ImageTd = styled.td` 
  border-width: 1px;
  border-style: solid;
  border-color: #495057;
  justify-content: center;
  align-content: center;

`

const CustomTd = styled.td`
  font-family: "Noto Sans Regular";
  border-width: 1px;
  border-style: solid;
  border-color: #495057;
  height: 35px;
  padding-left: 10px;
`
const MainTd = styled.td`
  font-family: "Noto Sans Bold";
  border-width: 1px;
  border-style: solid;
  border-color: #495057;
  height: 30px;
  color: white;
  background-color: black;
  text-align: center;
  justify-content: center;
`
const CustomTable = styled.table`
  margin: 10px 10px;
  width: 95%;
  border-collapse: collapse;
`

const Table = ({playerName, imageUrl, birthDate, height, weight, position, backNum, appearances, goals, assists}: Player) => {
    return (
        <CustomTable>
            <tbody>
                <tr>
                    <ImageTd colSpan={2}>
                        <TableImg src={imageUrl} onError={imageOnErrorHandler}/>
                    </ImageTd>
                </tr>
                <tr>
                    <MainTd colSpan={2}>FC 아크로리버 No.{backNum}</MainTd>
                </tr>
                <tr>
                    <CustomTh>이름</CustomTh>
                    <CustomTd>{playerName}</CustomTd>
                </tr>
                <tr>
                    <CustomTh>국적</CustomTh>
                    <CustomTd>대한민국</CustomTd>
                </tr>
                <tr>
                    <CustomTh>생년월일</CustomTh>
                    <CustomTd>{birthDate}</CustomTd>
                </tr>
                <tr>
                    <CustomTh>신체조건</CustomTh>
                    <CustomTd>키 : {height}cm / 몸무게 : {weight}kg</CustomTd>
                </tr>
                <tr>
                    <CustomTh>포지션</CustomTh>
                    <CustomTd>{position}</CustomTd>
                </tr>
                <tr>
                    <CustomTh>등번호</CustomTh>
                    <CustomTd>{backNum}번</CustomTd>
                </tr>
                <tr>
                    <CustomTh>통산 기록</CustomTh>
                    <CustomTd>{appearances}경기 {goals}골 {assists}도움</CustomTd>
                </tr>
            </tbody>
        </CustomTable>
    )
}

export default Table;