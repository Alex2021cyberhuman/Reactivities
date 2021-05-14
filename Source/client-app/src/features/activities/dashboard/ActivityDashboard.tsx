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
    onCancel: (item:Activity) => void;    
    onSubmit: (item:Activity) => void;    
    editMode: boolean;
}


const ActivityDashboard = ({activities, selectedActivity, onSelect, onEdit, editMode, onCancel, onSubmit}:Props) => {
    return (
        <Grid>
            <Grid.Column width="10">
                <List>
                    <ActivityList activities={activities} onEdit={onEdit} onSelect={onSelect}/>
                </List>
            </Grid.Column>
            <Grid.Column width='6'>
                {!editMode && selectedActivity && <ActivityDetails activity={selectedActivity} onEdit={onEdit} onCancel={onCancel}/>}
                {editMode && selectedActivity && <ActivityForm activity={selectedActivity} onCancel={onCancel} onSubmit={onSubmit}/>}
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard; 