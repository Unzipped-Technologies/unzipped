import styled from 'styled-components'

export const Title = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 800;
    font-size: 52px;
    line-height: 60px;
    letter-spacing: 0.39998px;
    min-width: 80%;
    color: #fff;
    padding: 20px;
    margin-bottom: 10px;
    @media (max-width: 1435px) {
        min-width: 90%;
    }
    @media (max-width: 1145px) {
        padding: 20px 20px 0px 20px;
    }
    @media(max-width: 1100px) {
        padding: 20px 20px 0px 20px;
        font-size: 40px;
    }
    @media(max-width: 802px) {
        padding: 0px 20px 0px 20px;
    }
    @media (max-width: 600px) {
        font-size: 32px;
        line-height: 40px;
    }
    @media (max-width: 550px) {
        font-size: 30px;
        line-height: 45px;
    }
    @media (max-width: 448px) {
        padding: 60px 0px 0px 1vw;
        font-size: 28px;
        line-height: 45px;
        font-weight: bold;
    }
    @media (max-width: 280px) {
        padding: 30px 0px 20px 1vw;
        font-size: 28px;
        line-height: 34px;
    }
`;

export const Span = styled.span`
    display: flex;
    flex-flow: row;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    line-height: 45px;
    letter-spacing: 0.39998px;
    align-items: center;
    color: #FFFFFF;
`;

export const PaddingLeft = styled.span`
    padding-left: 10px;
`;