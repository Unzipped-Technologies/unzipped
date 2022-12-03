import React from 'react';
import {Col, Modal, Row} from 'react-bootstrap';
import withAccessToken from 'components/withAccessToken';
import {ConverterUtils, FundUtils, UserUtils} from 'utils';
import letterImage from 'images/letter.svg';
import smartPhone from 'images/smartphone.svg';

const {Body, Header, Title} = Modal;

/**
 *
 * @param {{
 * lpProfileData: {{}},
 * onHide: {() => void},
 * show: boolean,
 * }} props
 */

const NameProfileModal = ({addAccessTokenToUrl, lpProfileData, onHide, show}) => {
    const {accountType, email, cellNumber, profilePic} = lpProfileData;
    const fullName = ConverterUtils.getFullName(lpProfileData);
    const customName = FundUtils._getCustomName(lpProfileData);
    const accountTypeName = UserUtils.getAccountTypeName(accountType);
    const profilePicUrl = profilePic ? addAccessTokenToUrl(profilePic.url) : null;

    return (
        <Modal
            id="lPNameProfileModal"
            backdrop="static"
            show={show}
            onHide={onHide}
            dialogClassName="GPDelModalDialog fundModalDialog">
            <Header closeButton />
            <Title />
            {lpProfileData && (
                <Body>
                    {!!profilePic && <img src={profilePicUrl} alt="img" className="profilePicLarge" />}
                    {!profilePic && (
                        <div className="custom-name-table inline-block profilePicLarge defaultProfilePicModal">
                            {customName}
                        </div>
                    )}
                    <div className="profileNameModal ellipsis" title={fullName}>
                        {fullName}
                    </div>
                    <div className="profileNameDelegate">{accountTypeName}</div>
                    <Row className="marginLpUserMail">
                        <Col lg={2} md={2} sm={2} xs={2}>
                            <img alt="letter" src={letterImage} className="marginRight15" />
                        </Col>
                        <Col lg={10} md={10} sm={10} xs={10} className="paddingLpUserMailId">
                            <span className="LPUserMailId">{email}</span>
                        </Col>
                    </Row>
                    {cellNumber && (
                        <div className="marginLeft20">
                            <img alt="cell number" src={smartPhone} className="marginLeft5 marginRight22" />
                            <span className="LPUserMailId">{cellNumber}</span>
                        </div>
                    )}
                </Body>
            )}
        </Modal>
    );
};

export default withAccessToken(NameProfileModal);
