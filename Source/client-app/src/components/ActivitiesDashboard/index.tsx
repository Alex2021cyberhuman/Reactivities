import {List} from "semantic-ui-react";
import React from "react";
import Activity from "../../models/Activity";
import ActivityListItem from "./ActivityListItem";

interface Props {
    activities: Activity[],
    onSelect: (item: Activity) => void
}

const ActivityDashboard = ({activities, onSelect}: Props) => {
    return (
        <List as='ul'>
            {activities.map((item, index) =>
                (<ActivityListItem key={index} activity={item} onSelect={onSelect}/>)
            )}
        </List>
    )
};

export default ActivityDashboard; 
