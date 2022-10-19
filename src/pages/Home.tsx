import React, {useEffect, useState} from "react";
import {Player} from "../components/type";
import axios from "axios";
import GoalRanks from "../components/Rank/GoalRanks";
import AssistsRank from "../components/Rank/AssistsRank";
import AppearanceRank from "../components/Rank/AppearanceRank";
import {MatchBox} from "./MatchDay";
import {
    Away, AwayGoals,
    Box,
    Date,
    HomeGoals,
    Left,
    MatchInfo,
    NoMatch,
    Right,
    ScoreContainer,
    Stadium, State
} from "../components/MatchInfo";
import styled, {css} from "styled-components";
import moment from "moment";

type Match = {
    matchId : number,
    matchDate: string,
    awayName : string,
    stadium: string,
    state: string,
    goals: number,
    awayGoals: number,
}

const HomeBox = styled.div`
  height: 120px;
  border: 1px solid black;
  margin: 20px 10px;
  width: 95%;
`

const NextMatchContainer = styled.div`
  display: block;
  border: 1px solid;
  max-height: 200px;
  margin: 10px 10px;
`
const Next = styled.div`
  font-size: 20px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 40px;
  font-family: "Noto Sans Bold";
`

const HomeLeft = styled.li`
  margin-top: 15px;
  text-align: center;
  list-style: none;
  width: 100%;
`

const HomeRight = styled.div`
  margin-top: 15px;
  display: flex;
  width: 100%;
`


const HomeMatchBox = (match:Match) => {
    const moment = require('moment');
    const date = moment(match.matchDate).format('YYYY.MM.DD(ddd) hh:mm')
    return (
        <HomeBox>
            <MatchInfo>
                <HomeLeft>
                    <Date> {date} </Date>
                    <Stadium> {match.stadium} </Stadium>
                </HomeLeft>
                <HomeRight>
                    <Away> vs {match.awayName} </Away>
                </HomeRight>
            </MatchInfo>
            <State state={match.state}>경기 전</State>
        </HomeBox>

    );
}


const Home = () => {
    const api = process.env.REACT_APP_API_URL;
    const URL = api + 'player/rank';
    const [kings, setKings] = useState<[[]]>();
    const [loadingData, setLoadingData] = useState(true);
    const [loadingMatch, setLoadingMatch] = useState(true);
    const [goalKing, setGoalKing] = useState<Player[]>();
    const [assistKing, setAssistKing] = useState<Player[]>();
    const [appKing, setAppKing] = useState<Player[]>();
    const nextMatchUrl = api + 'matchDay/next';
    const [match, setMatch] = useState<Match>();

    useEffect(() => {
        const fetchkings = async () => {
            await axios
                .get(URL)
                .then(function (response) {
                    setKings(response.data);
                    setLoadingData(false);
                })
        };

        const fetchMatch = async () => {
            await axios
                .get(nextMatchUrl)
                .then(function (response) {
                    setMatch(response.data);
                    setLoadingMatch(false);
                })
        }

        if (loadingData)
            fetchkings();

        if (loadingMatch)
            fetchMatch();
    }, [URL]);

    useEffect(() => {
        if (kings) {
            kings.map((king, idx) => {
                if (idx === 0)
                    setGoalKing(king);
                else if (idx === 1)
                    setAssistKing(king);
                else
                    setAppKing(king);
            })
        }
    }, [kings])

    return (
        <div>
            <NextMatchContainer>
                <Next>다음 경기</Next>
                    {match ? <HomeMatchBox matchId={match.matchId}
                                       matchDate={match.matchDate}
                                       awayName={match.awayName}
                                       stadium={match.stadium}
                                       state={match.state}
                                       goals={match.goals}
                                       awayGoals={match.awayGoals}/> : ""}
                    {loadingMatch ? "" :
                        <NoMatch length={match ? 1 : 0}>다음 경기가 존재하지 않습니다.</NoMatch>}
            </NextMatchContainer>
            {goalKing ? <GoalRanks players={goalKing}/> : ""}
            {assistKing ? <AssistsRank players={assistKing}/> : ""}
            {appKing ? <AppearanceRank players={appKing}/> : ""}
        </div>
    )
}

export default Home;