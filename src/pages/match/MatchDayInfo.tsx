import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {RootState} from "../../redux/store/modules";
import axios from "axios";

// 출전한 선수는 이렇게 나타냄
type MatchPlayer = {
    playerName : string,
    backNum : number
}

type MatchStat = {

    msId : number,
    goalPlayerName : string,
    assistPlayerName : string,
}

type MatchDetail = {
    matchId : number,
    matchDate : string,
    awayName : string,
    stadium : string,
    state : string,
    goals : number,
    awayGoals : number,
    playMatchDtoList : MatchPlayer[],
    matchStatDtoList : MatchStat[]
}

const MatchPlayers = (player:MatchPlayer) => {
    return (
        <div>
            <div> {player.backNum}번 {player.playerName} </div>
        </div>
    );
}

const MatchDayInfo = () => {
    const matchId = useParams();
    const api = process.env.REACT_APP_API_URL;
    const URL = api + 'matchDay/matchId/' + matchId.matchId;
    // 출전 선수들 저장할 곳
    const [players, setPlayers] = useState<MatchPlayer[]>();
    const [matchDetail, setMatchDetail] = useState<MatchDetail>();
    const [matchStats, setMatchStats] = useState<MatchStat[]>();

    useEffect(() => {
        const fetchMatchDetail = async () => {
            await axios.get(URL).then(response => {
                if (response.status === 200){
                    console.log("SUCCESS");
                    setMatchDetail(response.data);
                    setPlayers(response.data.playMatchDtoList);
                    setMatchStats(response.data.matchStatDtoList);
                }
                else {
                    console.log("API ERROR");
                }
            }).catch(err => console.log(err));
        }

        fetchMatchDetail();
    }, [URL]);

    console.log(matchDetail);
    return (
        <div>
            <h1>경기 상세 정보</h1>
            <h2>출전 명단</h2>
            {players ? players.map(player => <MatchPlayers playerName={player.playerName} backNum={player.backNum}/>) : null}
            <h2>득점 기록</h2>
        </div>
    );
}

export default MatchDayInfo;