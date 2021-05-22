import {Option} from "../app/components/form/CustomSelect";

export const categories = ({
    CULTURE: 'Culture',
    DRINKS: 'Drinks',
    FILM: 'Film',
    FOOD: 'Food',
    MUSIC: 'Music',
    TRAVEL: 'Travel',
})

export const getCategoryOptions = () => Object.entries(categories).map(([key, value]) => ({text: value, value} as Option));