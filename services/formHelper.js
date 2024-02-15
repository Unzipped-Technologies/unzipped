export function areObjectsEqual(obj1, obj2) {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);

    // Check if both objects have the same number of keys
    if (obj1Keys.length !== obj2Keys.length) {
        return false;
    }

    // Check if all keys and values in obj1 match those in obj2
    for (let key of obj1Keys) {
        if (obj1[key] !== obj2[key]) {
            return false; // If any value differs, return false
        }
    }

    // If all checks pass, return true
    return true;
}