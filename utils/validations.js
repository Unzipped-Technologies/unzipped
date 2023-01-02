import {PhoneNumberUtil} from 'google-libphonenumber';
import Constants from './constants';
import { planEnum } from '../server/enum/planEnum';

class Validations {
    isEmpty(obj) {
        // null and undefined are "empty"
        if (obj == null) return true;

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0) return false;
        if (obj.length === 0) return true;

        // If it isn't an object at this point
        // it is empty, but it can't be anything *but* empty
        // Is it empty?  Depends on your application.
        if (typeof obj !== 'object') return true;

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }

        return true;
    }

    getFullNameFromUser(user) {
        return `${user?.FirstName || ''} ${user?.LastName || ''}`
    }

    _isNull(value) {
        if (value === '') return true;
        if (value === undefined) return true;
        if (value === null) return true;
        return false;
    }

    _isNumber(data) {
        const re = /^[0-9\b]+$/;
        if (re.test(data)) {
            return true
        }
        if (data==='') return true;
        return false;
    }

    _percentValidate(data) {
        const isNumber = this._isNumber(data)
        if (isNumber) {
            if (data >= 0 && data <= 100) {
                return true
            }
        }
        if (data === '') {
            return true
        }
        return false
    }

    checkNullOrEmpty(list, obj) {
        for (let index of list) {
            const value = obj[index];

            if (
                list.includes('countryResidenceId') &&
                obj.countryResidenceId === 231 &&
                (!obj.stateResidenceId || parseInt(obj.stateResidenceId) === 0)
            ) {
                return false;
            } else if (
                ['', null, undefined].includes(value) ||
                (index.includes('Id') && parseInt(value) === 0) ||
                (index === 'otherInvestorAttributes' && value && value.length === 0)
            ) {
                return false;
            }
        }

        if (obj.investorType === 'LLC' && list.includes('entityName')) {
            if ([1, 2, 3, 4, 5].indexOf(parseInt(obj.investorSubType)) === -1) {
                const errorCondition1 =
                        obj.countryDomicileId === 231 && (!obj.stateDomicileId || parseInt(obj.stateDomicileId) === 0),
                    errorCondition2 =
                        obj.countryResidenceId === 231 &&
                        (!obj.stateResidenceId || parseInt(obj.stateResidenceId) === 0);

                if (
                    errorCondition1 ||
                    errorCondition2 ||
                    !obj.countryDomicileId ||
                    parseInt(obj.countryDomicileId) === 0 ||
                    !obj.countryResidenceId ||
                    parseInt(obj.countryResidenceId) === 0
                ) {
                    return false;
                }

                if (!obj.investorSubType && !obj.otherInvestorSubType) {
                    return false;
                }
            } else {
                let selectedFileds = ['stateDomicileId', 'stateResidenceId'];
                for (let idx of selectedFileds) {
                    if (!obj[idx] || parseInt(obj[idx]) === 0) {
                        return false;
                    }
                }
            }
        }

        const hasMailingAddressCountryOrState =
            list.includes('mailingAddressCountry') || list.includes('mailingAddressState');

        if (
            hasMailingAddressCountryOrState &&
            (parseInt(obj.mailingAddressCountry) === 0 || parseInt(obj.mailingAddressState) === 0)
        ) {
            return false;
        }

        // Check mandatory fields
        if (
            list.includes('areYouSubscribingAsJointIndividual') &&
            obj.investorType === 'Individual' &&
            obj.areYouSubscribingAsJointIndividual &&
            (!obj.typeOfLegalOwnership || !obj.legalTitle)
        ) {
            return false;
        }

        const noMailingCountry = !list.includes('mailingAddressCountry'),
            isIndividual = obj.investorType === 'Individual',
            countryError =
                parseInt(obj.countryResidenceId) === 231 &&
                (parseInt(obj.stateResidenceId === 0) || !obj.stateResidenceId);

        if (
            noMailingCountry &&
            isIndividual &&
            (countryError || !obj.countryResidenceId || parseInt(obj.countryResidenceId) === 0)
        ) {
            return false;
        }

        const releaseInvestmentRequired = list.includes('releaseInvestmentEntityRequired'),
            investorTypeMatch = ['Individual', 'LLC', 'Trust'].includes(obj.investorType);

        if (
            releaseInvestmentRequired &&
            investorTypeMatch &&
            obj.releaseInvestmentEntityRequired &&
            !obj.indirectBeneficialOwnersSubjectFOIAStatutes
        ) {
            return false;
        }

        const isExemptIncluded = list.includes('isEntityTaxExemptForUSFederalIncomeTax'),
            isLLC = obj.investorType === 'LLC',
            isTrust = obj.investorType === 'Trust';

        if (isExemptIncluded && (isLLC || isTrust) && obj.isEntityTaxExemptForUSFederalIncomeTax) {
            if ((isLLC && this._isNull(obj.isEntityUS501c3)) || (isTrust && this._isNull(obj.isTrust501c3))) {
                return false;
            }
        }

        return true;
    }

    /**
     * Indicates whether an email validation has failed on a given input.
     * @param {string} email - Potential email
     * @returns {boolean} true if NOT a valid email
     */
    _emailValidation(email) {
        let error = false;
        let emailRegex = Constants.EMAIL_REGEX;
        if (!email || !emailRegex.test(email)) {
            error = true;
        }
        return error;
    }

    // _passwordValidation(pw) {
    //     return /[A-Z]/       .test(pw) &&
    //     /[a-z]/       .test(pw) &&
    //     /[0-9]/       .test(pw) &&
    //     /[^A-Za-z0-9]/.test(pw) &&
    //     pw.length > 8;
    // }

    // weak validator for now
    _passwordValidation(pw) {
        return pw.length >= 8;
    }

    _cellNumberValidation(number) {
        let error = false;
        if (number && !this.validatePhoneNumber(number)) {
            error = true;
        }
        return error;
    }

    validatePhoneNumber(phoneNumber) {
        /*
            Phone number validation using google-libphonenumber
            */
        let valid = false;
        try {
            const phoneUtil = PhoneNumberUtil.getInstance();
            valid = phoneUtil.isValidNumber(phoneUtil.parse(phoneNumber));
        } catch (e) {
            valid = false;
        }
        return valid;
    }

    validateFundCapitalCommitmentValues(stateObj) {
        const {capitalCommitmentType} = stateObj;
        const minCapitalCommitment = parseInt(stateObj.minCapitalCommitment);
        const maxCapitalCommitment = parseInt(stateObj.maxCapitalCommitment);
        const defaultCapitalCommitment = parseInt(stateObj.defaultCapitalCommitment);

        let error = false,
            message = '';

        if (capitalCommitmentType === 'range') {
            if (
                minCapitalCommitment === maxCapitalCommitment ||
                minCapitalCommitment >= maxCapitalCommitment ||
                (maxCapitalCommitment === 0 && maxCapitalCommitment === 0) ||
                maxCapitalCommitment === 0 ||
                isNaN(minCapitalCommitment) ||
                isNaN(maxCapitalCommitment)
            ) {
                error = true;
                message = 'Please input a maximum commitment value that is greater than the minimum commitment value.';
            }
        } else if (capitalCommitmentType === 'limit') {
            if (defaultCapitalCommitment === 0 || defaultCapitalCommitment === null) {
                error = true;
                message = 'Please input a default commitment value that is greater than 0.';
            }
        }
        return {error, message};
    }

    removeDuplicateObjectFromArray(array, key) {
        return array.filter((obj, index, self) => index === self.findIndex(el => el[key] === obj[key]));
    }

    checkNumberEven(num) {
        //check if the number is even
        if(num % 2 == 0) {
            return true;
        }

        // if the number is odd
        else {
            return false;
        }
    }
    
    // Date helpers

    formatDate(data) {
        const date = new Date(data);
        /* Date format you have */
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear() + 1}`;
    }

    formatDateWithDate(data) {
        const date = new Date(data);
        /* Date format you have */
        return `${this.getMonthInText(date, true)}. ${date.getDate()}, ${date.getFullYear()}`;
    }

    getTimeFormated(data) {
        return new Date(data).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }

    getMonthInText(date, short) {
        // Creating a date object
        const today = new Date(date);

        // Getting full month name (e.g. "June")
        return today.toLocaleString('default', { month: short ? 'short' : 'long' });
    }

    addDaysToDate(time, days) {
        const date = new Date(time);
        // Add ten days to specified date
        return date.setDate(date.getDate() + days);
    }

    validateInvestorCapitalCommitmentValue(value, propsObj) {
        const {minCapitalCommitment, maxCapitalCommitment} = propsObj;
        const lpCapitalCommitment = parseFloat(value);

        let error = false,
            message = '';

        if (minCapitalCommitment !== null) {
            if (minCapitalCommitment > lpCapitalCommitment) {
                error = true;
                message = 'This amount falls outside the required commitment range. Please update the amount.';
            }
        }

        if (maxCapitalCommitment !== null) {
            if (maxCapitalCommitment < lpCapitalCommitment) {
                error = true;
                message = 'This amount falls outside the required commitment range. Please update the amount.';
            }
        }

        return {error, message};
    }

    // product helpers

    getPlanCost(id) {
        switch (id) {
            case planEnum.BASIC:
                return 29
            case planEnum.STANDARD:
                return 79
            case planEnum.ADVANCED:
                return 299
        }
    }
}

export default new Validations();
