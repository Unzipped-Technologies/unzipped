import React, {useState} from 'react'
import styled from 'styled-components'
import Card from './Card'
import {
    StarIcon,
    DownSolidIcon,
    ThumbsDownIcon,
    ThumbsUpIcon,
    DownWideIcon
} from '../icons'
import Buttons from '../ui/Buttons'
import Button from '../ui/Button';
import { makeStyles } from '@material-ui/core/styles';

const Container = styled.div`
    display: grid;
    position: relative;
    grid-template-columns: 1fr 2fr;
    @media(max-width: 857px) {
        display: none;
    }
`;

const Left = styled.div`
    margin: 20px 40px;
`;

const Box = styled.div`
    width: 90%;
`;

const Right = styled.div`
    margin: 20px 40px;
`;
const Div = styled.div`
    width: 406px;
    height: 147px;
`;

const Row = styled.span`
    display: flex;
    flex-flow: row;
    padding: 15px 20px;
`;

const Span = styled.span`
    font-weight: 500;
    font-size: 18px;
    line-height: 19px;


    letter-spacing: 0.39998px;
    text-transform: uppercase;
    padding-left: 10px;
`;

const CenterIcon = styled.div`
    width: 90%;
    display: flex;
    justify-content: center;
`;

const Text = styled.div`
    font-weight: 500;
    font-size: 18px;
    line-height: 19px;

    letter-spacing: 0.39998px;
    text-transform: uppercase;

    color: #333333;
    margin: 20px 0px 30px 0px;
`;

const Title = styled.div`
    font-weight: 400;
    font-size: ${({long, superLong}) => long ? superLong ? '20px' : '25px' : '28px'};
    line-height: 19px;

    letter-spacing: 0.39998px;
    text-transform: uppercase;

    color: #333333;
    padding: 20px;
`;

const Tile = styled.div`
    font-weight: 400;
    font-size: ${({long, superLong}) => long ? superLong ? '20px' : '25px' : '28px'};
    line-height: 19px;

    letter-spacing: 0.39998px;
    text-transform: uppercase;

    color: #333333;
    margin-bottom: 10px;
`;

const Absolute = styled.div`
    position: absolute !important;
    right: 25px;
    bottom: 25px;
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.39998px;
    text-transform: uppercase;
    color: #0057FF;
`;

const PaddingLeft = styled.div`
    padding-left: 6px;
    display: flex;
    aligh-items: center;
`;

// right cards

const Flex = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: left;
`;

const ImageContainer = styled.div`
    overflow: hidden;
    width: 149px;
    height: 136px;
    margin: 15px 20px;
    margin-right: auto;
    border-radius: 15px;
`;

const Image = styled.img`
    width: auto;
    height: 100%;
`;

const Center = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: left;
    margin: 10px 10px;
    padding: 0px 20px;
    color: #333;
`;

const P2 = styled.div`
    display: grid;
    grid-template-columns: 2fr 3fr 2fr 3fr;
    grid-template-rows: 1fr 1fr;
    width: 80%;
`;

const P = styled.span`
    font-weight: 400;
    font-size: 12px;
    line-height: 19px;
    letter-spacing: 0.39998px;
    text-transform: uppercase;
    margin: 10px 0px;
`;

const Q = styled.span`
    font-weight: 600;
    font-size: 12px;
    line-height: 19px;
    letter-spacing: 0.39998px;
    text-transform: uppercase;
`;

const A = styled.span`
    font-weight: 300;
    font-size: 12px;
    line-height: 19px;
    letter-spacing: 0.39998px;
    text-transform: uppercase;
    color: #000000;
`;

// like area styling

const Like = styled.div`
    width: 149px;
    display: flex;
    flex-flow: column;
    align-items: right;
`;

const ButtonContainer = styled.span`
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    width: 149px;
    margin-top: 20px;
`;

const IconContainer = styled.span`
    display: flex;
    width: 70%
    padding-right: 5px;
    justify-content: center;
`;

const LikeText = styled.span`
    text-align: center;
    font-weight: 600;
    font-size: 13px;
    width: 149px;
    line-height: 50px;
    letter-spacing: 0.39998px;

    color: #000000;
`;

const useStyles = makeStyles((theme) => ({
	button: {
        border: 'none',
        background: 'transparent',
        padding: '10px 20px',
        outline: 'none',
	},
}))

const items = [
    {
        content: 'DEVELOPMENT & IT',
        star: 4.85
    },
    {
        content: 'DESIGN & CREATIVE',
        star: 4.91
    },
    {
        content: 'SALES & MARKETING',
        star: 4.77
    },
    {
        content: 'WRITING & TRANSLATION',
        star: 4.92
    },
    {
        content: 'LEGAL',
        star: 4.85
    },
    {
        content: 'DEVELOPMENT & IT',
        star: 4.85
    },
    {
        content: 'DESIGN & CREATIVE',
        star: 4.91
    },
    {
        content: 'SALES & MARKETING',
        star: 4.77
    },
    {
        content: 'WRITING & TRANSLATION',
        star: 4.92
    },
    {
        content: 'LEGAL',
        star: 4.85
    },
]

const HeroUnzipped = ({projects}) => {
    const [low, setLow] = useState(0);
    const [categories, setCategories] = useState(items.slice(0, 5));
    const classes = useStyles();

    const updateLow = () => {
        let newLow = low
        if (low < items.length) {
            newLow = low + 1
            setLow(newLow)
        } else {
            newLow = 1
            setLow(newLow)
        }
        const getExtra = items.length - newLow
        if (getExtra <= 5 && getExtra >= 0) {
            setCategories([...items.slice(newLow, newLow + 5), ...items.slice(0, 5 - getExtra)])
        } else {
            setCategories(items.slice(newLow, newLow + 5))
        }
    }
    return (
        <Container>
            <Left>
                <Text>Browse Talent By Category</Text>
                <Box>
                    {categories.map((item, index) => {
                        return (
                            <Card borderRadius={15} key={index}>
                                <Div>
                                    <Title long={item.content.length > 17} superLong={item.content.length > 21}>{item.content}</Title>
                                    <Row><StarIcon color={'#8EDE64'}/><Span>{item.star}/5</Span></Row>
                                </Div>
                                <Absolute>LEARN MORE<PaddingLeft><DownSolidIcon/></PaddingLeft></Absolute>
                            </Card>
                        )

                    })}
                </Box>
                <CenterIcon><Button className={classes.button} onClick={updateLow}><DownWideIcon /></Button></CenterIcon>
            </Left>
            <Right>
                <Text>AMAZING PROJECTS</Text>
                {projects.map(item => (
                    <Card key={item}>
                        <Flex>
                            <ImageContainer>
                                <Image src={item.businessImage} />
                            </ImageContainer>
                        </Flex>
                        <Center>
                            <Tile>{item.name}</Tile>
                            <P>{item.description}</P>
                            <P2>
                                <Q>LAST UPDATED </Q> <A> {item.updatedAt}</A>
                                <Q>EQUITY SPEND </Q> <A> {item.equity}%</A>
                                <Q>BUDGET </Q> <A> {item.budget}</A>
                                <Q>TIME INVESTED </Q> <A> {item.totalTimeInvested < 1000 ? item.totalTimeInvested : 'OVER 1000 HOURS'}</A>
                            </P2>
                        </Center>
                        <Like>
                            <ButtonContainer>
                            <IconContainer><ThumbsUpIcon /></IconContainer>
                            <IconContainer><ThumbsDownIcon /></IconContainer>    
                            </ButtonContainer>
                            <LikeText>{item.likeTotal.toLocaleString()} Likes</LikeText>
                            <Buttons>
                                <Button noBorder onClick={() => {}}>LEARN MORE</Button>
                            </Buttons>
                        </Like>
                    </Card>
                ))}
            </Right>
        </Container>
    )
}

export default HeroUnzipped;