import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from "./app/layout/App";
import './models/DateExtensions';
import Store, { StoreContext } from './app/store';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <StoreContext.Provider value={new Store()}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </StoreContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
