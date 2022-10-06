import React, {ReactEventHandler, SyntheticEvent, useEffect, useState} from "react";
import styled from "styled-components";
import {Link, useParams} from "react-router-dom";
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

const PlayerCard = styled(Link)`
  display: flex;
  height: 150px;
  width: 120px;
  margin: 10px 10px 0px;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 30%;
  }
`;
const CardTextBox = styled.div`
  font-family: "Noto Sans Regular";
  width: 120px;
  height: 100%;
  font-size: 20px;
  font-weight: 300;
  text-align: center;
  margin: 0px 10px;
`
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  padding: 10px;
  margin: 0px 10px;
`;

const CardContainer = styled.div`
  display: grid;
`

const CardImg = styled.img`
  max-width: 100%;
  max-height: 100%;
`


const imageOnErrorHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = "/img/person.png";
};

const Card = () => {
    const {position} = useParams();
    const [players, setPlayers] = useState<[Player]>();
    const URL = 'http://localhost:8080/player/position/' + position;
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

    }, [position])

    if (!players) {
        console.log("NULL")
        return null;
    }

    console.log(players)
    return (
        <GridContainer>
            {players.map(player =>
                <CardContainer key={player.backNum}>
                    <PlayerCard to={`/player/backNum/${player.backNum}`}>
                        <CardImg
                            src={player.imageUrl}
                            onError={imageOnErrorHandler}
                            alt='player image'
                        />
                    </PlayerCard>
                    <CardTextBox>
                        {player.backNum} {player.playerName}
                    </CardTextBox>
                </CardContainer>
                   )
            }
        </GridContainer>
    )
}


export default Card;