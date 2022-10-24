import React, {Dispatch, SetStateAction, useCallback, useState} from "react";
import {Form, Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store/modules";
import styled from "styled-components";
import axios from "axios";
import {playerAction} from "../../redux/store/modules/player";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../components/css/DatePicker.css"

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

interface Pos {
    key: string,
    value: string
}

interface PosProps {
    position: string,
    setPosition: Dispatch<SetStateAction<string>>
}

const PositionSelectBox = ({position, setPosition} : PosProps) => {
    const handlePositionChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        let value = e.target.value;
        setPosition(value);
    }

    let POSITION : Pos[] = [
        {value: "FW", key : "FW"},
        {value: "MF", key : "MF"},
        {value: "DF", key : "DF"},
        {value: "GK", key : "GK"}
    ]
    return (
        <CustomSelect onChange={handlePositionChange}
                defaultValue={position}>
            {POSITION.map((p) => (
                <option key={p.key} value={p.value}>
                    {p.value}
                </option>
            ))}
        </CustomSelect>
    )
}

const Div = styled.div`
  display: block;
  height: 30px;
  margin-left: 10px;
  margin-bottom: 5px;
  font-family: "Noto Sans Regular";
  align-items: center;
`

const H1 = styled.div`
  margin-top: 5px;
  margin-left: 10px;
  margin-bottom: 10px;
  font-family: "Noto Sans Bold";
  font-size: 30px;
`
const CustomSelect = styled.select`
  padding: 5px;
  width: 20%;
  height: 25px;
  margin-left: 10px;
  border: 1px solid;
  border-radius: 4px;
`

const BirthInput = styled.input`
  all: unset;
  width: 100px;
  margin-left: 5px;
  border: 1.5px solid #c6c8cb;
  text-align: right;
`;
const Input = styled.input`
  all: unset;
  margin-left: 5px;
  width: 60px;
  border: 1.5px solid #c6c8cb;
  text-align: right;
`;

const TextArea = styled.textarea`
  width: 95%;
  margin: 0px 10px;
  height: 200px;
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  font-family: "Noto Sans Regular";
`
const Button = styled.button`
  background-color: dodgerblue;
  width : 100px;
  height: 40px;
  margin-right: 5px;
  border: 1px solid whitesmoke;
`
const CancelButton = styled.button`
  background-color: red;
  width : 100px;
  height: 40px;
  margin-left: 5px;
  border: 1px solid whitesmoke;
  font-family: "Noto Sans Regular";
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

    const handleCancel = useCallback(() => {
        navigate(`/player/backNum/${backNum}`)
    }, []);

    // Javascript Date 를 Java Date 형식으로 맞춰주는 함수
    const DateToLocalDate = (date:Date) => {

        const leftPad = (value:number) => {
            if (value >= 10)
                return value;

            return `0${value}`;
        }
        const year = date.getFullYear();
        const month = leftPad(date.getMonth() + 1);
        const day = leftPad(date.getDate());

        return [year, month, day].join('-');
    }

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setName(e.target.value);
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
            <H1>수정 페이지</H1>
            <Div>
                이름 : <Input type='text' name='name' value={name} onChange={onNameChange}/>
            </Div>
            <div className='custom-div'>
                생년월일 :
                <div className="custom-react_datepicker__wrapper">
                <ReactDatePicker
                id="top_date_picker"
                className="date_picker"
                dateFormat="yyyy-MM-dd"
                onChange={(date:Date) => setBirthDate(DateToLocalDate(date))}
                selected={new Date(birthDate)}
                closeOnScroll={true}
                customInput={<BirthInput type='text' name='date' value={birthDate}/>}/>
                </div>
            </div>
            <Div>
                키 : <Input type='number'
                           min="1"
                           max="250"
                           name='height'
                           value={height}
                           onChange={onHeightChange}/>cm
            </Div>
            <Div>
                몸무게 : <Input type='number'
                           min="1"
                           max="250"
                           name='weight'
                           value={weight}
                           onChange={onWeightChange}/>kg
            </Div>
            <Div>
                포지션 : <PositionSelectBox position={position} setPosition={setPosition}/>
            </Div>
            <Div>
                등번호 : <Input type='number'
                             min="1"
                             max="99"
                             name='backNum'
                             value={backNum}
                             onChange={onBackNumChange}/>번
            </Div>
            <div>
                <h2>선수 소개</h2>
                <TextArea defaultValue={description} onChange={onDescriptionChange}/>
            </div>
            <ButtonContainer>
                <Button onClick={handleSubmit}>
                    수정 완료
                </Button>
                <CancelButton onClick={handleCancel}>
                    취소
                </CancelButton>
            </ButtonContainer>
        </div>
    )
}

export default EditPlayer;