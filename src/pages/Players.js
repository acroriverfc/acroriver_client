import React from "react";
import {useParams} from "react-router-dom";
import {CardContainer, PlayerCard} from "../components/Card";

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
            <CardContainer>
                <PlayerCard/>
                <PlayerCard/>
            </CardContainer>
        </div>
    );
};

export default Players;