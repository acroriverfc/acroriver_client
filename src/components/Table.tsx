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

const TableImg = styled.img`
  width: 300px;
`
const CustomTh = styled.th`
    row-span: 2;
`
const CustomTable = styled.table`
  width: 98%;
  margin: 5px 5px;
`

const Caption = styled.caption`
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
`
const Table = ({playerName, imageUrl, birthDate, height, weight, position, backNum}: Player) => {
    return (
        <CustomTable>
            <tr>
                <td> <TableImg src={imageUrl}/> </td>
            </tr>
            <tr>
                <Caption>FC 아크로리버 No.{backNum}</Caption>
            </tr>
            <tr>
                <th>이름</th>
                <td>{playerName}</td>
            </tr>
            <tr>
                <th>국적</th>
                <td>대한민국</td>
            </tr>
            <tr>
                <CustomTh>생년월일</CustomTh>
                <td>{birthDate}</td>
            </tr>
            <tr>
                <th>신체</th>
                <td>키 : {height}cm / 몸무게 : {weight}kg</td>
            </tr>
            <tr>
                <th>포지션</th>
                <td>{position}</td>
            </tr>
            <tr>
                <th>등번호</th>
                <td>{backNum}번</td>
            </tr>
        </CustomTable>
    )
}

export default Table;