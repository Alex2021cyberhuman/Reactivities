import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {QueryParamProvider} from 'use-query-params';
import App from "./app/layout/App";
import './models/DateExtensions';
import Store, {StoreContext} from './app/store';
import {Route, Router} from "react-router-dom";
import {createBrowserHistory} from 'history';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

export const history = createBrowserHistory();

const Index = () => {
    return (<React.StrictMode>
        <StoreContext.Provider value={new Store()}>
            <Router history={history}>
                <QueryParamProvider ReactRouterRoute={Route}>
                    <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false}
                                    newestOnTop={true}/>
                    <App/>
                </QueryParamProvider>
            </Router>
        </StoreContext.Provider>
    </React.StrictMode>);
};

ReactDOM.render( <Index/> ,
    document.getElementById('root')
);

reportWebVitals();
