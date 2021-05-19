import {observer} from "mobx-react-lite";
import React from "react";
import Calendar from "react-calendar";
import {Header, Menu} from "semantic-ui-react";
import 'react-calendar/dist/Calendar.css';

const ActivityFilters = observer(() => {
    return (
        <>
            <Menu vertical size='large' style={{width: '100%'}}>
                <Header icon='filter' attached color='teal' content='Filters'/>
                <Menu.Item content='All Activities'/>
                <Menu.Item content="I'm going"/>
                <Menu.Item content="I'm hosting"/>
            </Menu>
            <Header content='Calendar' attached color='teal'/>
            <Calendar className='react-calendar'/>
        </>
    )
});

export default ActivityFilters;