import React, {useEffect, useState} from "react";
import styled, {css} from "styled-components";
import axios from "axios";
import 'moment/locale/ko'
interface select {
    value : string;
    key : string;
}

interface Props {
    state: string
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

type Match = {
    matchId : number,
    matchDate: string,
    awayName : string,
    stadium: string,
    state: string,
    goals: number,
    awayGoals: number,
}
const Box = styled.li`
  list-style: none;
  height: 120px;
  border: 1px solid black;
  margin: 20px 10px;
  width: 95%;
  ${(props:Props) => props.state === "WIN" &&
          css`
            background-color: rgba(144,238,144,0.5);
          `}
  
  ${(props:Props) => props.state === "LOSE" &&
          css`
            background-color: rgba(219,112,147,0.3);
          `}
  
  ${(props:Props) => props.state === "DRAW" &&
          css`
            background-color: rgba(255,255,0,0.3);
          `} 
`

const MatchInfo = styled.div`
  display: flex;
  height: 85px;
`

const Left = styled.li`
  margin-top: 15px;
  text-align: center;
  list-style: none;
  width: 90%;
`

const Right = styled.div`
  margin-top: 15px;
  display: flex;
  width: 100%;
`

const Date = styled.div`
  padding-top: 5px;
  font-family: "Noto Sans Bold";
  grid-row: 1/3;
`

const Stadium = styled.div`
  font-family: "Noto Sans Regular";
  font-size: 12px;
  width: 100%;
  padding-top: 3px;
`
const Away = styled.div`
  font-family: "Noto Sans Medium";
  padding-left: 5px;
  font-size: 15px;
  width: 80%;
  text-align: right;
  padding-top: 20px;
`

const ScoreContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-content: center;
  padding-top: 15px;
  font-size: 25px;
`

const HomeGoals = styled.div`
  color: grey;
  ${(props:Props) => props.state === "WIN" &&
          css`
            color: red;
          `} 
`
const AwayGoals = styled.div`
  color: grey;
  ${(props:Props) => props.state === "LOSE" &&
          css`
            color: red;
          `}
`

const State = styled.div`
  display: flex;
  height: 35px;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  color: white;
  ${(props:Props) => props.state === "BEFORE" &&
          css`
            background-color: dimgray;
          `}

  ${(props:Props) => props.state === "WIN" &&
          css`
            background-color: green;
          `}

  ${(props:Props) => props.state === "DRAW" &&
          css`
            background-color: rgba(189,195,199,0.3);
          `}

  ${(props:Props) => props.state === "LOSE" &&
          css`
            background-color: darkred;
          `}
`
export const Select = styled.select`
  padding: 5px;
  width: 100%;
  border: 1px solid;
  border-radius: 4px;
`

const YearSelectBox = () => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
    };

    return (
        <Select onChange={handleChange}>
            {YEARS.map((year) => (
                <option key={year.key} value={year.key}>
                    {year.value}
                </option>
            ))}
        </Select>
    );
}
const MonthSelectBox = () => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
    };

    return (
        <Select onChange={handleChange}>
            {MONTHS.map((m) => (
                <option key={m.key} value={m.key}>
                    {m.value}
                </option>
                ))}
        </Select>
    );
}

const MatchBox = (match:Match) => {
    var moment = require('moment')
    const date = moment(match.matchDate).format('YYYY.MM.DD(ddd) hh:mm')
    return (
        <Box state={match.state}>
            <MatchInfo>
                <Left>
                    <Date> {date} </Date>
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
            <State state={match.state}>{match.state}</State>
        </Box>
    );
}
const MatchDay = () => {
    const api = process.env.REACT_APP_API_URL;
    const URL = api + 'matchDay/all';
    const [matches, setMatch] = useState<[Match]>();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatchs = async () => {
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

        fetchMatchs();
    }, [URL]);

    if (error)
        return <div>에러 발생</div>

    console.log(matches);

    return (
        <div>
            <h1>경기 일정</h1>
            <YearSelectBox/>
            <MonthSelectBox/>
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
        </div>
    );
};

export default MatchDay;