import React from 'react';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {createRoot} from "react-dom/client";
import "./static/fonts/font.css";
import {Provider} from "react-redux";
import store from "./redux/store/configurestore";

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)