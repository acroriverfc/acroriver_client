import {Player} from "../type";
import React, {useRef} from "react";
import exp from "constants";
import styled from "styled-components";

interface Props {
    players : Player[]
}
const Table = styled.table`
  font-family: "Noto Sans Regular";
  text-align: center;
  border-collapse: collapse;
  margin: 30px 10px;
  width: 95%;
`

const RankTd = styled.td`
  width: 20%;
  border: 1px solid;
  height: 30px;
`
const Th = styled.th` 
  height: 40px;
  font-size: 18px;
  border: 1px solid;
`

const Td = styled.td`
  height: 35px;
  border: 1px solid;
`

const StatTd = styled.td`
  border: 1px solid;
  width: 25%;
`

const TopTr = styled.tr`
  background-color: antiquewhite;
  font-weight: bold;
`

const AppearanceRank = (props:Props) => {
    const rank = {current : 1};
    const appearance = {current : 0};
    const isFirst = {current : 0};  // 1위 칸은 크게 할 예정

    return (
        <div>
            <Table>
                <thead>
                <tr>
                    <Th colSpan={3}>최다 출장 TOP 5</Th>
                </tr>
                </thead>
                <tbody>
                {props.players.map((player, idx) => {
                        // 하위 득점자
                        if (player.appearances < appearance.current) {
                            rank.current = idx + 1;
                        }

                        isFirst.current += 1;
                        appearance.current = player.appearances;

                        if (isFirst.current === 1) {
                            return (
                                <TopTr key={player.backNum}>
                                    <RankTd>{rank.current}위</RankTd>
                                    <Td>{player.playerName}</Td>
                                    <StatTd>{player.appearances}경기</StatTd>
                                </TopTr>
                            )
                        } else {
                            return (
                                <tr key={player.backNum}>
                                    <RankTd>{rank.current}위</RankTd>
                                    <Td>{player.playerName}</Td>
                                    <StatTd>{player.appearances}경기</StatTd>
                                </tr>
                            )
                        }
                    }
                )}
                </tbody>
            </Table>
        </div>
    )
};

export default AppearanceRank;