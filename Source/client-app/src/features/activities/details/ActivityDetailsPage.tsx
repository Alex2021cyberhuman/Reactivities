import {Grid, GridColumn} from "semantic-ui-react";
import Activity from "../../../models/Activity";
import {observer} from "mobx-react-lite";
import {useActivityStore} from "../../../app/store/ActivityStore";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Loading from "../../../app/components/Loading";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";

const ActivityDetailsPage = observer(() => {    
    const store = useActivityStore();
    const {id} = useParams<{ id: string }>();
    const [activity, setActivity] = useState<Activity | undefined>(undefined);
    
    useEffect(() => {
        store.findActivity(id).then(activity => setActivity(activity));
    }, [id, store]);


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
