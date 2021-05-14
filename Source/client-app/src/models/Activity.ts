interface Activity {
    venue: string;
    id: string;
    title: string;
    date: string;
    category: string;
    description: string;
    city: string;
}

export const empty = () => {
    let activity: Activity = {
        id: '',
        title: '',
        date: new Date().toJSON(),
        category: '',
        description: '',
        city: '',
        venue: ''
    }
    return activity;
}

export default Activity;