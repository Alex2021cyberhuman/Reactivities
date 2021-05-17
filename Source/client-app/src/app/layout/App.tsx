import React from 'react';
import {Container} from 'semantic-ui-react';
import Navbar from "../components/Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {
    return (
        <div className="container-background">            
            <Navbar />
            <Container style={{marginTop: "7em"}}>
                <ActivityDashboard />
            </Container>
        </div>
    );
}

export default App;
