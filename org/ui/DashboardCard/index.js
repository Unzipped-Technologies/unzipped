import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Button, Icon, Badge} from 'components/ui';
import FundTitle from 'components/ui/FundTitle';
import {Constants} from 'utils';

const DashboardCardContainer = styled.div`
    background: ${props => props.theme.tint5};
    border: 2px solid ${props => props.theme.tint3};
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin: 5px 0;
    width: 100%;
`;

const HeaderAndButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const SubscriptionCardBadgeContainer = styled.div`
    margin-top: 5px;
    display: ${props => (props.mobile ? 'none' : 'inline-block')};

    @media (max-width: ${props => props.theme.tabletWidth}px) {
        display: ${props => (props.mobile ? 'inline-block' : 'none')};
    }
`;

const SubscriptionCardBadge = styled(Badge)`
    min-width: 107px;
    height: 24px;
    padding: 5px 9px;
    text-align: center;
    ${props => (props.clickable ? 'cursor: pointer' : '')}
`;

const FundTitleContainer = styled(FundTitle)`
    margin-bottom: 15px;
    margin-right: 20px;
`;

const ButtonAndStarContainer = styled.div`
    display: flex;
    align-items: flex-start;
    flex-grow: 1;
    justify-content: end;
`;

const StarIconButton = styled.button`
    background: transparent;
    border: none;
    font-size: 0;
    margin-right: 20px;
    line-height: 0.8;
    margin-top: 5px;
    cursor: pointer;
`;

const DashboardContentContainer = styled.div`
    @media (max-width: ${props => props.theme.mobileWidth}px) {
        padding-bottom: 0;
    }
`;

const DashboardCardButton = styled(Button)`
    & > div > svg {
        width: auto;
        height: auto;
        padding-bottom: 1px;
    }
    @media (max-width: ${props => props.theme.phoneWidth}px) {
        display: none;
    }
`;

const DashboardCardMobileButton = styled(Button)`
    margin-top: 20px;
    & > div > svg {
        width: auto;
        height: auto;
        padding-bottom: 1px;
    }
    @media (min-width: ${props => props.theme.phoneWidth}px) {
        display: none;
    }
`;

/**
 * Dashboard Card Component.
 */
const DashboardCard = ({
    favorite,
    viewFundButtonOnClick,
    viewActionsRequiredOnClick,
    children,
    onFavoriteToggle,
    small,
    subscriptionStatus,
    fundImage = '',
    fundTitleName,
    fundTitleDateInvited,
    fundTitleDateJoined,
    fundTitleSubscriptionName,
    fundTitleInvestorType,
    buttonText,
    className,
    finalClosingDate,
    lastUpdatedDate,
    metadata,
    badgeColor,
    status,
    role,
}) => {
    const toggleFavoriteOnAndOff = () => {
        onFavoriteToggle();
    };

    /* If a badgeColor is provided, we want to give priority to the color provided
    over the default color associated with the status */
    const checkForDefaultStatusColorOverride = badgeColor ? null : subscriptionStatus;

    const renderBadge = () => {
        if (subscriptionStatus === Constants.subscriptionStatus.actionRequired && viewActionsRequiredOnClick) {
            return (
                <SubscriptionCardBadgeContainer>
                    <div onClick={viewActionsRequiredOnClick}>
                        <SubscriptionCardBadge color={badgeColor} status={checkForDefaultStatusColorOverride} clickable>
                            {subscriptionStatus}
                        </SubscriptionCardBadge>
                    </div>
                </SubscriptionCardBadgeContainer>
            );
        } else if (subscriptionStatus) {
            return (
                <SubscriptionCardBadgeContainer>
                    <SubscriptionCardBadge color={badgeColor} status={checkForDefaultStatusColorOverride}>
                        {subscriptionStatus}
                    </SubscriptionCardBadge>
                </SubscriptionCardBadgeContainer>
            );
        }
    };

    return (
        <DashboardCardContainer className={className}>
            <HeaderAndButtonsContainer>
                <FundTitleContainer
                    finalClosingDate={finalClosingDate}
                    size={'medium'}
                    name={fundTitleName}
                    dateInvited={fundTitleDateInvited}
                    dateJoined={fundTitleDateJoined}
                    subscriptionName={fundTitleSubscriptionName}
                    investorType={fundTitleInvestorType}
                    lastUpdatedDate={lastUpdatedDate}
                    metadata={metadata}
                    badgeColor={badgeColor}
                    status={status}
                    role={role}
                    fundImage={fundImage}
                />
                {renderBadge()}
                <ButtonAndStarContainer>
                    <StarIconButton onClick={toggleFavoriteOnAndOff} title="Favorite">
                        {favorite ? <Icon name="starFull" /> : <Icon name="starEmpty" />}
                    </StarIconButton>
                    {subscriptionStatus !== Constants.subscriptionStatus.invited && (
                        <DashboardCardButton icon="arrowRight" iconRight small onClick={viewFundButtonOnClick}>
                            {buttonText}
                        </DashboardCardButton>
                    )}
                </ButtonAndStarContainer>
            </HeaderAndButtonsContainer>
            {subscriptionStatus && (
                <SubscriptionCardBadgeContainer mobile>
                    <SubscriptionCardBadge status={subscriptionStatus}>{subscriptionStatus}</SubscriptionCardBadge>
                </SubscriptionCardBadgeContainer>
            )}
            <DashboardContentContainer>{children}</DashboardContentContainer>
            {subscriptionStatus !== Constants.subscriptionStatus.invited && (
                <DashboardCardMobileButton
                    block
                    small={small}
                    icon="arrowRight"
                    iconRight
                    onClick={viewFundButtonOnClick}>
                    {buttonText}
                </DashboardCardMobileButton>
            )}
        </DashboardCardContainer>
    );
};

DashboardCard.propTypes = {
    /** view fund button on click function */
    viewFundButtonOnClick: PropTypes.func.isRequired,
    /** view actions required button on click function */
    viewActionsRequiredOnClick: PropTypes.func,
    /** star icon on click function */
    onFavoriteToggle: PropTypes.func.isRequired,
    /** children the component contains */
    children: PropTypes.node,
    /** Fund final closing date  */
    finalClosingDate: PropTypes.string,
    /** the subscription status of the investor */
    subscriptionStatus: PropTypes.string,
    /** the name for the fund title component */
    fundTitleName: PropTypes.string,
    /** the date joined for the fund title component */
    fundTitleDateJoined: PropTypes.string,
    /** the subscription name for the fund title component */
    fundTitleSubscriptionName: PropTypes.string,
    /** the type for the investor type */
    fundTitleInvestorType: PropTypes.string,
    /** text to display in the button */
    buttonText: PropTypes.string,
    /** Date to display Last Updated */
    lastUpdatedDate: PropTypes.string,
    /** Override all other metadata types with a single string */
    metadata: PropTypes.string,
    /** color of badge component */
    badgeColor: PropTypes.string,
    /** Fund status */
    status: PropTypes.string,
    /** the role for the investor/fund */
    role: PropTypes.string,
    /** Path to fund image */
    fundImage: PropTypes.string,
};

DashboardCard.defaultProps = {
    favorite: false,
    children: null,
    finalClosingDate: null,
    fundTitleName: '',
    fundTitleDateJoined: '',
    fundTitleSubscriptionName: '',
    fundTitleInvestorType: '',
    buttonText: 'View Fund',
    lastUpdatedDate: null,
    metadata: null,
    badgeColor: '',
    status: null,
    totalInvestors: '',
};

export default DashboardCard;
