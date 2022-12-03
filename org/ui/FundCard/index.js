import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Card from 'components/ui/Card';
import FundTitle from 'components/ui/FundTitle';
import Button from 'components/ui/Button';

const Container = styled.div`
    padding: 10px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
`;

const FundButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

/**
 * Fund Card Component.
 */
const FundCard = ({name, status, invited, id, created, onNotifications, onViewFund, notifications}) => (
    <Card>
        <Container>
            <Header>
                <FundTitle name={name} status={status} invited={invited} id={id} created={created} />
                <FundButtons>
                    <Button small type="outline" onClick={onNotifications}>
                        {notifications} notification
                    </Button>
                    <Button small onClick={onViewFund}>
                        View Fund &gt;
                    </Button>
                </FundButtons>
            </Header>
        </Container>
    </Card>
);

FundCard.propTypes = {
    /** ID of fund */
    id: PropTypes.number.isRequired,
    /** Name of fund */
    name: PropTypes.string.isRequired,
    /** Fund status */
    status: PropTypes.string,
    /** Number invited */
    invited: PropTypes.number,
    /** Date created */
    created: PropTypes.string,
    /** On press of notification button */
    onNotifications: PropTypes.func,
    /** On view of fund press */
    onViewFund: PropTypes.func,
    /** Number of notifications */
    notifications: PropTypes.number,
};

FundCard.defaultProps = {
    status: '',
    invited: 0,
    created: null,
    onNotifications: () => {},
    onViewFund: () => {},
    notifications: 0,
};

export default FundCard;
