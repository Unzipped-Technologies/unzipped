import React from 'react';
import {
    Container,
    HeadingSection,
    ParagraphStyled
} from './business-styles';
import EditIcon from './../../../components/icons/EditIcon'


const BusinessProjectDetails = () => {
    return (
        <Container>
            <HeadingSection>
                <div>
                    <ParagraphStyled
                        fontFamily={'Roboto'}
                        fontSize={'24px'}
                        fontWeight={700}
                        lineHeight={'24px'}
                        letterSpacing={'0.5px'}
                        textAlign={'left'}
                    >
                        Project Details
                    </ParagraphStyled>
                </div>
                <div >
                    <ParagraphStyled
                        fontFamily={'Roboto'}
                        fontSize={'24px'}
                        fontWeight={500}
                        lineHeight={'24px'}
                        letterSpacing={'0.5px'}
                        textAlign={'left'}
                        color={"#255EC6"}
                    >
                        <EditIcon /> Edit
                    </ParagraphStyled>
                </div>
            </HeadingSection>
        </Container>
    )
}

export default BusinessProjectDetails;