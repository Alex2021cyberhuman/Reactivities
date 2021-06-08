import ActivitiesStore from "./ActivityStore";
import {createContext, useContext} from "react";
import {makeAutoObservable} from "mobx";
import UserStore from "./UserStore";

export default class Store {
    get activities(): ActivitiesStore {
        return this._activities;
    }
    
    get user(): UserStore {
        return  this._user;
    }
    
    private _activities: ActivitiesStore = new ActivitiesStore();
    private _user: UserStore = new UserStore();
    
    constructor() {
        makeAutoObservable(this);
    }
}

export const StoreContext = createContext<Store>(new Store());

export const useStore = () => useContext(StoreContext);
