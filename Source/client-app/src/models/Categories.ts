import {Option} from "../app/components/form/CustomSelect";

export const categories = ({
    CULTURE: 'Culture',
    DRINKS: 'Drinks',
    FILM: 'Film',
    FOOD: 'Food',
    MUSIC: 'Music',
    TRAVEL: 'Travel',
})

export const getCategoryList = () => Object.entries(categories).map(([, value]) => value);

export const getCategoryOptions = () => getCategoryList().map(value => ({text: value, value} as Option));