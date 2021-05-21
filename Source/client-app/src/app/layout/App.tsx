import React from 'react';
import {Container} from 'semantic-ui-react';
import Navbar from "../components/Navbar";
import ActivityDashboardPage from "../../features/activities/dashboard/ActivityDashboardPage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {HomePage} from "../../features/home/HomePage";
import ActivityDetailsPage from "../../features/activities/details/ActivityDetailsPage";
import ActivityForm from "../../features/activities/form/ActivityForm";

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={['/', '/home']} strict>
                    <HomePage/>
                </Route>
                <Route path={['/**']}>
                    <Navbar/>
                    <Container style={{marginTop: '7em'}}>
                        <Switch>
                            <Route path='/activities/details/:id'>
                                <ActivityDetailsPage/>
                            </Route>
                            <Route path='/activities/edit/:id'>
                                <ActivityForm create={false}/>
                            </Route>
                            <Route path='/activities/create'>
                                <ActivityForm/>
                            </Route>
                            <Route path='/activities'>
                                <ActivityDashboardPage/>
                            </Route>
                        </Switch>
                    </Container>
                </Route>
            </Switch>            
        </BrowserRouter>
    );
}

export default App;
