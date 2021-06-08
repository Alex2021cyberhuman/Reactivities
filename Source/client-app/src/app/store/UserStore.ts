import {makeAutoObservable} from "mobx";
import LoginModel from "../../models/LoginModel";
import User from "../../models/User";
import client from "../api/client";

class UserStore {
    
    private _current: User | undefined;
    private token: string | undefined;
    
    constructor() {
        makeAutoObservable(this);
    }
    
    get isLoggedIn(): boolean {
        return !!this.current && !!this.token;
    }
    
    get current(): User | undefined {
        return this._current;
    }

    set current(value: User | undefined) {
        this._current = value;
    }
    
    login = async (model: LoginModel) => {
        const {token} = await client.account.login(model);
        client.account.setBearer(token);
        this.current = await client.account.getCurrent();
    }
}

export default UserStore;