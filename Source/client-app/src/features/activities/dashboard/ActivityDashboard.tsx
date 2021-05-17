import React, {useEffect} from "react";
import {Grid, List} from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import {observer} from "mobx-react-lite";
import {useActivityStore} from "../../../app/store/ActivityStore";
import Loading from "../../../app/components/Loading";

const ActivityDashboard = observer(() => {
    const store = useActivityStore();
    
    useEffect(() => {
        store.loadActivities();
    }, [store]);
    
    if (store.initialLoading)
        return <Loading/>
    
    return (
        <Grid>
            <Grid.Column width="10">
                <List>
                    <ActivityList activities={store.activities} onEdit={store.handleEditing} onSelect={store.handleSelection} onDelete={store.handleDeleting} deleting={store.deleting} submitting={store.submitting}/>
                </List>
            </Grid.Column>
            <Grid.Column width='6'>
                {!store.editMode && store.current && <ActivityDetails activity={store.current} onEdit={store.handleEditing} onCancel={store.handleCancelSelection}/>}
                {store.editMode && store.current && <ActivityForm activity={store.current} onCancel={store.handleCancelSelection} onSubmit={store.handleSubmit} submitting={store.submitting}/>}
            </Grid.Column>
        </Grid>
    )
});

export default ActivityDashboard; 