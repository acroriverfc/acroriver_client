export type Player = {
    playerName : string,
    birthDate : string,
    height : number,
    weight : number,
    appearances : number,
    goals : number,
    assists : number,
    position : string,
    backNum : number,
    imageUrl : string,
    description : string,
};

export type Match = {
    matchId : number,
    matchDate: string,
    awayName : string,
    stadium: string,
    state: string,
    goals: number,
    awayGoals: number,
}