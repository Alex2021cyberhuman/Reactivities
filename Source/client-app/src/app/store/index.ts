import ActivitiesStore from "./ActivityStore";
import {createContext, useContext} from "react";
import {makeAutoObservable} from "mobx";

export default class Store {
    get activities(): ActivitiesStore {
        return this._activities;
    }

    private _activities: ActivitiesStore = new ActivitiesStore();

    constructor() {
        makeAutoObservable(this);
    }
}

export const StoreContext = createContext<Store>(new Store());

export const useStore = () => useContext(StoreContext);
