import React from 'react';
import {Container} from 'semantic-ui-react';
import Navbar from "../components/Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {HomePage} from "../../features/home/HomePage";

const App = () => {
    return (            
        <>
            <BrowserRouter>
                <Navbar />
                <Container style={{marginTop: "7em"}}>
                    <Switch>
                        <Route exact path='/activities'><ActivityDashboard/></Route>
                        <Route exact  path={['/', '/home']}><HomePage/></Route>
                    </Switch>                    
                </Container>
            </BrowserRouter>            
        </>            
    );
}

export default App;
