import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import {
    DownIcon,
    LightIcon,
    FolderIcon,
    BookmarkIcon,
    WorkIcon
} from '../icons'
import Search from './input'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { logoutUser, resetBusinessForm } from '../../redux/actions';
import Icon from '../ui/Icon'
import { Absolute } from './dashboard/style'
import Image from '../ui/Image'
import Dropdowns from '../ui/Dropdowns'
import { Button as Buttons } from '../ui'
import router, { useRouter } from 'next/router';
import IconComponent from '../ui/icons/IconComponent';

const Div = styled.div`
    width: 100%;
    margin-bottom:  ${({ marginBottom }) => marginBottom ? marginBottom : '128px'};;
`;

const Container = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    background: #fff;
    line-height: 19px;
    min-height: 77px;
    border-bottom: solid 1px #d8d8d8;
    width: 100%;
`;

const Logo = styled.img`
    max-width: 215px;
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
    cursor: pointer;
`;

const Span2 = styled.span`
    margin-bottom: 3px;
    cursor: pointer;
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
    cursor: pointer;
    @media(max-width: 1390px) {
        margin-left: 2rem;
    }
    &:hover {
        color: #8EDE64;
    }
`;

// Menu display
const Desktop = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
    flex-flow: row;
    @media(max-width: 680px) {
        display: none;
    }
`;

const Mobile = styled.div`
    display: flex;
    border-radius: 5px;
    @media(min-width: 680px) {
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

// sub menu styling

const SubMenu = styled.div`
    position: fixed;
    top: -1px;
    z-index: 1;
    display: flex;
    align-items: center;
    width: 100%;
    height: 49px;
    margin-top: 78px;

    background: #0E1724;
    color: #fff;
    padding: 0px 15%;
    @media(max-width: 680px) {
        display:none;
    }
`;

const SpanWhite = styled.div`
    display: flex;
    font-weight: 400;
    cursor: pointer;
    font-size: 14px;
    line-height: 23px;
    height: 100%;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    min-width: 75px;
    border-bottom: ${({ underline }) => underline ? 'solid 4px #fff' : 'none'};
    @media(max-width: 449px) {
        display: ${({ count }) => count > 3 ? 'none' : 'flex'};
    }
    @media(max-width: 449px) {
        margin-right: 0px;
    }
`;

const Sub = styled.div`
    max-height: 24px;
`;

const ButtonHolder = styled.div`
    display: flex;
    flex-flow: row;
    margin-left: 15px;
    & div:first-of-type {
        margin: 0px 15px;
    }
    & div:last-of-type {
        cursor: pointer;
    }
`;

const menuItems = [
    {
        name: 'Find Talent',
        sub: [

            {
                name: 'Search Freelancers',
                icon: <WorkIcon width={35} height={35} />,
                link: '/freelancers'
            },
            {
                name: 'Browse By Skill',
                icon: <FolderIcon width={35} height={35} />,
                link: '/freelancers'
            }
        ],
        link: '/',
        icon: <WorkIcon width={35} height={35} />
    },
    {
        name: 'Find a Project',
        sub: [
            {
                name: 'Browse Projects',
                link: '/',
                icon: <FolderIcon width={35} height={35} />
            },
            {
                name: 'Search By Founders',
                link: '/',
                icon: <WorkIcon width={35} height={35} />
            },
            {
                name: 'Get Ideas',
                link: '/',
                icon: <LightIcon width={35} height={35} />
            },


        ],
        link: '/',
        icon: <FolderIcon width={35} height={35} />
    },
    {
        name: 'Why Unzipped',
        link: '/',
        icon: <BookmarkIcon width={35} height={35} />,
        sub: [
            {
                name: 'How to hire',
                description: 'Learn about the different ways to get work done.',
                link: '/how-it-works/client'
            },
            {
                name: 'How to find work',
                description: 'Learn about how to grow your independent career.',
                link: '/how-it-works/freelancer'
            },
            {
                name: 'Where work gets done',
                resourcelinks: 'See Resources',
                resourceUrl: '/wiki/getting-started-as-a-freelancer',
                sub: [
                    {
                        title: 'Guides',
                        description: 'Getting Started as a Freelancer',
                        link: '/wiki/getting-started'
                    },
                    {
                        title: 'Guides',
                        description: 'Growing Your Freelance Career',
                        link: '/wiki/grow-your-career'
                    },
                    {
                        title: 'Guides',
                        description: 'Hiring & Working with Independent Talent',
                        link: '/wiki/working-with-independent-contractors'
                    }
                ]
            }
        ]
    },
    {
        name: 'Get Ideas',
        link: '/',
        icon: <LightIcon width={35} height={35} />
    }
]

const subMenuItems = [
    {
        name: 'Dashboard',
        link: '/dashboard'
    },
    {
        name: 'Lists',
        link: '/dashboard/lists'
    },
    {
        name: 'Tasklist',
        link: '/dashboard/tasklist'
    },
    {
        name: 'My Projects',
        link: '/dashboard/projects'
    },
    {
        name: 'Inbox',
        link: '/dashboard/inbox'
    },
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

const Nav = ({ isSubMenu, isAuthenticated, profilePic, token, logoutUser, resetBusinessForm, marginBottom }) => {
    const { pathname } = useRouter();
    const [menuOpen, setMenuOpen] = useState(false)
    const classes = useStyles();
    const wrapperRef = useRef(null);
    const dropdownRef = useRef(null);
    const [highlightColor, setHighlightColor] = useState('#333333');
    const [highlightedIndex, setHighlightedIndex] = useState(false);


    const setDropdowns = (item) => {
        setTimeout(function () {
            setMenuOpen(item)
        }, 500);
    }

    const signOut = () => {
        logoutUser()
        router.push('/')
    }

    const profileItems = [
        {
            name: 'Dashboard',
            link: '/dashboard',
            icon: <FolderIcon width={35} height={35} />
        },
        {
            name: 'Membership',
            link: '/',
            icon: <FolderIcon width={35} height={35} />
        },
        {
            name: 'Hire a freelancer',
            link: '/',
            icon: <WorkIcon width={35} height={35} />
        },
        {
            name: 'Work with us',
            link: '/',
            icon: <Icon name="contacts" width={27} height={27} style={{ marginLeft: '8px' }} />
        },
        {
            name: 'Get Ideas',
            link: '/',
            icon: <LightIcon width={35} height={35} />
        },
        { name: "<hr />", link: '/' },
        {
            name: 'Sign out',
            onClick: () => signOut(),
            link: '',
            icon: <LightIcon width={35} height={35} />
        },
        {
            name: 'Help',
            link: '/',
            icon: <LightIcon width={35} height={35} />
        },
    ]

    const setCloseDropdowns = (time) => {
        setTimeout(function () {
            setMenuOpen(false)
        }, (time || 500));
    }

    const startAProject = async () => {
        await resetBusinessForm()
        router.push('/create-your-business')
    }

    const getButtons = () => {
        if (isAuthenticated) {
            return (
                <ButtonHolder>
                    <Buttons noBorder oval type={'green'} fontSize="14px" onClick={() => startAProject()}>Start A Project</Buttons>
                    <Image src={profilePic} alt="profile pic" radius="50%" width="48px" onClick={() => setDropdowns('profile')} onMouseEnter={() => setDropdowns('profile')} />
                    {menuOpen === 'profile' && <Dropdowns items={profileItems} onClose={() => setCloseDropdowns(0)} token={token} />}
                </ButtonHolder>
            )
        } else {
            return (
                <SignIn>
                    <Link href="/login"><Login>Log In</Login></Link>
                    <Button className={classes.button} onClick={() => router.push('/register')}>Sign up</Button>
                </SignIn>
            )
        }
    }

    return (
        <Div marginBottom={marginBottom && marginBottom}>
            <Container style={{ position: 'fixed', top: "0", zIndex: "2" }}>
                <Link href="/" ><Logo src='/img/Unzipped-Primary-Logo.png' alt='logo' /></Link>
                <Menu>
                    {menuItems && menuItems.map((item, index) => {
                        const isHighlightIndex = index === highlightedIndex;

                        return (
                            <Item onMouseEnter={() => {
                                setHighlightColor(true)
                                setDropdowns(item.name)
                                setHighlightColor('#8EDE64');
                                setHighlightedIndex(index);
                            }}
                                onClick={() => setDropdowns(item.name)}
                                key={index}
                                style={{ color: isHighlightIndex ? highlightColor : '#333333', }}
                                onMouseLeave={() => setHighlightColor('#333333')}

                            >
                                <Span>{item.name} </Span>
                                {item?.sub?.length && <Span2><DownIcon /></Span2>}
                                {menuOpen === item.name && item?.sub && (
                                    <Dropdowns
                                        items={item?.sub}
                                        onClose={() => setCloseDropdowns(0)}
                                        token={token}
                                        style={{ color: '#333333', position: 'absolute' }}
                                        top={0}
                                        isUnzipped={item.name === 'Why Unzipped' ? true : false}
                                    />
                                )}
                            </Item>
                        )
                    })}
                </Menu>
                <Right>
                    <Desktop>
                        <Search placeholder="Search" icon="search" />
                        {getButtons(token)}
                    </Desktop>
                    <Mobile>
                        <MenuIcon onClick={() => setMenuOpen(!menuOpen ? 'mobile' : false)} ref={wrapperRef}>
                            <IconComponent name="navbarToggleIcon" width="39" height="39" viewBox="0 0 39 39" fill="#333333" />
                        </MenuIcon>
                        {menuOpen === 'mobile' && (
                            <Absolute right="228px" top="0px"><Dropdowns items={menuItems} onClose={() => setCloseDropdowns(0)} token={token} /></Absolute>
                        )}
                    </Mobile>
                </Right>
            </Container>
            {isSubMenu && (
                <SubMenu>
                    {subMenuItems.map((item, key) => (
                        <Link href={item.link} key={key}><SpanWhite count={key} underline={pathname === item.link}><Sub>{item.name} </Sub></SpanWhite></Link>
                    ))}
                </SubMenu>
            )}
        </Div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
        token: state.Auth.token,
        loading: state.Auth.loading,
        profilePic: state.Auth?.user?.profileImage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: bindActionCreators(logoutUser, dispatch),
        resetBusinessForm: bindActionCreators(resetBusinessForm, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);