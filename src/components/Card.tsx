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
  position: relative;
  &:hover {
    background-color: blue;
    opacity: 30%;
  }
`;
const CardTextBox = styled.div`
  width: 160px;
  height: 40px;
  font-size: 30px;
  font-weight: 300;
  text-align: center;
  position: relative;
  z-index: 2;
`
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  padding: 10px;
  margin: 10px;
`;

const CardContainer = styled.div`
  display: block;
  content: "";
  padding-bottom: 100%;
`


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
        <GridContainer>
            {players.map(player =>
                <>
                    <PlayerCard to={`/player/${player.backNum}`} key={player.backNum}>
                        <CardTextBox>
                        {player.backNum} {player.playerName}
                    </CardTextBox>
                    </PlayerCard>
                    </>
                   )
            }
        </GridContainer>
    )
}


export default Card;