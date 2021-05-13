import React from "react";
import {Grid, List} from "semantic-ui-react";
import Activity from "../../../models/Activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
    activities: Activity[],
    selectedActivity: Activity | null
}


const ActivityDashboard = ({activities, selectedActivity}:Props) => {
    return (
        <Grid>
            <Grid.Column width="10">
                <List>
                    <ActivityList activities={activities}/>
                </List>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && <ActivityDetails activity={selectedActivity}/>}
                {selectedActivity && <ActivityForm activity={selectedActivity}/>}
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard; 