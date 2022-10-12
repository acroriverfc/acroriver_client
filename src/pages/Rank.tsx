import React, {useEffect, useMemo, useState} from "react";
import RankTable from "../components/RankTable";
import {Player} from "../components/type";
import axios from "axios";

const Rank = () => {
    const api = process.env.REACT_APP_API_URL;
    const URL = api + 'player/all';
    const [players, setPlayer] = useState<[Player]>();
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        const fetchPlayers = async () => {
            await axios
                .get(URL)
                .then(function (response) {
                    setPlayer(response.data);
                    setLoadingData(false);
                })
        };

        if (loadingData) {
            fetchPlayers();
        }
    }, [URL]);

    return (
        <div>
            <h1>랭킹</h1>
            <h1>전체 선수 기록</h1>
            {players && <RankTable players={players}/>}
        </div>
    )
};

export default Rank;