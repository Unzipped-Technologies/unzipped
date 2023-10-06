import styled from 'styled-components';
import HireDivider from './hire-divider/hireDivider';
import { COLORS, getFontStyled, FONT_SIZE, LETTER_SPACING } from '../../ui/TextMaskInput/core/utilities';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useRouter } from 'next/router';

const HireWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const HireInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 590px;
    border-radius: 7px;
    border: 1px solid ${COLORS.black};
    background: ${COLORS.white};
    padding-left: 50px;
    padding-bottom: 12px;
    margin-top: 50px;
`;

const HeadingText = styled.h1`
    text-transform: uppercase;
    margin-bottom: 0;
    ${getFontStyled(
    {
        color: COLORS.black,
        fontSize: FONT_SIZE.PX_20,
        fontWeight: 500,
        fontStyle: 'normal',
        lineHeight: FONT_SIZE.PX_24,
        letterSpacing: LETTER_SPACING,
    })}
`;

const Text = styled.span`
    margin: 0;
    ${getFontStyled(
    {
        color: COLORS.black,
        fontSize: FONT_SIZE.PX_16,
        fontWeight: 300,
        fontStyle: 'normal',
        lineHeight: FONT_SIZE.PX_19,
        letterSpacing: LETTER_SPACING,
    })}
`;

const Label = styled.span`
    text-transform: uppercase;
    display: block;
    ${getFontStyled(
    {
        color: COLORS.black,
        fontSize: FONT_SIZE.PX_12,
        fontWeight: 500,
        fontStyle: 'normal',
        lineHeight: FONT_SIZE.PX_24,
        letterSpacing: LETTER_SPACING,
    })};
    margin-top: 12px;
    margin-bottom: 6px;
`;

const InputField = styled.input`
    height: 30px !important;
    width: 470px !important;
    margin:0 ;
    border: 1px solid #000 !important;
    background: rgba(217, 217, 217, 0.15) !important;
`;
const TextareaField = styled.textarea`
    height: 121px !important;
    width: 470px !important;
    margin:0 ;
    border: 1px solid #000 !important;
    background: rgba(217, 217, 217, 0.15) !important;
`;

const HireButton = styled.button`
    background: ${COLORS.hireButton};
    width: 122px;
    height: 36px;
    border-radius: 5px;
    text-transform: uppercase;
    border: none;
`;

const InputHourlyField = styled.input`
    font-size: 12px !important;
    margin-left: 2rem;
    height: 30px !important;
    width: 21px !important;
    margin:0 ;
    border: none !important;
    background: rgba(217, 217, 217, 0.15) !important;
`;

const TrackingField = styled.input`
    padding-left: 2rem !important;
    font-size: 12px !important;
    margin-left: 2rem;
    margin-top: 5px !important;
    height: 30px !important;
    width: 21px !important;
    margin:0 ;
    border: none !important;
    background: rgba(217, 217, 217, 0.15) !important;
`;

const Span = styled.span`
text-transform: uppercase;
display: inline-block;
margin-right: 20px;
margin-left: 20px;
${getFontStyled(
    {
        color: COLORS.black,
        fontSize: FONT_SIZE.PX_12,
        fontWeight: 500,
        fontStyle: 'normal',
        lineHeight: FONT_SIZE.PX_24,
        letterSpacing: LETTER_SPACING,
    })}
`
const ButtonText = styled.span`
    text-transform: uppercase;
    display: inline-block;
    margin-right: 20px;
    margin-left: 20px;
    ${getFontStyled(
    {
        color: COLORS.white,
        fontSize: FONT_SIZE.PX_12,
        fontWeight: 500,
        fontStyle: 'normal',
        lineHeight: FONT_SIZE.PX_24,
        letterSpacing: LETTER_SPACING,
    })}
`;
const HireComp = () => {
    const [select, setSelect] = useState('Client');
    const [selectCurrency, setSelectCurrency] = useState('USD');
    const router = useRouter();

    return (
        <HireWrapper>
            <HireDivider />
            <HireInputContainer>
                <div>
                    <HeadingText>
                        Contact User About Your Job
                    </HeadingText>
                    <Text>Your subscription will be paid using your primary payment method.</Text>
                    <Label>Project Name</Label>
                    <Select
                        value={select}
                        onChange={(e) => setSelect(e.target.value)}
                        style={{ width: '470px', border: '1px solid black' }}
                    >
                        <MenuItem value="Unzipped">Unzipped</MenuItem>
                        <MenuItem value="Why">Find Talent</MenuItem>
                        <MenuItem value="Client">Client</MenuItem>
                        <MenuItem value="Freelancer">Freelancer</MenuItem>
                    </Select>
                    <Label>Send a private message</Label>
                    <TextareaField rows={50} cols={100} />
                    <Label>job type</Label>
                    <InputField type='text' />
                    <Label>hourly rate (show budget if selected)</Label>
                    <div style={{ display: 'flex', width: 470, gap: 20 }}>
                        <div style={{ border: '1px solid black' }}>
                            <Span>$</Span>
                            <InputHourlyField value={50} />
                            <Span>per hours</Span>
                        </div>
                        <div>
                            <Select
                                value={selectCurrency}
                                onChange={(e) => setSelectCurrency(e.target.value)}
                                style={{
                                    width: '77px',
                                    border: '1px solid black',
                                    paddingLeft: 5,
                                    paddingRight: 5,
                                    paddingTop: 6,
                                    fontSize: '12px !important'
                                }}
                            >
                                <MenuItem value="USD">USD</MenuItem>
                                <MenuItem value="EUR">EUR</MenuItem>
                                <MenuItem value="GBP">GBP</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <Label>weekly tracking limit</Label>

                    <div style={{ display: 'flex', width: 353, border: '1px solid black', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <TrackingField value={50} />
                        </div>
                        <div>
                            <Span>hours / week</Span>
                        </div>

                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'end', paddingRight: '4rem', marginTop: 35 }}>
                    <HireButton ><ButtonText onClick={() => router.push('/subscribe')} >Hire (user)</ButtonText></HireButton>
                </div>
            </HireInputContainer>
        </HireWrapper>
    )
}

export default HireComp;