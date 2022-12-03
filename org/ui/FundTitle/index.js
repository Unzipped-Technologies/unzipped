import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Badge from 'components/ui/Badge';
import fundIcon from '../icons/fund.svg';
import {ConverterUtils} from 'utils';
import {statusFormat} from 'components/ui/utils/dataFormat';

const sizes = {
    big: {
        fontSize: 30,
        marginRight: 5,
        height: 4,
        iconHeight: 80,
        iconWidth: 80,
        iconMarginRight: 20,
        fundIconHeight: 40,
        fundImageHeight: 80,
        fundImageWidth: 80,
        metaDataFontSize: 14,
    },
    medium: {
        fontSize: 20,
        marginRight: 5,
        height: 4,
        iconHeight: 40,
        iconWidth: 40,
        iconMarginRight: 10,
        fundIconHeight: 20,
        fundImageHeight: 40,
        fundImageWidth: 40,
        metaDataFontSize: 14,
    },
    small: {
        fontSize: 10,
        marginRight: 5,
        height: 4,
        iconHeight: 30,
        iconWidth: 30,
        iconMarginRight: 6,
        fundIconHeight: 16,
        fundImageHeight: 30,
        fundImageWidth: 30,
        metaDataFontSize: 10,
    },
};

const TitleContainer = styled.div`
    max-width: 520px;
    display: flex;
    align-items: center;
    font-family: arial, sans-serif;
    flex-wrap: nowrap;
`;

const Title = styled.div`
    font-weight: 600;
    word-break: break-all;
    margin-right: ${props => sizes[props.$size].marginRight}px;
    color: ${props => props.theme.text};
    font-size: ${props => parseFloat(sizes[props.$size].fontSize / 16)}rem;

    @media (max-width: ${props => props.theme.phoneWidth}px) {
        font-size: 1.25rem;
    }
`;

const MetaData = styled.div`
    font-size: ${props => parseFloat(sizes[props.$size].metaDataFontSize / 16)}rem;
    font-weight: 400;
    margin-top: 3px;
    color: ${props => props.theme.textSecondary};
    word-break: normal;

    @media (max-width: ${props => props.theme.tabletWidth}px) {
        font-size: ${props => props.theme.fontSizeS};
    }
`;

const Icon = styled.div`
    background: ${props => props.theme.tint3};
    height: ${props => sizes[props.$size].iconHeight}px;
    width: ${props => sizes[props.$size].iconWidth}px;
    margin-right: ${props => sizes[props.$size].iconMarginRight}px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    place-self: start;

    @media (max-width: ${props => props.theme.mobileWidth}px) {
        padding: 0 20px;
    }
`;

const FundIcon = styled.img`
    height: ${props => sizes[props.$size].fundIconHeight}px;

    @media (max-width: ${props => props.theme.tabletWidth}px) {
        padding: 0 20px;
    }
`;

const FundImage = styled.img`
    max-width: ${props => sizes[props.$size].fundImageWidth}px;
    max-height: ${props => sizes[props.$size].fundImageHeight}px;
`;

const SyndicationBadge = styled(Badge)`
    margin-left: 22px;
`;

/**
 * Fund Title Component.
 */
const FundTitle = ({
    name,
    status,
    invited,
    className,
    created,
    totalInvestors,
    size,
    fundImage,
    dateJoined,
    dateInvited,
    subscriptionName,
    investorType,
    metadata,
    badgeColor,
    finalClosingDate,
    lastUpdatedDate,
    hideInvestorType,
    role,
}) => {
    const displayedStatus = statusFormat(status);

    const investorNameArray = [subscriptionName, !hideInvestorType && (investorType || 'Not Yet Defined')];
    const investorDetailsArray = [
        investorNameArray.filter(Boolean).join(' - '),
        totalInvestors && `${totalInvestors} Total Investors`,
        created && `Created ${ConverterUtils.dateStringToReadableDate(created)}`,
        invited && `Invited ${invited}`,
        dateJoined && `Joined ${ConverterUtils.dateStringToReadableDate(dateJoined)}`,
        dateInvited && !dateJoined && `Invited ${ConverterUtils.dateStringToReadableDate(dateInvited)}`,
        lastUpdatedDate && `Last Updated ${ConverterUtils.dateStringToReadableDate(lastUpdatedDate)}`,
        finalClosingDate &&
            `Final Closing Date ${ConverterUtils.dateStringToReadableDate(
                ConverterUtils.utcDateToLocalTimezoneWithoutFormat(finalClosingDate),
            )}`,
        role,
    ];

    const investorDetails = investorDetailsArray.filter(Boolean).join(' • ');

    return (
        <TitleContainer $size={size} className={className}>
            <Icon $size={size} sizes={sizes} $fundImage={fundImage}>
                {fundImage ? (
                    <FundImage $size={size} src={fundImage} alt="Fund Image" />
                ) : (
                    <FundIcon $size={size} src={fundIcon} alt="Fund Icon" />
                )}
            </Icon>
            <Title $size={size}>
                {name}
                <MetaData $size={size}>{metadata ? metadata : investorDetails}</MetaData>
            </Title>
            {status && !badgeColor && <Badge status={displayedStatus}>{displayedStatus}</Badge>}
            {status && badgeColor && <SyndicationBadge color={badgeColor}>{status}</SyndicationBadge>}
        </TitleContainer>
    );
};

FundTitle.propTypes = {
    /** Number of fund */
    name: PropTypes.string.isRequired,
    /** Fund status */
    status: PropTypes.string,
    /** Number invited */
    invited: PropTypes.number,
    /** Date invited */
    created: PropTypes.string,
    /** show as a big title */
    big: PropTypes.bool,
    /** show as a small title */
    small: PropTypes.bool,
    /** name of the subscription to show */
    subscriptionName: PropTypes.string,
    /**date the investor joined the fund */
    dateJoined: PropTypes.string,
    /**date the investor was invited to the fund */
    dateInvited: PropTypes.string,
    /** The type of investor */
    investorType: PropTypes.string,
    /** Hide Investor Type*/
    hideInvestorType: PropTypes.bool,
    /** Override all other metadata types with a single string */
    metadata: PropTypes.string,
    /** Path to fund image */
    fundImage: PropTypes.string,
    /** size of component */
    size: PropTypes.string,
    /** color of badge component */
    badgeColor: PropTypes.string,
    /** Date to display Last Updated */
    lastUpdatedDate: PropTypes.string,
    /** Fund final closing date  */
    finalClosingDate: PropTypes.string,
    /** the role for the investor/fund */
    role: PropTypes.string,
};

FundTitle.defaultProps = {
    status: null,
    invited: 0,
    created: null,
    finalClosingDate: null,
    subscriptionName: null,
    hideInvestorType: false,
    dateJoined: null,
    dateInvited: null,
    size: 'big',
};

export default FundTitle;
