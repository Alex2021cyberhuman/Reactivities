import ActivitiesStore from "./ActivityStore";
import {createContext, useContext} from "react";

interface Store {
    activities: ActivitiesStore;
}

const store: Store = {
    activities: new ActivitiesStore()
}

export const StoreContext = createContext<Store>(store);

export const useStore = () => useContext(StoreContext);
