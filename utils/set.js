const areSetsEqual = (as, bs) => {
    if (as.size !== bs.size) {
        return false;
    }
    for (const a of as) {
        if (!bs.has(a)) {
            return false;
        }
    }
    return true;
};

export default {
    areSetsEqual,
};
