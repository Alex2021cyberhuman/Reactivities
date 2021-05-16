import React from "react";
import {Grid, List} from "semantic-ui-react";
import Activity from "../../../models/Activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | null;
    onEdit: (item:Activity) => void;
    onSelect: (item:Activity) => void;
    onDelete: (item:Activity) => void;    
    onCancel: (item:Activity) => void;    
    onSubmit: (item:Activity) => void;    
    editMode: boolean;
    submitting: boolean;
    deleting: boolean;
}


const ActivityDashboard = ({activities, selectedActivity, onSelect, onEdit, editMode, onDelete, onSubmit, submitting, deleting, onCancel}:Props) => {
    return (
        <Grid>
            <Grid.Column width="10">
                <List>
                    <ActivityList activities={activities} onEdit={onEdit} onSelect={onSelect} onDelete={onDelete} deleting={deleting} submitting={submitting}/>
                </List>
            </Grid.Column>
            <Grid.Column width='6'>
                {!editMode && selectedActivity && <ActivityDetails activity={selectedActivity} onEdit={onEdit} onCancel={onCancel}/>}
                {editMode && selectedActivity && <ActivityForm activity={selectedActivity} onCancel={onCancel} onSubmit={onSubmit} submitting={submitting}/>}
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard; 