import React, {useEffect} from 'react';
import {Container} from 'semantic-ui-react';
import Navbar from "../components/Navbar";
import ActivityDashboardPage from "../../features/activities/dashboard/ActivityDashboardPage";
import {Route, Switch} from "react-router-dom";
import {HomePage} from "../../features/home/HomePage";
import ActivityDetailsPage from "../../features/activities/details/ActivityDetailsPage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import NotFound from "../../features/errors/NotFound";
import {useStore} from "../store";
import LoginForm from "../../features/user/login/LoginForm";

const App = () => { 
    const {activities: {loadActivities, activities}} = useStore();
    useEffect(() => {
        if (!activities){
            loadActivities();
        }            
    }, [activities, loadActivities])
    
    return (
        <Switch>
            <Route exact path={['/', '/home']} strict>
                <HomePage/>
            </Route>
            <Route path={['/**']}>
                <Navbar/>
                <Container>
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
                        <Route path='/login'>
                            <LoginForm/>
                        </Route>
                        <Route>
                            <NotFound/>
                        </Route>
                    </Switch>
                </Container>
            </Route>
        </Switch>
    );
}

export default App;
