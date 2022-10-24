import React, {useCallback, useState} from "react";
import {Form, Link, useNavigate, useParams} from "react-router-dom";
import {Player} from "../../components/type";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store/modules";
import styled from "styled-components";
import {current} from "@reduxjs/toolkit";
import {EditLink} from "./PlayerInfo";
import axios from "axios";
import {playerAction} from "../../redux/store/modules/player";
import {parse} from "url";
import {now} from "moment";


const Input = styled.input`
  all: unset;
  width: 50px;
  border: 1.5px solid #c6c8cb;
`;

const TextArea = styled.textarea`
  width: 95%;
  margin: 0px 10px;
  height: 200px;
`
const EditPlayer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // 선수 정보를 재호출 하지 않기 위해 redux 에서 불러옴
    const currentPlayer = useSelector((state:RootState) => state.playerReducer.playerInfo);
    const [name, setName] = useState(currentPlayer.playerName);
    const [birthDate, setBirthDate] = useState(currentPlayer.birthDate);
    const [height, setHeight] = useState(currentPlayer.height.toString());
    const [weight, setWeight] = useState(currentPlayer.weight.toString());
    const [position, setPosition] = useState(currentPlayer.position);
    const [backNum, setBackNum] = useState(currentPlayer.backNum.toString());
    const [imageUrl, setImageUrl] = useState(currentPlayer.imageUrl);
    const [description, setDescription] = useState(currentPlayer.description);
    const data = {
        playerId: currentPlayer.playerId,
        playerName: name,
        birthDate: birthDate,
        height: parseInt(height),
        weight: parseInt(weight),
        appearances: currentPlayer.appearances,
        goals: currentPlayer.goals,
        assists: currentPlayer.assists,
        position: position,
        backNum: parseInt(backNum),
        imageUrl: imageUrl,
        description: description
    };
    const handleSubmit = useCallback(async () => {
        try {
            const URL = process.env.REACT_APP_API_URL + 'player';
            const contentType = {
                headers: {
                    'Content-Type' : 'application/json; charset=UTF-8',
                }
            };
            await axios.put(URL, data, contentType)
                .then(response => {
                    console.log("DISPATCH");
                    console.log(response);
                    dispatch(playerAction.setPlayer(data));
                    if (response.status === 202) {
                        navigate(`/player/backNum/${backNum}`)
                    }
                }).catch(err => {
                    console.log(err);
            })

        }
        catch (e) {
            console.log(e);
        }
    }, [data]);

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const onBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setBirthDate(e.target.value);
    }
    const onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const number = e.target.value.replace(/[^0-9]/g, '');

        if (parseInt(number) > 250)
            setHeight('250')
        else setHeight(number);
    }
    const onWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const number = e.target.value.replace(/[^0-9]/g, '');
        if (parseInt(number) > 250)
            setWeight('250')
        else setWeight(number);
    }
    const onPosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setPosition(e.target.value);
    }
    const onBackNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const number = e.target.value.replace(/[^0-9]/g, '');
        if (parseInt(number) > 99)
            setBackNum('99')
        else setBackNum(number);
    }
    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setImageUrl(e.target.value);
    }
    const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        let contents = e.currentTarget.value.replace("<br>", "\r\n");
        setDescription(contents);
    }

    return (
        <div>
            <h1>수정 페이지</h1>
            <div>
                이름 : <Input type='text' name='name' value={name} onChange={onNameChange}/>
            </div>
            <div>
                생년월일 : <input type='date' name='birth' value={birthDate} onChange={onBirthChange}/>
            </div>
            <div>
                키 : <Input type='number'
                           min="1"
                           max="250"
                           name='height'
                           value={height}
                           onChange={onHeightChange}/>cm
            </div>
            <div>
                몸무게 : <Input type='number'
                           min="1"
                           max="250"
                           name='weight'
                           value={weight}
                           onChange={onWeightChange}/>kg
            </div>
            <div>
                포지션 : {position}
            </div>
            <div>
                등번호 : <Input type='number'
                             min="1"
                             max="99"
                             name='backNum'
                             value={backNum}
                             onChange={onBackNumChange}/>
            </div>
            <div>
                <h2>선수 설명</h2>
                <TextArea defaultValue={description} onChange={onDescriptionChange}/>
            </div>
            <div>
                <button onClick={handleSubmit}>
                    수정 완료
                </button>
            </div>
        </div>
    )
}

export default EditPlayer;