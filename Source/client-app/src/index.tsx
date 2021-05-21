import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from "./app/layout/App";
import './models/DateExtensions';
import Store, {StoreContext} from './app/store';
import {Router} from "react-router-dom";
import {createBrowserHistory} from 'history';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

export const history = createBrowserHistory();

ReactDOM.render(
    <React.StrictMode>
        <StoreContext.Provider value={new Store()}>
            <Router history={history}>
                <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false}
                                newestOnTop={true}/>
                    <App/>
            </Router>
        </StoreContext.Provider>

    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
