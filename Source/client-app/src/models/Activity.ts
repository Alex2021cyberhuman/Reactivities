interface Activity {
    venue: string;
    id: string | null;
    title: string;
    date: Date;
    category: string;
    description: string;
    city: string;
}

export const empty = () => ({
    id: null,
    title: '',
    date: new Date(),
    category: '',
    description: '',
    city: '',
    venue: ''
} as Activity)

export default Activity;