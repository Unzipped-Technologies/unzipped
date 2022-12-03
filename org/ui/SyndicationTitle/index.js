import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SyndicationBadge from 'components/ui/SyndicationBadge';
import fundIcon from '../icons/fund.svg';

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
    display: flex;
    flex-direction: row;
    align-items: center;
    font-family: arial;
    flex-wrap: nowrap;
`;

const Title = styled.div`
    font-weight: 600;
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

const SyndicationIcon = styled.img`
    height: ${props => sizes[props.$size].fundIconHeight}px;

    @media (max-width: ${props => props.theme.tabletWidth}px) {
        padding: 0 20px;
    }
`;

const Image = styled.img`
    max-width: ${props => sizes[props.$size].fundImageWidth}px;
    max-height: ${props => sizes[props.$size].fundImageHeight}px;
`;

const Badge = styled(SyndicationBadge)`
    margin-left: 22px;
`;

/**
 * Syndication Title Component.
 */
const SyndicationTitle = ({
    name,
    status = null,
    badgeColor = null,
    size = 'big',
    image = null,
    metadata = null,
    className,
}) => {
    return (
        <TitleContainer className={className}>
            <Icon $size={size}>
                {image ? (
                    <Image $size={size} src={image} alt="Syndication Image" />
                ) : (
                    <SyndicationIcon $size={size} src={fundIcon} alt="Syndication Icon" />
                )}
            </Icon>
            <Title $size={size}>
                {name}
                {!!metadata && <MetaData $size={size}>{metadata}</MetaData>}
            </Title>
            {status && (
                <Badge status={badgeColor ? null : status} color={badgeColor}>
                    {status}
                </Badge>
            )}
        </TitleContainer>
    );
};

SyndicationTitle.propTypes = {
    /** Number of fund */
    name: PropTypes.string.isRequired,
    /** Fund status */
    status: PropTypes.string,
    /** Override all other metadata types with a single string */
    metadata: PropTypes.string,
    /** Path to syndication image */
    image: PropTypes.string,
    /** size of component */
    size: PropTypes.oneOf(Object.keys(sizes)),
    /** color of badge component */
    badgeColor: PropTypes.string,
};

export default SyndicationTitle;
