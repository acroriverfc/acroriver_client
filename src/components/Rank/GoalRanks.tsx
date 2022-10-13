import React, {useRef} from "react";
import {Player} from "../type";

interface Props {
    players : Player[]
}

const GoalRanks = (props:Props) => {
    const rank = {current : 1};
    const goal = {current : 0};

    return (
        <div>
            {props.players.map((player, idx) => {
                // 하위 득점자
                if (player.goals < goal.current) {
                    rank.current = idx + 1;
                }

                goal.current = player.goals;

                return (
                    <div key={player.backNum}>{rank.current}위 {player.playerName}, {player.goals}</div>
                )

                }
            )}
        </div>
    )
};

export default GoalRanks;