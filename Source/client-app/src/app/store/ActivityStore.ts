import Activity, {empty} from "../../models/Activity";
import {makeAutoObservable} from "mobx";
import client from "../api/client";
import {createContext, useContext} from "react";

export default class ActivitiesStore {    
    private _activities: Map<string, Activity> = new Map<string, Activity>();
    private _initialLoading: boolean = true;
    private _isCreating: boolean | undefined = undefined;
    private _editMode: boolean = false;
    private _submitting: boolean = false;    
    private _current: Activity | undefined = undefined;
    private _deleting: boolean = false;

    get current(): Activity | undefined {
        return this._current;
    }

    set current(value: Activity | undefined) {
        this._current = value;
    }
    get editMode(): boolean {
        return this._editMode;
    }

    set editMode(value: boolean) {
        this._editMode = value;
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
    
    set submitting(value: boolean) {
        this._submitting = value;
    }

    get submitting(): boolean {
        return this._submitting;
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
    }

    handleCreating = () => {
        this.editMode = true;
        this._isCreating = true;
        this._current = empty();
    }
    
    handleSubmit = async (item: Activity) => {
        this.submitting = true;
        this._createOrEdit(item).catch(reason => console.error(reason)).then(() => {
            this.submitting = false;
            this.editMode = false;
            this.current = item;
        });
    }

    handleDeleting = (item: Activity) => {
        this._delete(item).catch(reason => console.error(reason)).then(() => {
            this.deleting = false;
        });
    };

    handleSelection = (item: Activity) => {
        this.current = this.activities.get(item.id);
        this.editMode = false;
    };
    
    handleCancelSelection = (item: Activity) => {        
        this.current = undefined;
        this.editMode = false;
    };

    handleEditing = (item: Activity) => {
        this.editMode = true;
        this.current = this.activities.get(item.id);
        this._isCreating = false;
    };
    
    private _createOrEdit = async (item: Activity) => {
        if (this._isCreating) {
            await client.activities.create(item);
        } else {
            await client.activities.edit(item);
        }
        this.activities.set(item.id, item);        
    }

    private _delete = async (item: Activity) => {
        this.deleting = true;
        this.current = undefined;
        await client.activities.delete(item.id);
        this.activities.delete(item.id);
    };
}

export const ActivityStoreContext = createContext<ActivitiesStore>(new ActivitiesStore());

export const useActivityStore = () => useContext(ActivityStoreContext); 