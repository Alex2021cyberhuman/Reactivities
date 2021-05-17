import Axios, {AxiosResponse} from "axios";
import Activity from "../../models/Activity";

Axios.defaults.baseURL = "http://localhost:5000/api/";

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

const getActivityMap = (items: Activity[]) => {
    return new Map(items.map(item => [item.id, item]))
}

const activities = { 
    getMap: () =>{
        return requests
            .get<Array<Activity>>('Activities')
            .then(items => items.map(mapStringToDate))
            .then(getActivityMap);
    },
    getDetails: (id: string) => requests.get<Activity>(`Activities/${id}`).then(mapStringToDate),
    delete: (id: string) => requests.delete<null>(`Activities/${id}`),
    create: (item: Activity) => requests.post<null,Activity>('Activities', item),
    edit: (item: Activity) => requests.put<null,Activity>(`Activities/${item.id}`, item)
}

const client = {
    activities: activities
}

export default client;