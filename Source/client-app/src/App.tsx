import React, {useEffect, useState} from 'react';
import './App.css';
import Axios from 'axios';
import {List, Header} from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState<Array<any>>([]);
  
  useEffect(() => {
    Axios.get("http://localhost:5000/activities")
        .then(response => setActivities(response.data));
  }, [])
  
  return (
    <div>
      <Header as='h2' icon='users'>Reactivities</Header>
      <List as='ul'>
        {activities.map((item, index) =>
            (<List.Item key={index} header={item.name} description={item.description} icon='user' as='li'/>)
        )}
      </List>
    </div>
  );
}

export default App;
