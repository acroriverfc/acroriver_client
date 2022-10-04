import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import PlayerInfo from "../pages/player/PlayerInfo";
import axios from "axios";
import {Simulate} from "react-dom/test-utils";
import play = Simulate.play;

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

const PlayerCard = styled(Link)`
  height: 240px;
  width: 160px;
  margin: 10px 10px;
  color: #61dafb;
  background-color: blue;
  
  &:hover {
    background-color: blue;
    opacity: 30%;
  }
`;

const CardContainer = styled.div`
  display: flex;
  padding: 10px;
  height: 200px;
  margin: 10px;
`;


const Card = () => {
    const [players, setPlayers] = useState<[Player]>();
    const URL = 'http://localhost:8080/player/all'

    useEffect(() => {
        const fetchPlayers = async () => {
            try{
                const response = await axios.get(URL);
                setPlayers(response.data);
            }
            catch (e) {
                console.log(e);
            }
        }

        fetchPlayers();
    }, [])

    if (!players)
        return null;

    return (
        <CardContainer>
            {players.map(player =>
                <PlayerCard to={`/player/${player.backNum}`} key={player.backNum} />)}
        </CardContainer>
    )
}


export default Card;