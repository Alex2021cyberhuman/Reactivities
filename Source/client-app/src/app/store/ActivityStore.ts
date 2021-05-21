import Activity from "../../models/Activity";
import {makeAutoObservable} from "mobx";
import client from "../api/client";

export default class ActivitiesStore {    
    private _activities: Map<string, Activity> = new Map<string, Activity>();
    private _initialLoading: boolean = true;
    private _deleting: boolean = false;
    
    get activitiesSortedByDate() {
        return Array.from(this.activities)
            .map(([key, value]) => value)
            .sort((a, b) => +a.date - +b.date);
    }
    
    get groupedActivitiesByDate() {
        return this.activitiesSortedByDate.reduce((previous, currentItem) => {
            const date = currentItem.date.toISODateString();
            if (!previous[date])
                previous[date] = [];
            previous[date].push(currentItem);
            return previous;
        }, Object.create(null) as Record<string, Activity[]>);
    }
    
    get initialLoading() {
        return this._initialLoading;
    }

    set initialLoading(value: boolean) {
        this._initialLoading = value;
    }
    
    get activities(): Map<string, Activity> {
        return this._activities;
    }

    set activities(value: Map<string, Activity>) {
        this._activities = value;
    }

    get deleting(): boolean {
        return this._deleting;
    }

    set deleting(value: boolean) {
        this._deleting = value;
    }
    
    constructor() {
        makeAutoObservable(this);
    }
    
    loadActivities = () => {
        client.activities.getMap().then(map => {
            this.activities = map;
            this.initialLoading = false
        });
        return client;
    }

    create = async (item: Activity) => {
        await client.activities.create(item);
        this.activities.set(item.id, item);
    }
    
    edit = async (item: Activity) => {
        await client.activities.edit(item);
        this.activities.set(item.id, item);
    }

    delete = async (id: string) => {
        this.deleting = true;
        await client.activities.delete(id);
        this.activities.delete(id);
    };

    findActivity = async (id: string) => {
        const local = this.activities.get(id);
        if (!local) {
            return await client.activities.getDetails(id);
        }
        return local;
    };
}