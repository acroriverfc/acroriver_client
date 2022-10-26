import React, {Component} from 'react';
import {Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import MatchDay from "./pages/match/MatchDay";
import "./components/css/Header.css"
import Posts from "./pages/Posts";
import Players from "./pages/player/Players";
import HeaderContainer from "./components/Header/HeaderContainer";
import PlayerInfo from "./pages/player/PlayerInfo";
import Rank from "./pages/Rank";
import EditPlayer from "./pages/player/EditPlayer";
import {Player} from "./components/type";
import MatchDayInfo from "./pages/match/MatchDayInfo";

const App : React.FC = () => {
    return (
        <div>
            <HeaderContainer/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/rank" element={<Rank/>}/>
                <Route path="/matchDay" element={<MatchDay/>}/>
                <Route path="/matchDay/:matchId" element={<MatchDayInfo/>}/>
                <Route path="/post" element={<Posts/>}/>
                <Route path="/player/:position" element={<Players/>}/>
                <Route path="/player/backNum/:backNum" element={<PlayerInfo/>}/>
                <Route path="/player/edit/:backNum" element={<EditPlayer/>}/>
            </Routes>
        </div>
    );
}

export default App;