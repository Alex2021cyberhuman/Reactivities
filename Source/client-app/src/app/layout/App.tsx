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
            <Route exact path={['/', '/home']}>
                <HomePage/>
            </Route>
            <Switch>
                <Route exact path='/activities/details/:id'>
                    <>
                        <Navbar/>
                        <Container style={{marginTop: "7em"}}>
                            <ActivityDetailsPage/>
                        </Container>
                    </>
                </Route>
                <Route exact path='/activities/edit/:id'>
                    <>
                        <Navbar/>
                        <Container style={{marginTop: "7em"}}>
                            <ActivityForm create={false}/>
                        </Container>
                    </>
                </Route>
                <Route exact path='/activities/create'>
                    <>
                        <Navbar/>
                        <Container style={{marginTop: "7em"}}>
                            <ActivityForm/>
                        </Container>
                    </>
                </Route>
                <Route exact path='/activities'>
                    <>
                        <Navbar/>
                        <Container style={{marginTop: "7em"}}>
                            <ActivityDashboardPage/>
                        </Container>
                    </>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
