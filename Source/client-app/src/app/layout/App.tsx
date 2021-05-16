import React, {useEffect, useState} from 'react';
import {Container} from 'semantic-ui-react';
import Activity, {empty} from "../../models/Activity";
import Navbar from "../components/Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import client from "../api/client";
import Loading from "../components/Loading";
import {Guid} from "guid-typescript";

const App = () => {
    const [activities, setActivities] = useState<Array<Activity>>([]);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [deleting, setDeleting] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    
    useEffect(() => {
        client.activities.getList()
            .then(items => {
                setActivities(items);
            })
            .catch(reason => console.error(reason))
            .then(() => setLoading(false));            
    }, []);

    const createActivity = (item: Activity) => {
        item.id = Guid.raw();
        setSubmitting(true);
        client.activities.create(item)
            .then(() => {
                const newActivities = [ ...activities ];
                newActivities.splice(newActivities.length, 0, item);
                setActivities(newActivities);
                setSelectedActivity(item);
                setEditMode(false);
            })
            .catch(reason => console.error(reason))
            .then(() => setSubmitting(false));            
    };

    const editActivity = (item: Activity) => {
        setSubmitting(true);
        client.activities.edit(item)
            .then(() => {
                const newActivities = [ ...activities ];
                newActivities[newActivities.findIndex(a => a.id === item.id)] = item;
                setActivities(newActivities);
                setSelectedActivity(item);
                setEditMode(false);
            })
            .catch(reason => console.error(reason))
            .then(() => setSubmitting(false));
    };
    
    const onStartCreating = () => {
        setEditMode(true);
        setSelectedActivity(empty());
    };

    const onStartEditing = (item: Activity) => {
        setEditMode(true);
        setSelectedActivity(item);
    };
    
    const onSelecting = (item: Activity) => {
        setSelectedActivity(item);
        setEditMode(false);
    };
    
    
    const onSubmit = (item: Activity) => {        
        if (!item.id) {
            createActivity(item);
        } else {
            editActivity(item);
        }
    };
    
    const onCancel = (item: Activity) => {
        setSelectedActivity(null);
        setEditMode(false);
    }
    
    const onDelete = (item: Activity) => {
        if (!item.id) return;
        setDeleting(true);
        client.activities.delete(item.id)
            .then(() => {
                setSelectedActivity(null);
                setEditMode(false);
                const newActivities = [ ...activities ];
                newActivities.splice(activities.findIndex(a => a.id === item.id), 1);
                setActivities(newActivities);
            })
            .catch(reason => console.error(reason))
            .then(() => setDeleting(false));
    };
    
    if (loading)
        return (
            <div className="container-background">
                <Loading/>
            </div>
        );
    return (
        <div className="container-background">
            <Navbar onCreate={onStartCreating} />
            <Container style={{marginTop: "7em"}}>
                <ActivityDashboard submitting={submitting} deleting={deleting} activities={activities} selectedActivity={selectedActivity} editMode={editMode} onEdit={onStartEditing} onSelect={onSelecting} onDelete={onDelete} onCancel={onCancel} onSubmit={onSubmit}/>
            </Container>
        </div>
    );
}

export default App;
