import React, {useRef} from "react";
import {Player} from "../type";
import styled from "styled-components";
import {RankTd, StatTd, Table, Td, Th, TopTr} from "./Rankcss";

interface Props {
    players : Player[]
}

const GoalRanks = (props:Props) => {
    const rank = {current : 1};
    const goal = {current : 0};
    const isFirst = {current : 0};  // 1위 칸은 크게 할 예정

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <Th colSpan={3}>최다 득점 TOP 5</Th>
                    </tr>
                </thead>
                <tbody>
            {props.players.map((player, idx) => {
                    // 하위 득점자
                    if (player.goals < goal.current) {
                        rank.current = idx + 1;
                    }

                    isFirst.current += 1;
                    goal.current = player.goals;

                    if (isFirst.current === 1) {
                        return (
                            <TopTr key={player.backNum}>
                                <RankTd>{rank.current}위</RankTd>
                                <Td>{player.playerName}</Td>
                                <StatTd>{player.goals}골</StatTd>
                            </TopTr>
                        )
                    } else {
                        return (
                            <tr key={player.backNum}>
                                <RankTd>{rank.current}위</RankTd>
                                <Td>{player.playerName}</Td>
                                <StatTd>{player.goals}골</StatTd>
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

export default GoalRanks;