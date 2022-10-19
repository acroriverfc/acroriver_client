import styled, {css} from "styled-components";

interface Props {
    state: string
}

interface Length {
    length: number
}
export const Box = styled.div`
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

export const MatchInfo = styled.div`
  display: flex;
  height: 85px;
`

export const Left = styled.li`
  margin-top: 15px;
  text-align: center;
  list-style: none;
  width: 90%;
`

export const Right = styled.div`
  margin-top: 15px;
  display: flex;
  width: 100%;
`

export const Date = styled.div`
  padding-top: 5px;
  font-family: "Noto Sans Bold";
  grid-row: 1/3;
`

export const Stadium = styled.div`
  font-family: "Noto Sans Regular";
  font-size: 12px;
  width: 100%;
  padding-top: 3px;
`
export const Away = styled.div`
  font-family: "Noto Sans Medium";
  padding-left: 5px;
  font-size: 15px;
  width: 80%;
  text-align: right;
  padding-top: 20px;
`

export const ScoreContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-content: center;
  padding-top: 15px;
  font-size: 25px;
`

export const HomeGoals = styled.div`
  color: grey;
  ${(props:Props) => props.state === "WIN" &&
    css`
            color: red;
          `} 
`
export const AwayGoals = styled.div`
  color: grey;
  ${(props:Props) => props.state === "LOSE" &&
    css`
            color: red;
          `}
`
export const State = styled.div`
  display: flex;
  height: 35px;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  background-color: #DAA520;
  ${(props:Props) => props.state === "BEFORE" &&
    css`
            background-color: dimgray;
          `}
`
export const Select = styled.select`
  padding: 5px;
  width: 25%;
  margin-left: 10px;
  border: 1px solid;
  border-radius: 4px;
`

export const NoMatch = styled.div`
  font-family: "Noto Sans Light";
  display: none;
  background-color: lightgrey;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  margin: 30px 10px;
  height: 50px;
  width: 95%;
  ${(props:Length) => props.length === 0 &&
          css`
            display: flex;
          `}
`