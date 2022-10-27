import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Table from "../../components/Table";
import {defaultImg} from "../../components/Card";
import {Player} from "../../components/type";
import {useDispatch} from "react-redux";
import {playerAction} from "../../redux/store/modules/player";
const H1 = styled.div
`
  margin-left: 10px;
  font-family: "Noto Sans Bold";
  font-size: 30px;
`

const Div = styled.div`
  font-family: "Noto Sans Regular";
`

const Description = styled.div`
  margin: 10px 15px;
  white-space: pre-line;
`
const Button = styled.button`
  font-family: "Noto Sans Regular";
  width: 60px;
  height: 20px;
  font-size: 10px;
  margin: 5px 0px 0px 5px;
  border: none;
  background-color: white;
`

const EditContainer = styled.div`
  display: flex;
`

export const EditLink = styled(Link)`
  text-decoration: none;
  color: dodgerblue;
  align-items: center;
  justify-content: center;
  display: flex;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`
const PlayerInfo = () => {
    const {backNum} = useParams();
    const api = process.env.REACT_APP_API_URL;
    const URL = api + 'player/' + backNum;
    const [player, setPlayer] = useState<Player>();
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPlayers = async () => {
            const response = await axios.get(URL);
            setPlayer(response.data);
            dispatch(playerAction.setPlayer(response.data));
        };

        fetchPlayers().then(() => setError(null));
    }, [URL]);

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
                   imageUrl={player.imageUrl ? player.imageUrl : defaultImg}
                   description={player.description} playerId={player.playerId}/>
            <EditContainer>
                <H1>선수 소개</H1>
                <Button>
                    <EditLink to={`/player/edit/${player.backNum}`}>
                        [수정하기]
                    </EditLink>
                </Button>
            </EditContainer>
            <Description>{player.description}</Description>
        </Div>
    );
};

export default PlayerInfo;