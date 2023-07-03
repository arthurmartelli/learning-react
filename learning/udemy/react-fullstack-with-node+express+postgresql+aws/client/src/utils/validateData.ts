function checkObjectProperties(obj: { [key: string]: any }): boolean {
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop) && obj[prop] === "") {
            return false;
        }
    }
    return true;
}

export { checkObjectProperties }