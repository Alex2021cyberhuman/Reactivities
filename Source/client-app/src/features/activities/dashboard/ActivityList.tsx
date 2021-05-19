import Activity from "../../../models/Activity";
import {Item} from "semantic-ui-react";
import {useStore} from "../../../app/store";
import ActivityListItem from "./ActivityListItem";
import {observer} from "mobx-react-lite";
import React, {Fragment} from "react";

const ActivityList = observer(() => {
    const {activities: {groupedActivitiesByDate: list, deleting, delete: onDelete}} = useStore();
    const array = new Array<{ date: string, items: Activity[] }>();
    for (const key in list) {
        array.push({date: key, items: list[key]});
    }

    return (
        <>
            {array.map(({date, items}) => (
                <Fragment key={date}>
                    <span className='date'>{new Date(date).toLocaleDateString()}</span>
                    <Item.Group>
                        {items.map((activity) => (
                            <ActivityListItem activity={activity} deleting={deleting} onDelete={onDelete}
                                              key={activity.id}/>
                        ))}
                    </Item.Group>
                </Fragment>
            ))}
        </>
    )
});

export default ActivityList;