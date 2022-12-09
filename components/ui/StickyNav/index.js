import React from 'react';
import styled from 'styled-components';
import {PreviousNextHeader, StickyCard} from '../';
import PropTypes from 'prop-types';
import {UserUtils} from '../../../utils';

const StickyCardStyled = styled(StickyCard)`
    z-index: 999;
    display: flex;
    justify-content: flex-end;
    ${props =>
        props.$twoButtons &&
        `& button:first-of-type {
            margin-left: 0px;
            background: ${props.theme.tint4};
        }`}
    ${({$noPrimary}) =>
        $noPrimary &&
        `& button {
            background: unset;
        }`}
    @media (max-width: ${props => props.theme.tableMobileWidth}px) {
        justify-content: center;
        padding: 15px;
        & button {
            width: calc(50vw - 25px);
            margin: 0;
        }
        & button:first-of-type {
            margin-right: 5px;
        }
        & button:last-of-type {
            margin-left: 5px;
        }
    }

    @media (max-width: ${props => props.theme.mobileWidth}px) {
        position: fixed;
        right: 0;
        bottom: 0;
        width: 100vw;
        padding: 20px 20px;
        box-shadow: 0px -4px 12px #e2e2e2;
        background: ${props => props.theme.tint4};
    }
    @media (min-width: ${props => props.theme.mobileWidth}px) {
        position: fixed;
    }
    @media (min-width: 1400px) {
        ${({$bannerShown}) => $bannerShown && `top: 145px;`}
    }
`;

const StickyNav = ({backText, nextText, onBackClick, onNextClick, actionFrom, disabled1, disabled2, noPrimary}) => {
    return (
        <StickyCardStyled
            $twoButtons={onBackClick && onNextClick}
            $noPrimary={noPrimary}
            data-testid="StickyNav">
            <PreviousNextHeader
                backText={backText}
                nextText={nextText}
                onBackClick={onBackClick}
                onNextClick={onNextClick}
                actionFrom={actionFrom}
                backBtnDisabled={disabled1}
                nextBtnDisabled={disabled2}
                noPrimary={noPrimary}
            />
        </StickyCardStyled>
    );
};

StickyNav.propTypes = {
    /** Previous button click. */
    onBackClick: PropTypes.func,
    /** Next button click. */
    onNextClick: PropTypes.func,
    /** Text for back button */
    backText: PropTypes.string,
    /** Text for back button */
    nextText: PropTypes.string,
    /** Prop to put button 1 into disabled state */
    disabled1: PropTypes.bool,
    /** Prop to put button 2 into disabled state */
    disabled2: PropTypes.bool,
    /** Used in the data testId */
    actionFrom: PropTypes.string,
    /** Make both buttons look like secondary buttons */
    noPrimary: PropTypes.bool,
};

StickyNav.defaultProps = {
    onBackClick: null,
    onNextClick: null,
    backText: 'previous',
    nextText: 'next',
    disabled1: false,
    disabled2: false,
    actionFrom: '',
    noPrimary: false,
};

export default StickyNav;
