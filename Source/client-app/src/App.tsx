import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import {Container, Grid} from 'semantic-ui-react';
import Navbar from "./components/Navbar";
import Activity, {empty} from "./models/Activity";
import { Fragment } from 'react';
import ActivityDashboard from "./components/ActivitiesDashboard";
import ActivityViewWindow from "./components/ActivityViewWindow";

function App() {
    const [activities, setActivities] = useState<Array<Activity>>([]);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    
    useEffect(() => {
        Axios.get("http://localhost:5000/api/activities")
            .then(({data}) => setActivities(data));
    }, []);
    
    const onCreate = () => {
        setEditMode(true);
        setSelectedActivity(empty());
    }
    
    const onSelect = (item: Activity) => {
        setSelectedActivity(item);
        setEditMode(false);
    }
    
    
    return (
        <Fragment>
            <Container fluid>
                <Navbar onCreate={onCreate}/>                
            </Container>
            <Container>
                <Grid columns="16" >
                    <ActivityDashboard activities={activities} onSelect={onSelect}/>                    
                </Grid>
                <Grid columns="4">
                    {!editMode && selectedActivity && <ActivityViewWindow selectedActivity={selectedActivity}/> }
                </Grid>
            </Container>
        </Fragment>
    );
}

export default App;
