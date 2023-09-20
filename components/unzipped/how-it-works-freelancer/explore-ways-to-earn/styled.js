import styled from 'styled-components';


const Wrapper = styled.div`
    display: flex; 
    justify-content: center; 
    flex-direction: column; 
    align-items: center;
`;

const ContentHeading = styled.h3`
    color: #000;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: 23px; /* 82.143% */
    letter-spacing: 0.15px;
    
    @media screen and (max-width: 600px){
        display: none;        
    }
`;
const ParagraphTextStyled = styled.span`
    color: #6A7465;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.15px;
    margin-top: 5px;
    @media screen and (max-width: 600px){
        display: none;
    }
`;

const Body = styled.div`
    display:flex;
    justify-content: center;
    width: 100%;
`;

const ImageContainer = styled.div`
    width: 393px;
    height: 189px; 
    @media screen and (width: 600px){
        margin-bottom: 21px;
        width: 365px; 
    }
    img{
        width : 100%;
        display : block;
    }
`;

const CreateProfileButtonStyled = styled.button`
    width: 133px;
    height: 29px;
    border-radius: 16px;
    background: #8EDE64;
    border: 1px solid rgba(196, 196, 196, 0.00);
    margin-top: 27px;
    @media screen and (max-width: 600px){  
        width: 139px;
    }
`;

const CreateButtonTextStyled = styled.span`
    color: #FFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 23px; /* 191.667% */
    letter-spacing: 0.15px;
    margin-left : 0;
    @media screen and (max-width: 600px){ 
        font-size: 14px;
     }
`;

const ServiceWrapper = styled.div`
    width: 841px; 
    margin-top: 69px; 
    @media screen and (max-width: 600px){
        width:  370px;
        margin-top: 0px; 
    }
`
const CommitmentWrapper = styled.div`
    width: 841px;
    @media screen and (max-width: 600px){
        width:  370px;
    }
`;

const CommitmentContainer = styled.div`
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 600px){
        flex-direction: column;
    }
`;

const CommitmentContent = styled.div`
    width: 326px;
`;

const ServiceContainer = styled.div`
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 600px){
        flex-direction: column;
    }
`
const ServiceContent = styled.div`width: 326px`;

export {
    Wrapper,
    ContentHeading,
    ParagraphTextStyled,
    Body,
    ImageContainer,
    CreateProfileButtonStyled,
    CreateButtonTextStyled,
    ServiceWrapper,
    CommitmentWrapper,
    CommitmentContainer,
    ServiceContainer,
    ServiceContent,
    CommitmentContent
}