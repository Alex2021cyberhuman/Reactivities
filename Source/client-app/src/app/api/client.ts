import Axios, {AxiosResponse} from "axios";
import Activity from "../../models/Activity";

Axios.defaults.baseURL = "http://localhost:5000/api/";

const sleep = (delay: number) => new Promise((resolve) => {setTimeout(resolve, delay)});

Axios.interceptors.response.use(async (response) => {
    try {
        await sleep(2000);
        return response;
    } catch (error) {
        console.error(error);
        return await Promise.reject(error)
    }
});

const getRequestBody = <Type>(response : AxiosResponse<Type> ): Type => response.data;

const requests = {
    get: <ReturnType>(uri: string) => Axios.get<ReturnType>(uri).then(getRequestBody),
    delete: <ReturnType>(uri: string) => Axios.delete<ReturnType>(uri).then(getRequestBody),
    post: <ReturnType, InputType>(uri: string, body: InputType) => Axios.post<ReturnType>(uri, body).then(getRequestBody),
    put: <ReturnType, InputType>(uri: string, body: InputType) => Axios.put<ReturnType>(uri, body).then(getRequestBody)    
}

const mapStringToDate = (item: Activity) => {
    item.date = new Date(item.date);
    return item;
}

const activities = { 
    getList: () => requests.get<Array<Activity>>('Activities').then(items => items.map(mapStringToDate)),
    getDetails: (id: string) => requests.get<Activity>(`Activities/${id}`).then(mapStringToDate),
    delete: (id: string) => requests.delete<null>(`Activities/${id}`),
    create: (item: Activity) => requests.post<null,Activity>('Activities', item),
    edit: (item: Activity) => requests.put<null,Activity>(`Activities/${item.id}`, item)
}

const client = {
    activities: activities
}

export default client;