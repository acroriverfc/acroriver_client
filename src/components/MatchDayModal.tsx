import React, {useCallback, useState} from "react";
import {MatchDate} from "./MatchInfo";
import ReactDatePicker from "react-datepicker";
import {now} from "moment";
import axios from "axios";

interface Props {
    open : boolean,
    close : () => void,
    header: string
}

// https://phrygia.github.io/react/2021-09-21-react-modal/

const MatchDayModal = (props : Props) => {
    const currentDate = new Date();
    const DateToLocalDate = (date:Date) => {

        const leftPad = (value:number) => {
            if (value >= 10)
                return value;

            return `0${value}`;
        }
        const year = date.getFullYear();
        const month = leftPad(date.getMonth() + 1);
        const day = leftPad(date.getDate());
        const hours = leftPad(date.getHours());
        const min = leftPad(date.getMinutes());
        let localdate = [year, month, day].join('-');
        localdate += 'T'
        localdate += [hours,min,'00'].join(':');
        return localdate;

    }
    const [awayName, setAwayName] = useState("");
    const [stadium, setStadium] = useState("");
    const [matchDate, setMatchDate] = useState(DateToLocalDate(new Date()));

    let handleColor = (time : Date) => {
        console.log(matchDate);
        return time.getHours() > 12 ? "text_success" : "text-error";
    }
    const onAwayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setAwayName(e.target.value);
    }

    const onStadiumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setStadium(e.target.value);
    }

    const data = {
        awayName: awayName,
        state: "BEFORE",
        stadium: stadium,
        matchDate: matchDate
    }

    const Request = useCallback( async  ()=> {
            const api  = process.env.REACT_APP_API_URL + 'matchDay';
            const contentType = {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            }
            await axios.post(api, data, contentType)
                .then(response => {
                    console.log(response.data);
                    if (response.status === 201)
                    {
                        console.log("SUCCESS");
                        props.close();
                    }
                    else{
                        console.log("ERROR");
                    }
                }).catch(err => {console.log(err)});
        }
    , [data]);

    return (
        <div>
            {props.open ? (
                <section>
                    <header>
                        {props.header}
                        <button onClick={props.close}>
                            X
                        </button>
                    </header>
                    <div>
                        상대 팀명 : <input type='text' name='away' value={awayName} onChange={onAwayNameChange}/>
                    </div>
                    <div>
                        구장 : <input type='text' name='stadium' value={stadium} onChange={onStadiumChange}/>
                    </div>
                    <div>
                        경기 일정 : <ReactDatePicker showTimeSelect dateFormat="yyyy/MM/dd" selected={new Date(matchDate)}
                                                 onChange={(date:Date) => {
                                                     if (date > currentDate)
                                                        setMatchDate(DateToLocalDate(date))
                                                 }} timeClassName={handleColor}/>
                    </div>
                    <button onClick={Request}>
                        추가하기
                    </button>
                </section>
            ) : null}
        </div>
    )
}

export default MatchDayModal;