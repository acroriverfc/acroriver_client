import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import styled, {css} from "styled-components";
import axios from "axios";
import 'moment/locale/ko'

import "../../components/MatchInfo";
import {
    State, Box, Left, MatchDate, Away, AwayGoals,
    HomeGoals, Right, Stadium, ScoreContainer, MatchInfo, Select, NoMatch
} from "../../components/MatchInfo";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {matchAction} from "../../redux/store/modules/match";
import {Match} from "../../components/type";
import MatchDayModal from "../../components/MatchDayModal";
interface select {
    value : string;
    key : string;
}


const MONTHS : select[] = [
    {value: "1월", key: "1"},
    {value: "2월", key: "2"},
    {value: "3월", key: "3"},
    {value: "4월", key: "4"},
    {value: "5월", key: "5"},
    {value: "6월", key: "6"},
    {value: "7월", key: "7"},
    {value: "8월", key: "8"},
    {value: "9월", key: "9"},
    {value: "10월", key: "10"},
    {value: "11월", key: "11"},
    {value: "12월", key: "12"},
];

const YEARS : select[] = [
    {value:"2022년", key: "2022"},
    {value:"2023년", key :"2023"}
]

interface YearProps {
    year: number,
    setYear: Dispatch<SetStateAction<number>>
}

interface MonthProps {
    month: number,
    setMonth: Dispatch<SetStateAction<number>>
}
const YearSelectBox = ({year, setYear} : YearProps) => {
    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let value = +e.target.value;
        setYear(value);
    };

    return (
        <Select onChange={handleYearChange}
        defaultValue={year}>
            {YEARS.map((year) => (
                <option key={year.key} value={year.key}>
                    {year.value}
                </option>
            ))}
        </Select>
    );
}
const MonthSelectBox = ({month, setMonth} : MonthProps) => {
    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let value = +e.target.value;
        setMonth(value);
    };

    return (
        <Select onChange={handleMonthChange}
        defaultValue={month}>
            {MONTHS.map((m) => (
                <option key={m.key} value={m.key}>
                    {m.value}
                </option>
                ))}
        </Select>
    );
}

export const MatchBox = (match:Match) => {
    const navigate = useNavigate();
    const moment = require('moment');
    const date = moment(match.matchDate).format('YYYY.MM.DD(ddd) HH:mm')
    const dispatch = useDispatch();

    const onClickState = () => {
        dispatch(matchAction.setMatch(match));
        navigate(`/matchDay/${match.matchId}`, {state : match})
    }

    return (
        <Box state={match.state}>
            <MatchInfo>
                <Left>
                    <MatchDate> {date} </MatchDate>
                    <Stadium> {match.stadium} </Stadium>
                </Left>
                <Right>
                    <Away> vs {match.awayName} </Away>
                    <ScoreContainer>
                        <HomeGoals state={match.state}> {match.state !== "BEFORE" ? match.goals : "경기 전"}</HomeGoals>
                        {match.state !== "BEFORE" ? " : " : ""}
                        <AwayGoals state={match.state}>{match.state !== "BEFORE" ? match.awayGoals : ""}</AwayGoals>
                    </ScoreContainer>
                </Right>
            </MatchInfo>
            <State state={match.state}>
                <div onClick={onClickState}>
                    {match.state === "BEFORE" ? match.state : "상세 기록 확인"}
                </div>
            </State>
        </Box>
    );
}

const Header = styled.div`
  font-family: "Noto Sans Bold";
  font-size: 25px;
  text-align: center;
  width: 100%;
  padding: 20px 0px;
`

const MatchDay = () => {
    const moment = require('moment');
    let todayYear : number = +moment().format('YYYY'); // 오늘 기준 연, 월
    let todayMonth : number = +moment().format('MM');

    const [year, setYear] = useState(todayYear);
    const [month, setMonth] = useState(todayMonth);

    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    const api = process.env.REACT_APP_API_URL;
    const URL = api + 'matchDay?year=' + year + '&month=' + month;
    const [matches, setMatch] = useState<[Match]>();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                setError(null);
                const response = await axios.get(
                    URL
                );
                setMatch(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMatches();
    }, [URL, modalOpen]);

    if (error)
        return <div>에러 발생</div>

    return (
        <div>
            <Header>
                아크로리버 FC 경기 일정
                <button onClick={openModal}>
                    경기 추가
                </button>
            </Header>
            <MatchDayModal open={modalOpen} close={closeModal} header={"경기 추가"}/>
            <span>
                <YearSelectBox year={year} setYear={setYear}/>
                <MonthSelectBox month={month} setMonth={setMonth}/>
            </span>
            {matches?.map((match) =>
            <MatchBox matchId={match.matchId}
                      matchDate={match.matchDate}
                      awayName={match.awayName !== null ? match.awayName : "미정"}
                      stadium={match.stadium !== null ? match.stadium : "미정"}
                      state={match.state}
                      goals={match.goals}
                      awayGoals={match.awayGoals}
            key={match.matchId}
            />
                )}
            <NoMatch length={matches ? matches.length : 0}>해당 월에는 경기가 존재하지 않습니다.</NoMatch>
        </div>
    );
};

export default MatchDay;