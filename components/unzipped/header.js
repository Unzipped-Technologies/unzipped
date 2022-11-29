import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import {
    DownIcon
} from '../icons'
import Search from './input'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const Container = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    border-bottom: solid 1px #d8d8d8;
`;

const Logo = styled.img`
    max-width: 255px;
    margin-right: 8rem;
    margin-left: 1rem;
    @media(max-width: 1534px) {
        margin-right: 4rem;
    }
    @media(max-width: 1346px) {
        margin-right: 2rem;
    }
    @media(max-width: 1208px) {
        max-width: 205px;
    }
    @media(max-width: 1208px) {
        margin-right: 0.5rem;
        max-width: 170px;
    }
    @media(max-width: 1208px) {
        margin-right: 0.5rem;
        max-width: 170px;
    }
`;

const Menu = styled.div`
    display: flex;
    flex-flow: row;
    @media(max-width: 1058px) {
        display: none
    }
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    font-family: roboto;
    color: #333;
    margin: 0px 10px;
`;

const Span = styled.span`
    margin-right: 8px;
`;

const Span2 = styled.span`
    margin-bottom: 3px;
`;
// items on right of menu
const Right = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: 2rem;
    flex-flow: row;
`;

// Login buttons
const SignIn = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;
`;

const Login = styled.div`
    margin: 0px 1.5rem;
    margin-left: 8rem;
    @media(max-width: 1390px) {
        margin-left: 2rem;
    }
`;

// Menu display
const Desktop = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
    flex-flow: row;
    @media(max-width: 650px) {
        display: none;
    }
`;

const Mobile = styled.div`
    display: flex;
    border-radius: 5px;
    @media(min-width: 650px) {
        display: none;
    }
    &:hover {
        background-color: #d8d8d8;
    }
`;

const MenuIcon = styled.div`
    color: #222;
    cursor: default;
`;

const Dropdown = styled.div`
    position: absolute;
    display: flex;
    right: 1rem;
    top: 2rem;
    flex-flow: column;
    border: 0.5px solid #999;
    background-color: #fff;
    min-width: 100px;
    border-radius: 10px;
    padding: 10px;
`;

const Span3 = styled.div`
    padding-top: 10px;
    &:last-child {
        margin-bottom: 5px;
    }
`;

const menuItems = [
    {
        item: 'Find Talent',
        sub: [
            'One',
            'Two'
        ]
    },
    {
        item: 'Find a Project'
    },
    {
        item: 'Why Unzipped'
    },
    {
        item: 'Get Ideas'
    }
]

const useStyles = makeStyles((theme) => ({
	button: {
        width: '74px',
        height: '28px',
        border: 'none',
        background: '#1976D2',
        boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.2)',
        borderRadius: '12px',
        outline: 'none',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#8EDE64',
            color: '#222',
          }
	}
}))

const Nav = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const classes = useStyles();
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <Container>
            <Logo src='/img/Unzipped-Primary-Logo.png' alt='logo'/>
            <Menu>
                {menuItems.map(item => {
                    return (
                    <Item>
                        <Span>{item.item} </Span>
                        {item?.sub?.length && <Span2><DownIcon /></Span2>}
                    </Item>
                    )
                })}
            </Menu>
            <Right>
                <Desktop>
                    <Search placeholder="search" icon="search"/>
                    <SignIn>
                        <Login>Log In</Login>
                        <Button className={classes.button}>Sign up</Button>
                    </SignIn>
                </Desktop>
                <Mobile>
                    <MenuIcon className="material-icons" onClick={() => setMenuOpen(!menuOpen)} ref={wrapperRef}>
                        menu
                    </MenuIcon>
                    {menuOpen && (
                        <Dropdown>
                            {menuItems.map(item => (
                                <Span3>{item.item}</Span3>
                            ))}
                        </Dropdown>
                    )}
                </Mobile>
            </Right>
        </Container>
    )
}

export default Nav;