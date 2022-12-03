import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Button, Icon} from 'components/ui';
import SyndicationBadge from 'components/ui/SyndicationBadge';
import SyndicationTitle from 'components/ui/SyndicationTitle';
import {syndicationStatuses, syndicationUserStatusTypes} from 'utils/constants';

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

const CardBadge = styled(SyndicationBadge)`
    min-width: 107px;
    height: 24px;
    padding: 5px 9px;
    text-align: center;
`;

const Title = styled(SyndicationTitle)`
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
const DashboardSyndicationCard = ({
    image = '',
    favorite = false,
    viewButtonOnClick,
    onFavoriteToggle,
    name = '',
    status,
    children = null,
    metadata = null,
    buttonText = 'View Syndication',
    badgeColor = '',
    className,
}) => {
    const getBadgeStatus = status => {
        const statuses = {
            [syndicationUserStatusTypes.INPUT_COMPLETE]: 'INPUT COMPLETE - SYNDICATION DECISION PENDING',
            [syndicationUserStatusTypes.PAYMENT_PENDING]: 'CLOSED - PAYMENT PENDING',
            [syndicationUserStatusTypes.PAYMENT_RECEIVED]: 'CLOSED - PAYMENT RECEIVED',
            [syndicationStatuses.ALLOCATED]: `ALLOCATED - READY TO FINALIZE`,
            [syndicationStatuses.DEADLINE_PASSED]: `DEADLINE PASSED - AWAITING ALLOCATION`,
        };
        return statuses[status] || status;
    };
    return (
        <DashboardCardContainer className={className}>
            <HeaderAndButtonsContainer>
                <Title size="medium" name={name} metadata={metadata} image={image} />
                <SubscriptionCardBadgeContainer>
                    <CardBadge color={badgeColor} status={status}>
                        {getBadgeStatus(status)}
                    </CardBadge>
                </SubscriptionCardBadgeContainer>
                <ButtonAndStarContainer>
                    <StarIconButton onClick={onFavoriteToggle} title="Favorite">
                        {favorite ? <Icon name="starFull" /> : <Icon name="starEmpty" />}
                    </StarIconButton>
                    <DashboardCardButton icon="arrowRight" iconRight small onClick={viewButtonOnClick}>
                        {buttonText}
                    </DashboardCardButton>
                </ButtonAndStarContainer>
            </HeaderAndButtonsContainer>
            <SubscriptionCardBadgeContainer mobile>
                <CardBadge color={badgeColor} status={status}>
                    {getBadgeStatus(status)}
                </CardBadge>
            </SubscriptionCardBadgeContainer>
            <DashboardContentContainer>{children}</DashboardContentContainer>
            <DashboardCardMobileButton block icon="arrowRight" iconRight onClick={viewButtonOnClick}>
                {buttonText}
            </DashboardCardMobileButton>
        </DashboardCardContainer>
    );
};

DashboardSyndicationCard.propTypes = {
    /** view button on click function */
    viewButtonOnClick: PropTypes.func.isRequired,
    /** star icon on click function */
    onFavoriteToggle: PropTypes.func.isRequired,
    /** children the component contains */
    children: PropTypes.node,
    /** the name for the fund title component */
    name: PropTypes.string,
    /** text to display in the button */
    buttonText: PropTypes.string,
    /** Override all other metadata types with a single string */
    metadata: PropTypes.string,
    /** color of badge component */
    badgeColor: PropTypes.string,
    /** Fund status */
    status: PropTypes.string.isRequired,
    /** Path to syndication image */
    image: PropTypes.string,
};

export default DashboardSyndicationCard;
