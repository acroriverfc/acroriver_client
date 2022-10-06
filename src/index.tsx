import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {createRoot} from "react-dom/client";
import "./static/fonts/font.css";


const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)