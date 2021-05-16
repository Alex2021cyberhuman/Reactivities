// eslint-disable-next-line no-extend-native
Date.prototype.toISODateString = function () {
    if (!this || !('toISOString' in this)) return '';
    // @ts-ignore
    const date = this as Date;
    return date.toISOString().split('T')[0];
};

export {};