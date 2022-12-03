import {Constants, FSNetUtils, UserUtils} from 'utils';
import {switchToRole} from '../redesign/Dashboard/dashboardHelper';

// Needed because frontend uses different values than backend
const getOwnerShipName = name => {
    return name === 'Tenants in Common'
        ? 'tenantsInCommon'
        : name === 'Joint Tenants'
        ? 'jointTenants'
        : name === 'Joint Tenants with Rights of Survivorship'
        ? 'jointTenantsRights'
        : name === 'Community Property'
        ? 'communityProperty'
        : name;
};

class Navigation {
    QPNavigation(obj, data) {
        const id = this.encrypt(data.id);
        if (obj.investorType === 'Individual') {
            if (data.investorQuestions.length > 0) {
                return `/lp/additionalQuestions/${id}`;
            } else {
                return `/lp/capitalCommitment/${id}`;
            }
        } else {
            return `/lp/companiesAct/${id}`;
        }
    }

    CCNavigation(role, data, capitalLetter = false) {
        const id = this.encrypt(data.id);
        const url = [Constants.lpRole.SIGNATORY, Constants.lpRole.DELEGATE].includes(role)
            ? '/lp/lpSignatory'
            : data.isContactSheetEnabled
            ? `/lp/contact${capitalLetter ? 'S' : 's'}heet`
            : '/lp/taxReporting';
        return `${url}/${id}`;
    }

    mailingNavigation(role, data, underCaseLetter = false) {
        const id = this.encrypt(data.id);
        let url;
        if ([Constants.lpRole.SIGNATORY, Constants.lpRole.DELEGATE].includes(role)) {
            url = '/lp/lpDelegate';
        } else {
            url = `/lp/${underCaseLetter ? 'a' : 'A'}ccreditedInvestor`;
        }
        return `${url}/${id}`;
    }

    erisaNavigation(data) {
        const id = this.encrypt(data.id);
        let url = data.investorQuestions.length === 0 ? '/lp/capitalCommitment' : '/lp/additionalQuestions';
        return `${url}/${id}`;
    }

    AICooleyNavigation(data) {
        const id = this.encrypt(data.id);
        let url;
        if (data.investorQuestions.length > 0) {
            url = '/Investor/additionalQuestions';
        } else {
            url = '/Investor/capitalCommitment';
        }
        return `${url}/${id}`;
    }

    CCCooleyNavigation(data) {
        const id = this.encrypt(data.id);
        let url;
        if (data.isContactSheetEnabled) {
            url = '/Investor/contactsheet';
        } else {
            url = '/Investor/taxReporting';
        }
        return `${url}/${id}`;
    }

    reviewNavigation(data, isPath) {
        const REDESIGN_QUESTIONNAIRE_ENABLED = process.env.REACT_APP_ENABLE_REDESIGN_LP_QUESTIONNAIRE === 'true';

        const id = this.encrypt(data.id);
        let url;
        if (data.isOfflineInvestor && isPath) {
            return `/fund/view/${this.encrypt(data.fundId)}`;
        } else if (data.isOfflineInvestor) {
            window.location.href = `/fund/view/${this.encrypt(data.fundId)}`; //used window here as we have pubsub know issue.
        } else if (data.fund && data.fund.vcfirm && data.fund.vcfirm.isCooleyFirm) {
            url = '/Investor/review';
        } else {
            url = `${REDESIGN_QUESTIONNAIRE_ENABLED ? '/redesign' : ''}/lp/review`;
        }
        return `${url}/${id}`;
    }

    encrypt(id) {
        return btoa(id);
    }

    individualPostData(state, props) {
        const areYouSubscribingAsJointIndividual =
            state.investorType === Constants.JOINT_INDIVIDUAL_TYPE || state.areYouSubscribingAsJointIndividual;

        const isIndividualOrJointIndividual =
            state.investorType === Constants.JOINT_INDIVIDUAL_TYPE || state.investorType === Constants.INDIVIDUAL_TYPE;
        let postInvestorObj = {
            subscriptionId: props.subscriptionData.id,
            step: 1,
            fundId: state.fundId,
            investorType: Constants.INDIVIDUAL_TYPE,
            areYouSubscribingAsJointIndividual: areYouSubscribingAsJointIndividual,
            releaseInvestmentEntityRequired: state.releaseInvestmentEntityRequired,
            isSubjectToDisqualifyingEvent: state.isSubjectToDisqualifyingEvent,
            fundManagerInfo: state.fundManagerInfo,
            isFormChanged: state.isFormChanged,
            countryResidenceId: state.countryResidenceId ? state.countryResidenceId : 0,
            stateResidenceId: state.stateResidenceId ? state.stateResidenceId : 0,
        };

        postInvestorObj['legalTitle'] = isIndividualOrJointIndividual
            ? state.legalTitle || props.subscriptionData.trackerTitle
            : null;
        postInvestorObj['typeOfLegalOwnership'] = areYouSubscribingAsJointIndividual
            ? getOwnerShipName(state.typeOfLegalOwnership)
            : null;

        if (state.releaseInvestmentEntityRequired) {
            postInvestorObj['indirectBeneficialOwnersSubjectFOIAStatutes'] =
                state.indirectBeneficialOwnersSubjectFOIAStatutes;
        }

        if (parseInt(state.countryResidenceId) !== 231) {
            postInvestorObj['stateResidenceId'] = 0;
        }
        return postInvestorObj;
    }

    LLCPostData(state, props) {
        let postInvestorObj = {
            subscriptionId: props.subscriptionData.id,
            step: 1,
            fundId: state.fundId,
            investorType: Constants.LLC_TYPE,
            investorSubType: state.investorSubType,
            entityName: state.entityName || props.subscriptionData.trackerTitle,
            istheEntityFundOfFundsOrSimilarTypeVehicle: state.istheEntityFundOfFundsOrSimilarTypeVehicle,
            releaseInvestmentEntityRequired: state.releaseInvestmentEntityRequired,
            isSubjectToDisqualifyingEvent: state.isSubjectToDisqualifyingEvent,
            fundManagerInfo: state.fundManagerInfo,
            isEntityTaxExemptForUSFederalIncomeTax: state.isEntityTaxExemptForUSFederalIncomeTax,
            otherInvestorAttributes: state.otherInvestorAttributes.join(','),
            isFormChanged: state.isFormChanged,
        };
        if (state.investorSubType === 'otherEntity') {
            postInvestorObj['investorSubType'] = null;
            postInvestorObj['otherInvestorSubType'] = state.otherInvestorSubType;
        } else {
            postInvestorObj['otherInvestorSubType'] = null;
        }
        if (state.istheEntityFundOfFundsOrSimilarTypeVehicle) {
            postInvestorObj['isEntityTaxExemptForUSFederalIncomeTax'] = state.isEntityTaxExemptForUSFederalIncomeTax;
        }
        if (state.releaseInvestmentEntityRequired) {
            postInvestorObj['indirectBeneficialOwnersSubjectFOIAStatutes'] =
                state.indirectBeneficialOwnersSubjectFOIAStatutes;
        }
        if (state.isEntityTaxExemptForUSFederalIncomeTax === true) {
            postInvestorObj['isEntityUS501c3'] = state.isEntityUS501c3;
        }

        postInvestorObj['countryDomicileId'] = parseInt(state.investorSubTypeValue) === 0 ? state.countryDomicileId : 0;
        postInvestorObj['countryResidenceId'] =
            parseInt(state.investorSubTypeValue) === 0 ? state.countryResidenceId : 0;
        postInvestorObj['stateDomicileId'] =
            (parseInt(state.investorSubTypeValue) === 0 && parseInt(state.countryDomicileId) === 231) ||
            parseInt(state.investorSubTypeValue) === 1
                ? state.stateDomicileId
                : 0;
        postInvestorObj['stateResidenceId'] =
            (parseInt(state.investorSubTypeValue) === 0 && parseInt(state.countryResidenceId) === 231) ||
            parseInt(state.investorSubTypeValue) === 1
                ? state.stateResidenceId
                : 0;
        return postInvestorObj;
    }

    trustPostData(state, props, stepType) {
        let postInvestorObj;
        postInvestorObj = {
            subscriptionId: props.subscriptionData.id,
            step: state[stepType] ? 1 : 2,
            fundId: state.fundId,
            investorType: state.investorType,
            investorSubType: state.investorSubType,
            numberOfGrantorsOfTheTrust:
                parseInt(state.investorSubType) === 9 && !!state.numberOfGrantorsOfTheTrust
                    ? state.numberOfGrantorsOfTheTrust
                    : null,
            countryResidenceId: state.countryResidenceId ? state.countryResidenceId : 0,
            stateResidenceId: state.stateResidenceId ? state.stateResidenceId : 0,
            trustName: state.trustName || props.subscriptionData.trackerTitle,
            entityName: state.entityName,
            entityTitle: state.entityTitle,
            isEntityTaxExemptForUSFederalIncomeTax: state.isEntityTaxExemptForUSFederalIncomeTax || false,
            releaseInvestmentEntityRequired: state.releaseInvestmentEntityRequired || false,
            isSubjectToDisqualifyingEvent: state.isSubjectToDisqualifyingEvent,
            fundManagerInfo: state.fundManagerInfo,
            isEntityUS501c3: state.isEntityUS501c3 || false,
            isTrust501c3: state.isTrust501c3 || false,
            otherInvestorAttributes: state.otherInvestorAttributes.join(','),
            isFormChanged: state.isFormChanged,
        };

        if (state.releaseInvestmentEntityRequired) {
            postInvestorObj['indirectBeneficialOwnersSubjectFOIAStatutes'] =
                state.indirectBeneficialOwnersSubjectFOIAStatutes;
        }

        if (
            !props.subscriptionData.isnumberOfDirectEquityOwnersAdded &&
            parseInt(state.investorSubType) === 9 &&
            !!state.numberOfGrantorsOfTheTrust
        ) {
            postInvestorObj.numberOfDirectEquityOwners = state.numberOfGrantorsOfTheTrust;
            postInvestorObj.isnumberOfDirectEquityOwnersAdded = true;
        }

        return postInvestorObj;
    }

    generateNotificationLink = async (data = {}) => {
        const {accountType, notification, isCooleyFirm} = data;
        if (accountType !== UserUtils.getUserAccountType()) await switchToRole([accountType]);

        const type = notification?.type ? notification.type : null;
        const docType = notification?.docType ? notification.docType : null;
        const fundId = notification?.fundId ? FSNetUtils._encrypt(notification.fundId) : null;
        const subId = notification?.subscriptionId ? FSNetUtils._encrypt(notification.subscriptionId) : null;
        const docId = notification?.documentId ? FSNetUtils._encrypt(notification.documentId) : null;
        const investorPath = isCooleyFirm ? 'Investor' : 'redesign/lp';

        let notificationLink = '';
        if (type === 'FUND_INVITED') {
            notificationLink = Constants.redesignPaths.dashboard.myInvestments;
        } else if (type === 'FUND_SIGNATURE') {
            notificationLink = `/${investorPath}/review/${subId}`;
        } else if (type === 'FUND_APPROVE') {
            notificationLink = `/${investorPath}/pendingActions/${subId}`;
        } else if (['CHANGE_COMMITMENT_AGREEMENT', 'SIDE_LETTER_AGREEMENT'].includes(docType)) {
            if (UserUtils.getUserAccountType() === Constants.accountType.lp) {
                if (docType && docId) {
                    notificationLink = `/${investorPath}/review/${subId}&envelope_id=${docId}&type=${docType}&id=${subId}`;
                } else {
                    notificationLink = `/${investorPath}/review/${subId}`;
                }
            } else {
                notificationLink = `/fund/view/${fundId}&envelope_id=${docId}&type=${docType}&id=${subId}`;
            }
        } else if (type === 'MANAGE_TAX') {
            notificationLink = `/${investorPath}/taxReporting/${subId}`;
        } else {
            if (UserUtils.getUserAccountType() === Constants.accountType.lp) {
                notificationLink = `/${investorPath}/review/${subId}`;
            } else {
                notificationLink = `/fund/view/${fundId}`;
            }
        }

        window.location.href = notificationLink;
    };
}

export default new Navigation();
