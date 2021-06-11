import {makeAutoObservable} from "mobx";
import LoginModel from "../../models/LoginModel";
import User from "../../models/User";
import client from "../api/client";
import RegisterModel from "../../models/RegisterModel";
const USER = "User";
class UserStore {    
    private _current: User | undefined;
    
    constructor() {
        makeAutoObservable(this);
    }
    
    get isLoggedIn(): boolean {
        return !!this.current;
    }
    
    get current(): User | undefined {
        if (!this._current) {
            const userJson =  localStorage.getItem(USER);
            if (!userJson)
                return undefined;
            this._current = JSON.parse(userJson) as User;
        }
        return this._current;
    }
    
    set current(value: User | undefined) {
        if (value) {
            const userJson = JSON.stringify(value);
            localStorage.setItem(USER, userJson);
        }
        this._current = value;
    }
    
    login = async (model: LoginModel) => {
        const {token} = await client.account.login(model);
        client.account.setBearer(token);
        this.current = await client.account.getCurrent();
    }

    async register(values: RegisterModel) {
        const {token} = await client.account.register(values);
        client.account.setBearer(token);
        this.current = await client.account.getCurrent();
    }
}

export default UserStore;