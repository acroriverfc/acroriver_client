import React, {useEffect, useState} from "react";
import {Player} from "../components/type";
import axios from "axios";
import GoalRanks from "../components/Rank/GoalRanks";
import AssistsRank from "../components/Rank/AssistsRank";
import AppearanceRank from "../components/Rank/AppearanceRank";
import {MatchBox} from "./MatchDay";
import {NoMatch} from "../components/MatchInfo";
import styled from "styled-components";

type Match = {
    matchId : number,
    matchDate: string,
    awayName : string,
    stadium: string,
    state: string,
    goals: number,
    awayGoals: number,
}

const NextMatchContainer = styled.div`
  display: block;
  border: 1px solid;
  height: 200px;
  padding-bottom: 30px;
  margin: 10px 10px
`
const Next = styled.div`
  font-size: 20px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 40px;
  font-family: "Noto Sans Bold";
`
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
                    {match ? <MatchBox matchId={match.matchId}
                                       matchDate={match.matchDate}
                                       awayName={match.awayName}
                                       stadium={match.stadium}
                                       state={match.state}
                                       goals={match.goals}
                                       awayGoals={match.awayGoals}/> : ""}
                    {loadingMatch ? "" :
                        <NoMatch length={match ? 1 : 0}>다음 경기가 존재하지 않습니다.</NoMatch>}
            </NextMatchContainer>
            <Next>주요 부문 순위</Next>
            {goalKing ? <GoalRanks players={goalKing}/> : ""}
            {assistKing ? <AssistsRank players={assistKing}/> : ""}
            {appKing ? <AppearanceRank players={appKing}/> : ""}
        </div>
    )
}

export default Home;