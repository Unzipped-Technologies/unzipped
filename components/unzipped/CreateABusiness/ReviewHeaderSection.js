import React from 'react'
import { HeadingSection, ParagraphStyled } from './business-styles'
import EditIcon from './../../../components/icons/EditIcon'
import { updateBusinessForm } from '../../../redux/actions'
import { useDispatch } from 'react-redux'
const ReviewHeaderSection = ({ label, isEditIconDisplayed, step, isMobileViewActive }) => {
    const FONT_SIZE = isMobileViewActive ? '16px' : '24px';
    const dispatch = useDispatch();
    const handleEditSection = () => {
        dispatch(updateBusinessForm({ stage: step }))
    }
    return (
        <HeadingSection>
            <div>
                <ParagraphStyled
                    fontFamily={'Roboto'}
                    fontSize={FONT_SIZE}
                    fontWeight={700}
                    lineHeight={'23px'}
                    letterSpacing={'0.5px'}
                    textAlign={'left'}>
                    {label}
                </ParagraphStyled>
            </div>
            {isEditIconDisplayed && (<div>
                <ParagraphStyled
                    fontFamily={'Roboto'}
                    fontSize={FONT_SIZE}
                    fontWeight={isMobileViewActive ? 600 : 500}
                    lineHeight={'24px'}
                    letterSpacing={'0.5px'}
                    textAlign={'left'}
                    color={'#255EC6'}
                    onClick={handleEditSection}>
                    <EditIcon /> Edit
                </ParagraphStyled>
            </div>)}
        </HeadingSection>
    )
}

export default ReviewHeaderSection