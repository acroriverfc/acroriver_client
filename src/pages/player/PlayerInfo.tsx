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

const imageOnErrorHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = "/img/person.png";
};

const ImageContainer = styled.div`
  margin: 10px 0px;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
`
const PlayerImg = styled.img`
  height: 150px;
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
        <div>
            <ImageContainer>
                <PlayerImg src={player.imageUrl} onError={imageOnErrorHandler}/>
            </ImageContainer>
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
            <h1>선수 설명</h1>
            {player.description}
        </div>
    );
};

export default PlayerInfo;