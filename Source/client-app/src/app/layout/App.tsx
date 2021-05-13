import React, {useEffect, useRef, useState} from 'react';
import Axios from 'axios';
import {Container} from 'semantic-ui-react';
import Activity, {empty} from "../../models/Activity";
import Navbar from "../components/Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
    const [activities, setActivities] = useState<Array<Activity>>([]);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    const ref = useRef<HTMLElement>();
    useEffect(() => {
        Axios.get<Activity[]>("http://localhost:5000/api/activities")
            .then(({data}) => { 
                setActivities(data);
                setSelectedActivity(data[0]);
            });
    }, []);
    
    const onCreate = () => {
        setEditMode(true);
        setSelectedActivity(empty());
    }
    
    /*const onSelect = (item: Activity) => {
        setSelectedActivity(item);
        setEditMode(false);
    }*/
    
    return (
        <div className="container-background">
            <Navbar onCreate={onCreate} />
            <Container style={{marginTop: "7em"}}>
                <ActivityDashboard activities={activities} selectedActivity={selectedActivity}/>                    
            </Container>
        </div>
    );
}

export default App;
