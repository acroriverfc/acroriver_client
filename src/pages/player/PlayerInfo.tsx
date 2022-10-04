import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

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
    description : string,
};

const PlayerInfo = () => {
    const {backNum} = useParams();
    const URL = 'http://localhost:8080/player/' + backNum;
    const [player, setPlayer] = useState<Player>();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                setError(null);
                const response = await axios.get(
                    URL
                );
                setPlayer(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPlayers();
    }, []);

    if (error)
        return <div>에러 발생</div>;

    if (!player)
        return null;

    return (
        <div>
            <li>이름 : {player.playerName}</li>
            <li>생년월일 : {player.birthDate}</li>
            <li>키 : {player.height}</li>
            <li>몸무게 : {player.weight}</li>
            <li>출장 횟수 : {player.appearances}</li>
            <li>골 : {player.goals}</li>
            <li>어시스트 : {player.assists}</li>
            <li>포지션 : {player.position}</li>
            <li>등번호 : {player.backNum}</li>
            <li>선수 설명 : {player.description}</li>

        </div>
    );
};

export default PlayerInfo;