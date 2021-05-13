interface Activity {
    id: string;
    title: string;
    date: Date;
    category: string;
    description: string;
    city: string;
}

export const empty = () => {
    let activity: Activity = {
        id: '',
        title: '',
        date: new Date(),
        category: '',
        description: '',
        city: ''
    }
    return activity;
}

export default Activity;