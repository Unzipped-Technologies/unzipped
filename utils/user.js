import {BrowserUtils, Constants, ConverterUtils} from './';

const isNewInvestorInviteEnabled = process.env.REACT_APP_ENABLE_NEW_INVESTOR_INVITE === 'true';

class UserUtil {

    getUserLpRole(subscription, userData) {
        const user = userData || JSON.parse(sessionStorage.getItem('userData'));
        const lpSubscription = subscription?.lpContacts?.find(lpContact => lpContact.lpUserId === user?.id);
        return lpSubscription?.role;
    }

    showChangePassword() {
        return parseInt(BrowserUtils._getId()) !== parseInt(this.getUserId()) || this.getAdminAccountType()
            ? false
            : true;
    }

    userHasOneOfRoles(roles) {
        const accountType = this.getUserAccountType();
        const isRole = roles.includes(accountType);
        const allUsers = this.getAllUsers() || [];
        const hasRole = allUsers.some(user => roles.includes(user.accountType));
        const adminUserData = this.getAdminData() || {};
        const adminIsRole = roles.includes(adminUserData.accountType);
        const adminAllUsers = this.getAdminAllUsers() || [];
        const adminHasRole = adminAllUsers.some(user => roles.includes(user.accountType));
        return isRole || hasRole || adminIsRole || adminHasRole;
    }

    getAllUsers() {
        try {
            return JSON.parse(sessionStorage.getItem('allUsers')) || [];
        } catch (e) {
            return [];
        }
    }

    getAccountTypeName(accountType, role, isNewInvestorInvite = isNewInvestorInviteEnabled) {
        let nameMask = '';
        if (accountType === 'GPSignatory') {
            nameMask = 'Fund Signatory';
        } else if (accountType === 'OfflineLP') {
            nameMask = 'Offline Investor';
        } else if (accountType === 'LP') {
            nameMask = isNewInvestorInvite ? 'Investor Signatory' : 'Investor';
            if (role === 'LpDelegate') {
                nameMask = 'Investor Delegate';
            }
        } else if (accountType === 'GPDelegate') {
            nameMask = 'Fund Delegate';
        } else if (accountType === 'FSNETAdministrator') {
            nameMask = 'Vanilla Administrator';
        } else if (accountType === 'Admin') {
            nameMask = 'Vanilla Administrator';
        }
        return nameMask ? nameMask : accountType;
    }

    getCellNumber() {
        return sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')).cellNumber : '';
    }

    impersonateSetData(data) {
        const whatsNewDisplay = data.isWhatsNewDisplay ? JSON.stringify(data.isWhatsNewDisplay) : true;

        sessionStorage.setItem('adminUserData', sessionStorage.getItem('userData'));
        sessionStorage.setItem('adminAllUsers', sessionStorage.getItem('allUsers'));
        sessionStorage.setItem('adminWhatsNewDisplay', sessionStorage.getItem('whatsNewDisplay') || whatsNewDisplay);
        sessionStorage.setItem('adminToken', sessionStorage.getItem('token'));
        sessionStorage.setItem('userData', JSON.stringify(data.user));
        sessionStorage.setItem('token', JSON.stringify(data.token));
        sessionStorage.setItem(
            'allUsers',
            data.allUsers && data.allUsers.length > 0 ? JSON.stringify(data.allUsers) : JSON.stringify([]),
        );
        sessionStorage.setItem('whatsNewDisplay', whatsNewDisplay);
    }

    userSetAllUsers(data) {
        sessionStorage.setItem(
            'allUsers',
            data.allUsers && data.allUsers.length > 0 ? JSON.stringify(data.allUsers) : JSON.stringify([]),
        );
    }

    getObject(key, defaultValue) {
        try {
            const value = this.get(key, JSON.stringify(defaultValue));
            return JSON.parse(value);
        } catch (e) {
            return null;
        }
    }

    remove(key) {
        return sessionStorage.removeItem(key);
    }

    get(key, defaultValue) {
        const result = sessionStorage.getItem(key);
        return result || defaultValue;
    }

    set(key, value) {
        sessionStorage.setItem(key, value);
        return sessionStorage.getItem(key);
    }

    removeItem(key) {
        sessionStorage.removeItem(key);
    }

    getItem(key) {
        const item = sessionStorage.getItem(key);
        if (item !== 'null' && item !== 'undefined') {
            return item;
        } else {
            return null;
        }
    }

    setItem(key, value) {
        sessionStorage.setItem(key, value);
    }

    setUser(user) {
        sessionStorage.setItem('userData', JSON.stringify(user));
    }

    clearLocalStorage() {
        sessionStorage.clear();
    }

    userSetData(data, isFromUserRole = false) {
        this.setUser(data.user);
        sessionStorage.setItem('firmId', JSON.stringify(data.user.vcfirmId));
        sessionStorage.setItem('token', JSON.stringify(data.token));
        this.userSetAllUsers(data);
        if (!isFromUserRole) {
            sessionStorage.setItem(
                'whatsNewDisplay',
                typeof data.isWhatsNewDisplay === 'boolean' ? JSON.stringify(data.isWhatsNewDisplay) : true,
            );
        }
    }

    isWhatsNewEnabled() {
        const whatsNew = sessionStorage.getItem('whatsNewDisplay');
        return whatsNew ? JSON.parse(whatsNew) : true;
    }

    isCooleyDomainUser(email = false) {
        // If no email is provided, function will default
        // to checking logged in user/impersonated user
        const userEmail = email || JSON.parse(sessionStorage.getItem('userData'))?.email;

        if (!userEmail) {
            return false;
        }
        const domains = process.env.REACT_APP_COOLEY_USER_DOMAIN.split(',');
        return domains.some(domain => userEmail.includes(domain));
    }

    isCooleyGchDomainEmail(email) {
        const domains = process.env.REACT_APP_COOLEY_GCH_USER_DOMAIN.split(',');
        return domains.some(domain => email.includes(domain));
    }

    getUserDefaultDashboard() {
        const user = this.getUserData();
        const allUsers = this.getAllUsers();

        if (Constants.adminAccountTypes.includes(user.accountType)) {
            return Constants.redesignPaths.dashboard.admin;
        } else if (Constants.fundManagerAccountTypes.includes(user.accountType)) {
            return Constants.redesignPaths.dashboard.myFunds;
        } else if (allUsers.some(user => user.hasSyndications)) {
            return Constants.redesignPaths.dashboard.mySyndications;
        } else if (Constants.investorAccountTypes.includes(user.accountType)) {
            return Constants.redesignPaths.dashboard.myInvestments;
        } else if (Constants.GCHManagerAccountTypes.includes(user.accountType)) {
            return Constants.redesignPaths.dashboard.gchAdmin;
        } else {
            return Constants.redesignPaths.dashboard.dashboardSlug;
        }
    }

    /**
     * Validate that an initial is a single character from A to Z
     * @param {string} initial - single initial (A-Z) in uppercase
     * @returns {string} - the initial or an empty string if invalid
     */
    validateInitial(initial) {
        const initialRegEx = /^[A-Z]$/;
        return initialRegEx.test(initial) ? initial : '';
    }

    /**
     * Format the first and last initial as one string: Ford Prefect becomes `FP`
     * @param {string} firstName
     * @param {string} lastName
     * @returns {string} initials - initials formatted as `FP`
     */
    getInitials({firstName, lastName}) {
        const firstInitial = firstName?.charAt(0).toUpperCase();
        const lastInitial = lastName?.charAt(0).toUpperCase();
        return `${this.validateInitial(firstInitial)}${this.validateInitial(lastInitial)}`;
    }

    /**
     * Checks if the current user is utilizing the without account flow
     * @returns {boolean} result - the result of checking which flow the user is utilizing
     */
    isWithoutAccount() {
        if (isNewInvestorInviteEnabled) {
            return this.getUserData()?.withoutAccount === true;
        }
        return false;
    }

    /**
     * Updates the specified values provided within the userData key in sessionStorage
     * @param {object} updateValues
     * @returns {void}
     */
    updateUserDataValues(updateValues = {}) {
        const currentUserData = this.getUserData();

        this.setUser({
            ...currentUserData,
            ...updateValues,
        });
    }

    /**
     * Checks if the current user utilizing the without account flow has an existing account in Vanilla
     * @returns {boolean} result - the result of if the user has an existing account
     */
    hasExistingAccount() {
        if (isNewInvestorInviteEnabled) {
            return this.getUserData()?.hasExistingAccount === true;
        }
        return false;
    }

    /**
     * Removes any keys in the userData object associated with the without account flow
     * @returns {void} result - the result of if the user has an existing account
     */
    removeWithoutAccountData() {
        /* eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }] */
        const {hasExistingAccount, withoutAccount, token, ...userData} = this.getUserData();
        this.setUser(userData);
    }

    removeLandingPageData() {
        this.removeItem('token');
        this.removeItem('redirectPage');
        this.removeItem('userData');
        this.removeItem('redirectTo');
    }
}

export default new UserUtil();
