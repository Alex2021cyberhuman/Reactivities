import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from "./app/layout/App";
import ActivitiesStore, {ActivityStoreContext} from "./app/store/ActivityStore";

ReactDOM.render(    
  <React.StrictMode>
      <ActivityStoreContext.Provider value={new ActivitiesStore()}>
          <App />
      </ActivityStoreContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
