import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Players from "./Players";
import Table from "../../components/Table";

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
const H1 = styled.h1
`
  margin-left: 5px;
  font-family: "Noto Sans Bold";
`

const Div = styled.div`
  font-family: "Noto Sans Regular";
`

const Description = styled.div`
    margin: 5px 10px;
`
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
        <Div>
            <Table playerName={player.playerName}
                   birthDate={player.birthDate}
                   height={player.height}
                   weight={player.weight}
                   appearances={player.appearances}
                   goals={player.goals}
                   assists={player.assists}
                   position={player.position}
                   backNum={player.backNum}
                   imageUrl={player.imageUrl}/>
            <H1>선수 소개</H1>
            <Description>{player.description}</Description>
        </Div>
    );
};

export default PlayerInfo;