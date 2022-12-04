var _ = require('lodash');

class SortUtil {
    _sortCategoryListAsc(list) {
        let sortList = [];
        if (list && list.length) {
            sortList = _.orderBy(list, [each => each.categoryName.toLowerCase()], ['asc']);
            let getFullyAuthorizedObj = sortList.filter(obj => obj.isFullyAuthorizedCategory === true);
            const findIndex = sortList.findIndex(x => x.isFullyAuthorizedCategory === true);
            if (findIndex > -1) {
                sortList.splice(findIndex, 1);
                sortList.unshift(getFullyAuthorizedObj[0]);
            }
        }
        return sortList;
    }

    _sortCategoryListAscInCategoryModal(list) {
        let sortList = [];
        if (list && list.length) {
            sortList = _.orderBy(list, [each => each.categoryName.toLowerCase()], ['asc']);
        }
        return sortList;
    }

    _sortArrayWithDate(list) {
        const sortList = list.sort(this.custom_sort);
        return sortList ? sortList : [];
    }

    custom_sort(a, b) {
        return new Date(b.invitedDate).getTime() - new Date(a.invitedDate).getTime();
    }

    trackerTitleAsc(a, b) {
        // Use toUpperCase() to ignore character casing
        const genreA = a.trackerTitle ? a.trackerTitle.toUpperCase() : '(NEW INVESTOR PENDING INPUT)'.toUpperCase();
        const genreB = b.trackerTitle ? b.trackerTitle.toUpperCase() : '(NEW INVESTOR PENDING INPUT)'.toUpperCase();

        let comparison = 0;
        if (genreA > genreB) {
            comparison = 1;
        } else if (genreA < genreB) {
            comparison = -1;
        }
        return comparison;
    }

    trackerTitleDesc(a, b) {
        // Use toUpperCase() to ignore character casing
        const genreA = a.trackerTitle ? a.trackerTitle.toUpperCase() : '(NEW INVESTOR PENDING INPUT)'.toUpperCase();
        const genreB = b.trackerTitle ? b.trackerTitle.toUpperCase() : '(NEW INVESTOR PENDING INPUT)'.toUpperCase();

        let comparison = 0;
        if (genreA > genreB) {
            comparison = -1;
        } else if (genreA < genreB) {
            comparison = 1;
        }
        return comparison;
    }

    firstNameAsc(a, b) {
        // Use toUpperCase() to ignore character casing
        const genreA = a['middleName']
            ? `${a['firstName']} ${a['middleName']} ${a['lastName']}`
            : `${a['firstName']} ${a['lastName']}`;
        const genreB = b['middleName']
            ? `${b['firstName']} ${b['middleName']} ${b['lastName']}`
            : `${b['firstName']} ${b['lastName']}`;

        let comparison = 0;
        if (genreA > genreB) {
            comparison = 1;
        } else if (genreA < genreB) {
            comparison = -1;
        }
        return comparison;
    }

    firstNameDesc(a, b) {
        // Use toUpperCase() to ignore character casing
        const genreA = a['middleName']
            ? `${a['firstName']} ${a['middleName']} ${a['lastName']}`
            : `${a['firstName']} ${a['lastName']}`;
        const genreB = b['middleName']
            ? `${b['firstName']} ${b['middleName']} ${b['lastName']}`
            : `${b['firstName']} ${b['lastName']}`;

        let comparison = 0;
        if (genreA > genreB) {
            comparison = -1;
        } else if (genreA < genreB) {
            comparison = 1;
        }
        return comparison;
    }
}

export default new SortUtil();
