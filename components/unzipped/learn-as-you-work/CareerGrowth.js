import {
    Heading,
    ImageContainer,
    TitleTextStyled,
    LearnButtonStyled,
    ContentTitleStyled,
    CardWrapper,
    CartContainer,
    ItemContainer,
    CardItem
} from './styled';
const cardArray = [
    {
        title: 'Getting Started',
        imageSource: '/img/GettingStarted.png',
        bgColor: '#BCA1E6'
    },
    {
        title: 'Growing your career',
        imageSource: '/img/GrowingYourCareer.png',
        bgColor: '#debe1b'
    },
    {
        title: 'Finding Support',
        imageSource: '/img/FindingSupport.png',
        bgColor: '#c7d7cc'
    },

];
const CareerGrowth = () => {
    return (
        <>
            <CardWrapper>
                <CartContainer>
                    <ContentTitleStyled>Learn As You Workxx</ContentTitleStyled>
                    <ItemContainer>
                        {cardArray.map((item) => (
                            <CardItem>
                                <ImageContainer style={{ background: item.bgColor }}><img src={item.imageSource} /></ImageContainer>
                                <TitleTextStyled>{item.title}</TitleTextStyled>
                                <LearnButtonStyled> Learn More </LearnButtonStyled>
                            </CardItem>
                        ))}
                    </ItemContainer>
                </CartContainer>

            </CardWrapper>
        </>
    )
}

export default CareerGrowth;

