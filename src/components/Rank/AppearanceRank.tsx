import {Player} from "../type";
import React, {useRef} from "react";
import exp from "constants";
import styled from "styled-components";

interface Props {
    players : Player[]
}

const Table = styled.table`
  font-family: "Noto Sans Medium";
  border-collapse: collapse;
  width: 95%;
`
const AppearanceRank = (props:Props) => {
    const rank = {current : 1};
    const appearance = {current : 0};

    return (
        <Table>
            <tbody>
            {props.players.map((player, idx) => {
                    // 하위 득점자
                    if (player.appearances < appearance.current) {
                        rank.current = idx + 1;
                    }

                    appearance.current = player.appearances;

                    return (
                        <td key={player.backNum}>{rank.current}위 {player.playerName}, {player.appearances}</td>
                    )

                }
            )}
            </tbody>
        </Table>
    )
};

export default AppearanceRank;