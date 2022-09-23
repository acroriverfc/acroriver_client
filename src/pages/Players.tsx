import React from "react";
import {useParams} from "react-router-dom";
import {CardContainer, PlayerCard} from "../components/Card";

type Player = {
    name : string,
    backNum : bigint
}
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
    return (
        <div>
            <CardContainer>
                <PlayerCard/>
                <PlayerCard/>
            </CardContainer>
        </div>
    );
};

export default Players;