// Needed because frontend uses different values than backend
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
}

export default new Navigation();
