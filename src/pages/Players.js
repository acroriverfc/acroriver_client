import React from "react";
import {useParams} from "react-router-dom";

const data = {
    66 : {
        name : '정환우',
        backNum : 66,
    },
    30 : {
        name :'양원영',
        backNum : 30,
    },
};

const Players = () => {
    const params = useParams();
    const player = data[params.backNum];

    return (
        <div>
            <h1> 선수 </h1>
            {player? (
                <div>
                    <h2>{player.name}</h2>
                    <p>등번호 : {player.backNum}</p>
                </div>
            ) : (
                <p>존재하지 않는 프로필</p>
            )}
        </div>
    );
};

export default Players;