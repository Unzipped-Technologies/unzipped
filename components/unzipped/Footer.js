import React from 'react'
import styled from 'styled-components'
import Text from '../ui/Text'
import Icon from '../ui/Icon'
import theme from '../ui/theme'
import Link from 'next/link'

const Container = styled.div`
    background: #001E00;
    width: 100%;
    padding: 30px;
`;

const Socials = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: space-around;
    align-items: center;
    width: 315px;
`;

const Underline = styled.div`
    border-bottom: solid 1px ${theme.text};
    margin: 20px 0px;
`;

const Links = styled.div`
    display: flex;
    flex-flow: row;
`;

const DIV = styled.div`
    cursor: pointer;
`;

const ValueList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-left: 20%;
`;

const Footer = () => {
    return (
        <Container>
            <Socials>
                <Text color={theme.text}>FOLLOW US</Text>
                <Link href="https://www.facebook.com/Alien4Hire/" target="_blank" rel="noopener noreferrer"><DIV><Icon name="Facebook" /></DIV></Link>
                <Link href="https://twitter.com/jason_unzipped" target="_blank" rel="noopener noreferrer"><DIV><Icon name="Twitter" /></DIV></Link>
                <Link href="https://www.tiktok.com/@jason_unzipped" target="_blank" rel="noopener noreferrer"><DIV><Icon name="Tiktok" /></DIV></Link>
            </Socials>
            <Underline />
            <Links>
                <Text color={theme.text}> <Icon name="copywrite"/> 2022 UNZIPPED</Text>
                <ValueList>
                    <Link href="/"><Text color={theme.text}>FIND WORK</Text></Link>
                    <Link href="/"><Text color={theme.text}>FIND TALENT</Text></Link>
                    <Link href="/"><Text color={theme.text}>HELP AND SUPPORT</Text></Link>
                    <Link href="/"><Text color={theme.text}>CAREERS</Text></Link>
                    <Link href="/"><Text color={theme.text}>CONTACT US</Text></Link>
                    <Link href="/"><Text color={theme.text}>PRESS</Text></Link>
                </ValueList>
            </Links>

        </Container>
    )
}

export default Footer;