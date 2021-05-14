import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import {Container} from 'semantic-ui-react';
import Activity, {empty} from "../../models/Activity";
import Navbar from "../components/Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
    const [activities, setActivities] = useState<Array<Activity>>([]);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    
    useEffect(() => {
        fetchActivities();
    }, []);

    function fetchActivities() {
        Axios.get<Activity[]>('http://localhost:5000/api/activities')
            .then(({data}) => {
                setActivities(data);
            });
    }

    const postActivity = (item: Activity) => {
        Axios.post('http://localhost:5000/api/activities', item)
            .then(() => console.log('success'))
            .catch(error => console.error('error post', error));
    };

    const putActivity = (item: Activity) => {
        Axios.put(`http://localhost:5000/api/activities/${item.id}`, item)
            .then(() => console.log('success'))
            .catch(error => console.error('error put', error));
    };
    
    const deleteActivity = (item: Activity) => {
        Axios.delete(`http://localhost:5000/api/activities/${item.id}`)
            .then(() => console.log('success'))
            .catch(error => console.error('error delete', error));
        
    }
    
    const onStartCreating = () => {
        setEditMode(true);
        setSelectedActivity(empty());
    };
    
    const onSelecting = (item: Activity) => {
        setSelectedActivity(item);
        setEditMode(false);
    };
    
    const onStartEditing = (item: Activity) => {
        setEditMode(true);
        setSelectedActivity(item);
    }
    
    const onSubmit = (item: Activity) => {
        const index = activities.findIndex(a => a.id === item.id);
        const isCreate = index === -1;
        
        if (isCreate) {
            postActivity(item);
            const newActivities = [ ...activities ];
            newActivities.splice(0, 0, item);
            setActivities(newActivities);
        } else {
            putActivity(item);
            const newActivities = [ ...activities ];
            newActivities[newActivities.findIndex(a => a.id === item.id)] = item;
            setActivities(newActivities);
        }
        setSelectedActivity(item);
        setEditMode(false);
    }
    
    const onCancel = (item: Activity) => {
        setSelectedActivity(null);
        setEditMode(false);
        deleteActivity(item);
        const index = activities.findIndex(a => a.id === item.id);
        const newActivities = [ ...activities ];
        newActivities.splice(index, 1);
        setActivities(newActivities);
    }
    
    return (
        <div className="container-background">
            <Navbar onCreate={onStartCreating} />
            <Container style={{marginTop: "7em"}}>
                <ActivityDashboard activities={activities} selectedActivity={selectedActivity} editMode={editMode} onEdit={onStartEditing} onSelect={onSelecting} onCancel={onCancel} onSubmit={onSubmit}/>                    
            </Container>
        </div>
    );
}

export default App;
