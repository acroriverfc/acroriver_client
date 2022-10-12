import React, {Component} from 'react';
import {Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import MatchDay from "./pages/MatchDay";
import "./components/Header/Header.css"
import Posts from "./pages/Posts";
import Players from "./pages/player/Players";
import HeaderContainer from "./components/Header/HeaderContainer";
import PlayerInfo from "./pages/player/PlayerInfo";
import Rank from "./pages/Rank";

const App : React.FC = () => {
    return (
        <div>
            <HeaderContainer/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/rank" element={<Rank/>}/>
                <Route path="/matchDay" element={<MatchDay/>}/>
                <Route path="/post" element={<Posts/>}/>
                <Route path="/player/:position" element={<Players/>}/>
                <Route path="/player/backNum/:backNum" element={<PlayerInfo/>}/>
            </Routes>
        </div>
    );
}

export default App;