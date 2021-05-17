import {Guid} from "guid-typescript";

interface Activity {
    venue: string;
    id: string;
    title: string;
    date: Date;
    category: string;
    description: string;
    city: string;
}

export const empty = () => ({
    id: Guid.raw(),
    title: '',
    date: new Date(),
    category: '',
    description: '',
    city: '',
    venue: ''
} as Activity)

export default Activity;