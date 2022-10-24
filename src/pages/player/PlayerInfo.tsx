import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Table from "../../components/Table";
import {defaultImg} from "../../components/Card";
import {Player} from "../../components/type";
import {useDispatch} from "react-redux";
import {playerAction} from "../../redux/store/modules/player";

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
  white-space: pre-line;
`

export const EditLink = styled(Link)`
  color: black;
  text-decoration: none;
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
                   description={player.description}/>
            <H1>선수 소개</H1>
            <Description>{player.description}</Description>
            <button>
                <EditLink to={`/player/edit/${player.backNum}`}>
                수정하기
                </EditLink>
            </button>
        </Div>
    );
};

export default PlayerInfo;