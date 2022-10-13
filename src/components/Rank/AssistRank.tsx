import {Player} from "../type";
import React, {useRef} from "react";
import exp from "constants";

interface Props {
    players : Player[]
}

const Assistrank = (props:Props) => {
    const rank = {current : 1};
    const assists = {current : 0};

    return (
        <div>
            {props.players.map((player, idx) => {
                    // 하위 득점자
                    if (player.assists < assists.current) {
                        rank.current = idx + 1;
                    }
                    assists.current = player.assists;

                    return (
                        <div key={player.backNum}>{rank.current}위 {player.playerName}, {player.assists}</div>
                    )

                }
            )}
        </div>
    )
};

export default Assistrank;