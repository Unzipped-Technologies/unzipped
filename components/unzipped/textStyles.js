import styled from 'styled-components'

export const Title = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 800;
    font-size: 52px;
    line-height: 56px;
    letter-spacing: 0.39998px;
    min-width: 80%;
    color: #fff;
    padding: 20px;
    margin-bottom: 10px;
    @media (max-width: 1435px) {
        min-width: 90%;
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