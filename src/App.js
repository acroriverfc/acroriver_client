import React, {Component} from 'react';
import {Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import MatchDay from "./pages/MatchDay";
import "./components/Header/Header.css"
import Posts from "./pages/Posts";
import Players from "./pages/Players";
import Header from "./components/Header/Header";
import HeaderContainer from "./components/Header/HeaderContainer";


class App extends Component {
  render() {
    return (
        <div>
            <HeaderContainer/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/matchDay" element={<MatchDay/>}/>
                <Route path="/post" element={<Posts/>}/>
                <Route path="/player" element={<Players/>}/>
            </Routes>
        </div>
    );
  }
}

export default App;