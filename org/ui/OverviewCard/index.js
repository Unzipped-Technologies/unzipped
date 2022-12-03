import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Card, HelpIcon} from 'components/ui';

const Title = styled.div`
    color: ${props => props.theme.textSecondary};
    text-transform: uppercase;
    font-weight: 600;
    font-size: ${props => props.theme.baseFontSize};
    margin-right: 10px;
    line-height: 1.125rem;
    @media (max-width: ${props => props.theme.reducedWidth}px) {
        font-size: ${props => props.theme.fontSizeS};
    }
    @media (max-width: ${props => props.theme.phoneWidth}px) {
        font-size: ${props => props.theme.fontSizeXS};
    }
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0 0 20px 0;
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    flex-wrap: ${props => (props.flexWrapped ? 'wrap' : 'nowrap')};
`;

const Link = styled.a`
    display: inline-flex;
    align-items: center;
    max-height: 16px;
    font-family: arial;
    font-size: ${props => props.theme.fontSizeXXS};
    font-weight: 700;
    font-style: normal;
    color: ${props => props.theme.secondary};
    cursor: pointer;
    &:link {
        color: ${props => props.theme.secondary};
        text-decoration: none;
    }
    &:visited {
        color: ${props => props.theme.secondary};
        text-decoration: none;
    }
    &:hover {
        color: ${props => props.theme.secondary};
        text-decoration: none;
    }
    &:active {
        color: ${props => props.theme.secondary};
        text-decoration: none;
    }
`;

/**
 * OverviewCard Component.
 */
const OverviewCard = ({title, children, help, action, className, link, linkText, flexWrapped = false}) => (
    <Card inline action={action} className={className}>
        <Header>
            <Title>{title}</Title>
            {help && <HelpIcon text={help} testId={title} />}
            {link && (
                <Link href={link} bold={false}>
                    {linkText}
                </Link>
            )}
        </Header>
        <Content flexWrapped={flexWrapped}>{children}</Content>
    </Card>
);

OverviewCard.propTypes = {
    /** Children the component contains */
    children: PropTypes.node,
    /** Fund Card Title */
    title: PropTypes.string,
    /** Help tool tip text */
    help: PropTypes.string,
    /** Whether to show card inline or full width */
    inline: PropTypes.bool,
    /** action component to show in the action area (top right) */
    action: PropTypes.node,
    /** Additional classNames, supports styled-components  */
    className: PropTypes.string,
    /** Link URL */
    link: PropTypes.string,
    /** Link text */
    linkText: PropTypes.string,
    /** wrap content */
    flexWrapped: PropTypes.bool,
};

OverviewCard.defaultProps = {
    children: null,
    title: null,
    help: null,
    padding: true,
    inline: false,
    action: null,
    link: '',
    linkText: '',
    className: '',
};

export default OverviewCard;
