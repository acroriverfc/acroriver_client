import React, {useEffect, useState} from "react";
import {Player} from "../components/type";
import axios from "axios";
import GoalRanks from "../components/Rank/GoalRanks";
import Assistrank from "../components/Rank/AssistRank";
import AppearanceRank from "../components/Rank/AppearanceRank";


const Home = () => {
    const api = process.env.REACT_APP_API_URL;
    const URL = api + 'player/rank';
    const [kings, setKings] = useState<[[]]>();
    const [loadingData, setLoadingData] = useState(true);
    const [goalKing, setGoalKing] = useState<Player[]>();
    const [assistKing, setAssistKing] = useState<Player[]>();
    const [appKing, setAppKing] = useState<Player[]>();
    useEffect(() => {
        const fetchkings = async () => {
            await axios
                .get(URL)
                .then(function (response) {
                    setKings(response.data);
                    setLoadingData(false);
                })
        };

        if (loadingData)
            fetchkings();

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
            <h1>Next Match</h1>
            <h1>득점왕</h1>
            {goalKing ? <GoalRanks players={goalKing}/> : ""}
            <h1>도움왕</h1>
            {assistKing ? <Assistrank players={assistKing}/> : ""}
            <h1>출장왕</h1>
            {appKing ? <AppearanceRank players={appKing}/> : ""}
        </div>
    )
}

export default Home;