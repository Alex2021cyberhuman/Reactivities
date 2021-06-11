import React, {useEffect} from "react";
import {Grid, List} from "semantic-ui-react";
import ActivityList from "./ActivityList";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/store";
import Loading from "../../../app/components/Loading";
import ActivityFilters from "./ActivityFilters";
import useRedirectToLogin from "../../../app/hocks/useRedirectToLogin";

const ActivityDashboardPage = observer(() => {
    useRedirectToLogin();
    const {activities: {loadActivities, initialLoading}} = useStore();
    
    useEffect(() => {
        loadActivities();
    }, [loadActivities]);
    
    if (initialLoading)
        return <Loading/>
    
    return (
        <Grid>
            <Grid.Column width="10">
                <List>
                    <ActivityList/>
                </List>
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters/>
            </Grid.Column>
        </Grid>
    )
});

export default ActivityDashboardPage; 