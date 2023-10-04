import React, { useState, useEffect } from 'react';
import Nav from '../../components/unzipped/header';
import MobileFreelancerFooter from '../../components/unzipped/MobileFreelancerFooter';
import styled from 'styled-components';

const Account = () => {
    const MobileDisplayBox = styled.div`
        position: relative;
        @media(min-width: 680px) {
            display: none;
        }
    `;

    return (
        <React.Fragment>
            <Nav isSubMenu />
            <MobileDisplayBox>
                <MobileFreelancerFooter defaultSelected="Account"/>
            </MobileDisplayBox>
        </React.Fragment>
    )
}

export default Account