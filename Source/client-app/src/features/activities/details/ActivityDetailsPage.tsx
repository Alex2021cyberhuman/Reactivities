import {Grid, GridColumn} from "semantic-ui-react";
import Activity from "../../../models/Activity";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Loading from "../../../app/components/Loading";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";
import {useStore} from "../../../app/store";

const ActivityDetailsPage = observer(() => {    
    const {activities} = useStore();
    const {id} = useParams<{ id: string }>();
    const [activity, setActivity] = useState<Activity | undefined>(undefined);
    
    useEffect(() => {
        activities.findActivity(id).then(activity => setActivity(activity));
    }, [id, activities]);


    if (!activity) {
        return <Loading/>
    }
    return (
        <Grid>
            <GridColumn width='10'>
                <ActivityDetailsHeader activity={activity}/>
                <ActivityDetailsInfo activity={activity}/>
                <ActivityDetailsChat/>
            </GridColumn>
            <Grid.Column width='6'>
                <ActivityDetailsSidebar/>
            </Grid.Column>
        </Grid>
    )
})

export default ActivityDetailsPage;
