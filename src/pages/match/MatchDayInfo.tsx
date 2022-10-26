import React, {useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {Match, Player} from "../../components/type";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store/modules";


const MatchDayInfo = () => {
    const currentMatch = useSelector((state:RootState) => state.matchReducer.matchInfo);
    console.log(currentMatch);
    const param = useParams();
    // 출전 선수들 저장할 곳
    const [players, setPlayers] = useState<Player[]>();
    const location = useLocation();
    const match : Match = location.state;
    return (
        <div>
            경기 상세 정보
        </div>
    );
}

export default MatchDayInfo;