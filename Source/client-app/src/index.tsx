import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from "./app/layout/App";
import './models/DateExtensions';
import Store, { StoreContext } from './app/store';
import {Router} from "react-router-dom";
import {createBrowserHistory} from 'history';

export const history = createBrowserHistory();

ReactDOM.render(
    <React.StrictMode>
        <StoreContext.Provider value={new Store()}>
            <Router history={history}>
                <App/>
            </Router>
        </StoreContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
