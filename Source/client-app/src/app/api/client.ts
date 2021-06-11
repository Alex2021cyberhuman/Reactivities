import Axios, {AxiosResponse} from "axios";
import Activity from "../../models/Activity";
import {history} from "../../index";
import {toast} from "react-toastify";
import {getNewValidationError} from "../../features/errors/ValidationErrors";
import LoginModel from "../../models/LoginModel";
import AccessTokenResponse from "../../models/AccessTokenResponse";
import User from "../../models/User";
import RegisterModel from "../../models/RegisterModel";
import RegisterModel from "../../models/RegisterModel";

const ACCESS_TOKEN = 'accessToken';
const BASE_URL = 'http://localhost:5000/api/';

Axios.defaults.baseURL = BASE_URL;

const getRequestBody = <Type>(response: AxiosResponse<Type>): Type => response.data;

Axios.interceptors.request.use(value => {
    if (value.baseURL === BASE_URL) {
        value.headers['Authorization'] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`;
    }
    return value;
})

Axios.interceptors.response.use(value => value, (error) => {
    const {response} = error;
    switch (response.status) {
        case 404:
            history.push('/notFound');
            break;
        case 500:
            toast.error('Internal server error');
            break;
        case 400:
            toast(getNewValidationError(Object.entries(response.data.errors).map(([key, problems]) => ({
                key,
                problems
            }))));
            console.log(error.response);
            break;
        case 401:
            history.push("/login");
    }
    return Promise.reject(error);
})

const requests = {
    get: <ReturnType>(uri: string) => Axios.get<ReturnType>(uri).then(getRequestBody),
    delete: <ReturnType>(uri: string) => Axios.delete<ReturnType>(uri).then(getRequestBody),
    post: <ReturnType, InputType>(uri: string, body: InputType) => Axios.post<ReturnType>(uri, body).then(getRequestBody),
    put: <ReturnType, InputType>(uri: string, body: InputType) => Axios.put<ReturnType>(uri, body).then(getRequestBody)
}

const mapDateStringToDate = (item: Activity) => {
    item.date = new Date(item.date);
    return item;
}

const mapExpiresStringToDate = (item: AccessTokenResponse) => {
    item.expires = new Date(item.expires);
    return item;
}

const getActivityMap = (items: Activity[]) => {
    return new Map(items.map(item => [item.id, item]))
}

const activities = {
    getMap: () => {
        return requests
            .get<Array<Activity>>('Activities')
            .then(items => items.map(mapDateStringToDate))
            .then(getActivityMap);
    },
    getDetails: (id: string) => requests.get<Activity>(`Activities/${id}`).then(mapDateStringToDate),
    delete: (id: string) => requests.delete<null>(`Activities/${id}`),
    create: (item: Activity) => requests.post<null, Activity>('Activities', item),
    edit: (item: Activity) => requests.put<null, Activity>(`Activities/${item.id}`, item)
}

const account = {
    login: (model: LoginModel) => requests.post<AccessTokenResponse, LoginModel>("Account/Login", model).then(mapExpiresStringToDate),
    setBearer(token: string) {
        localStorage.setItem(ACCESS_TOKEN, token);
    },
    getCurrent: () => requests.get<User>("Account"),
    register: (model: RegisterModel) => 
        requests.post<AccessTokenResponse, RegisterModel>
        ("Account/Register", model).then(mapExpiresStringToDate)
}

const client = {
    activities,
    account
}

export default client;