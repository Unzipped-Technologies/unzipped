import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { connect, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { bindActionCreators } from 'redux'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'

import Search from './input'
import Image from '../ui/Image'
import Dropdowns from '../ui/Dropdowns'
import { Absolute } from './dashboard/style'
import { Button as Buttons, SearchBar } from '../ui'
import IconComponent from '../ui/icons/IconComponent'
import BackArrow from '../../components/icons/backArrow'
import FullScreenDropdown from '../ui/FullScreenDropdown'
import LargeScreenDropdown from '../ui/LargeScreenDropdown'
import { freelancerExpandedOpts, logoutUser, resetBusinessForm } from '../../redux/actions'
import {
  DownIcon,
  LightIcon,
  FolderIcon,
  BookmarkIcon,
  WorkIcon,
  CircleBrushIcon,
  CircleDashboardIcon,
  CircleHeartIcon,
  CircleLightningIcon,
  CircleShipIcon,
  CircleSearchIcon,
  CircleNotesIcon
} from '../icons'

const Div = styled.div`
  width: 100%;
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : '0px')};
`

const Container = styled.div`
  position: fixed;
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
  top: 0;
  z-index: ${({ zIndex }) => (zIndex ? zIndex : '2')};
`

const Logo = styled.img`
  max-width: 215px;
  margin-right: 8rem;
  margin-left: 1rem;
  @media (max-width: 1534px) {
    margin-right: 4rem;
  }
  @media (max-width: 1346px) {
    margin-right: 2rem;
  }
  @media (max-width: 1208px) {
    max-width: 205px;
  }
  @media (max-width: 1208px) {
    margin-right: 0.5rem;
    max-width: 170px;
  }
  @media (max-width: 1208px) {
    margin-right: 0.5rem;
    max-width: 170px;
  }
`

const Menu = styled.div`
  display: flex;
  flex-flow: row;
  @media (max-width: 1058px) {
    display: none;
  }
`

const Item = styled.div`
  display: flex;
  align-items: center;
  font-family: roboto;
  color: #333;
  margin: 0px 10px;
  @media (min-width: 680px) {
    display: ${({ isMobileOnly }) => (isMobileOnly ? 'none' : 'block')};
  }
`

const Span = styled.span`
  margin-right: 8px;
  cursor: pointer;
`

const Span2 = styled.span`
  margin-bottom: 3px;
  cursor: pointer;
`
// items on right of menu
const Right = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 2rem;
  flex-flow: row;
`

// Login buttons
const SignIn = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
`

const Login = styled.div`
  margin: 0px 1.5rem;
  margin-left: 8rem;
  cursor: pointer;
  @media (max-width: 1390px) {
    margin-left: 2rem;
  }
  &:hover {
    color: #8ede64;
  }
`

// Menu display
const Desktop = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  flex-flow: row;
  @media (max-width: 680px) {
    display: none;
  }
`

const Mobile = styled.div`
  display: flex;
  border-radius: 5px;
  @media (min-width: 680px) {
    display: none;
  }
  &:hover {
    background-color: #d8d8d8;
  }
`

const MenuIcon = styled.div`
  color: #222;
  cursor: default;
`

// sub menu styling

const SubMenu = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 49px;
  padding: 0px 23px;
  @media (max-width: 680px) {
    display: none;
  }
`

const SubMenTop = styled.div`
  position: fixed;
  top: 78px;
  z-index: 1;
  padding: ${({ padding }) => (padding ? padding : '0px')};
  @media (max-width: 680px) {
    display: none;
  }
  width: 100%;
  background: #0e1724;
  color: #fff;
`
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
  border-bottom: ${({ underline }) => (underline ? 'solid 4px #fff' : 'none')};
  @media (max-width: 449px) {
    display: ${({ count }) => (count > 3 ? 'none' : 'flex')};
  }
  @media (max-width: 449px) {
    margin-right: 0px;
  }
`

const Shift = styled.div`
  margin-right: 15px;
`

const Sub = styled.div`
  max-height: 90px;
`

const ButtonHolder = styled.div`
  display: flex;
  flex-flow: row;
  margin-left: 15px;
  & div:last-of-type {
    cursor: pointer;
  }
`

const mobileMenuItems = [
  {
    name: 'Find Talent',
    subTitle: 'Hire a Pro',
    subIcon: <CircleHeartIcon />,
    subItems: [
      {
        name: 'Search freelancers',
        sub: 'Find talented people to hire',
        link: '/freelancers'
      },
      {
        name: 'Browse by Skill',
        sub: 'Narrow down your search',
        link: '/freelancers'
      },
      {
        name: 'How it Works',
        sub: 'Learn how to hire & grow your team',
        link: '/how-it-works/client'
      }
    ]
  },
  {
    name: 'Find a Projects',
    subTitle: 'Get Hired',
    subIcon: <CircleBrushIcon />,
    subItems: [
      {
        name: 'Find a Project',
        sub: 'Browse projects that match your skills',
        link: '/projects'
      },
      {
        name: 'Search by Company',
        sub: 'Narrow down your search',
        link: '/projects'
      }
    ]
  },
  {
    name: 'Why Unzipped',
    subTitle: 'Guides & More',
    subIcon: <CircleLightningIcon />,
    subItems: [
      {
        name: 'How to Hire',
        sub: 'Find talented people to hire',
        link: '/how-it-works/freelancer'
      },
      {
        name: 'How to find work',
        sub: 'Narrow down your search',
        link: '/how-it-works/freelancer'
      },
      {
        name: 'Quick start guides',
        sub: [
          {
            name: 'Freelancer',
            sub: 'How to get started as a freelancer?',
            link: '/wiki/getting-started',
            icon: <CircleNotesIcon />
          },
          {
            name: 'Business',
            sub: 'Hiring & working with independent talent',
            link: '/wiki/working-with-independent-contractors',
            icon: <CircleSearchIcon />
          },
          {
            name: 'Freelancer',
            sub: 'Growing your freelancing career',
            link: '/wiki/grow-your-career',
            icon: <CircleShipIcon />
          }
        ]
      }
    ]
  },
  {
    name: 'Enterprise',
    link: '/how-it-works/client'
  }
]

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
        link: '/projects',
        icon: <FolderIcon width={35} height={35} />
      },
      {
        name: 'Search By Founders',
        link: '/projects',
        icon: <WorkIcon width={35} height={35} />
      },
      {
        name: 'Get Ideas',
        link: '/projects',
        icon: <LightIcon width={35} height={35} />
      }
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
    link: '/projects',
    icon: <LightIcon width={35} height={35} />
  },
  { name: '<hr />', link: '/', mobileOnly: true }
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
  }
]

const useStyles = makeStyles(theme => ({
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
      color: '#222'
    }
  }
}))

const Nav = ({
  isSubMenu,
  searchValue,
  setFilter,
  filter,
  handleSearch,
  searchButton,
  isAuthenticated,
  profilePic,
  token,
  logoutUser,
  resetBusinessForm,
  marginBottom,
  margin,
  zIndex,
  isLogoHidden,
  setIsViewable = () => {},
  listName,
  setListName = () => {},
  setIsLogoHidden = () => {},
  isListViewable,
  setIsListViewable,
  onBackArrowClick,
  isViewable,
  isExpanded,
  setIsExpanded,
  role
}) => {
  const seenNames = new Set()
  const otherNames = new Set()

  const router = useRouter()
  const dispatch = useDispatch()
  const classes = useStyles()

  const wrapperRef = useRef(null)

  const [menuOpen, setMenuOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [highlightColor, setHighlightColor] = useState('#333333')
  const [highlightedIndex, setHighlightedIndex] = useState(false)

  const setDropdowns = item => {
    setTimeout(function () {
      setMenuOpen(item)
    }, 500)
  }

  const signOut = () => {
    logoutUser()
    router.push('/login')
  }

  const setCloseDropdowns = time => {
    setTimeout(function () {
      setMenuOpen(false)
    }, time || 500)
  }

  const startAProject = async () => {
    await resetBusinessForm()
    router.push('/create-your-business')
  }

  const getButtons = () => {
    if (isAuthenticated) {
      return (
        <ButtonHolder>
          {role !== 1 && (
            <Shift>
              <Buttons noBorder oval type={'green'} fontSize="14px" onClick={startAProject}>
                Start A Project
              </Buttons>
            </Shift>
          )}
          <Image
            src={profilePic}
            alt="profile pic"
            radius="50%"
            width="48px"
            height="48px"
            onClick={() => setDropdowns('profile')}
            onMouseEnter={() => setDropdowns('profile')}
          />
          {menuOpen === 'profile' && (
            // <Dropdowns items={profileItems} onClose={() => setCloseDropdowns(0)} token={token} />
            <Desktop>
              <Absolute right="0px" top="0px" width="400px">
                <LargeScreenDropdown
                  menuItems={mobileMenuItems.filter(item => {
                    // Check if the item's name has already been seen
                    if (otherNames.has(item.name)) {
                      // If so, filter this item out
                      return false
                    } else {
                      // If not, add the name to the Set and keep the item
                      otherNames.add(item.name)
                      return true
                    }
                  })}
                  startAProject={startAProject}
                  isAuth={isAuthenticated}
                  logoutUser={signOut}
                  role={role}
                  onClose={() => setMenuOpen(false)}
                />
              </Absolute>
            </Desktop>
          )}
        </ButtonHolder>
      )
    } else {
      return (
        <SignIn>
          <Link href="/login">
            <Login>Log In</Login>
          </Link>
          <Button className={classes.button} onClick={() => router.push('/register')}>
            Sign up
          </Button>
        </SignIn>
      )
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const isScrollingDown = scrollPosition > 60

      setIsHidden(isScrollingDown)
      dispatch(freelancerExpandedOpts({ isExpanded: isScrollingDown }))
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isHidden])

  useEffect(() => {
    // Function to remove existing 'Log in' or 'Sign out' item
    const removeAuthItem = () => {
      const authItemIndex = menuItems.findIndex(item => item.name === 'Log in' || item.name === 'Sign out')
      if (authItemIndex !== -1) {
        menuItems.splice(authItemIndex, 1)
      }
    }

    // Remove the existing authentication-related menu item
    removeAuthItem()

    // Add the appropriate item based on authentication status
    if (isAuthenticated) {
      menuItems.push({
        name: 'Sign out',
        onClick: () => signOut(),
        link: '/',
        icon: <LightIcon width={35} height={35} />,
        mobileOnly: true
      })
    } else {
      menuItems.push({
        name: 'Log in',
        link: '/login',
        icon: <LightIcon width={35} height={35} />,
        mobileOnly: true
      })
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (!isAuthenticated) {
      mobileMenuItems.push({
        name: 'Get Started Today',
        link: '/register'
      })
    } else {
      mobileMenuItems.unshift({
        name: 'Dashboard',
        subTitle: 'Manage Your Work',
        subIcon: <CircleDashboardIcon />,
        subItems: [
          {
            name: 'Notifications',
            sub: 'Check pending todo items',
            link: '/dashboard'
          },
          {
            name: 'Browse',
            sub: 'See potential projects and freelancers',
            link: '/browse'
          },
          {
            name: 'Messages',
            sub: 'Manage communication within the app',
            link: '/dashboard/inbox'
          },
          {
            name: 'Account',
            sub: 'Manage your account details',
            link: '/dashboard/account'
          }
        ]
      })
    }
  }, [isAuthenticated, menuItems])
  return (
    <Div marginBottom={marginBottom && marginBottom} id="navbar">
      <Container zIndex={zIndex}>
        {!isLogoHidden && !isListViewable && (
          <Link href="/">
            <Logo src="/img/Unzipped-Primary-Logo.png" alt="logo" />
          </Link>
        )}

        {isListViewable && (
          <>
            <div
              style={{ marginLeft: 15 }}
              onClick={() => {
                setIsViewable(false)
                setListName('')
                setIsLogoHidden(false)
                setIsListViewable(false)
                setIsExpanded(false)
              }}>
              <BackArrow />
              <span
                style={{
                  marginLeft: 10,
                  fontSize: 18,
                  fontWeight: 600,
                  letterSpacing: '0.85px'
                }}>
                Lists
              </span>
            </div>
          </>
        )}

        {isLogoHidden && (
          <>
            <div
              style={{ marginLeft: 15 }}
              onClick={() => {
                setIsViewable(false)
                setListName('')
                setIsLogoHidden(false)
                router.back()
              }}>
              {!isListViewable && <BackArrow />}
            </div>
            <span
              style={{
                marginLeft: 10,
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: '0.85px'
              }}>
              {listName ? listName : ''}
            </span>
          </>
        )}

        <Menu>
          {menuItems &&
            menuItems.map((item, index) => {
              const isHighlightIndex = index === highlightedIndex

              return (
                <Item
                  isMobileOnly={item.mobileOnly}
                  onMouseEnter={() => {
                    setHighlightColor(true)
                    setDropdowns(item.name)
                    setHighlightColor('#8EDE64')
                    setHighlightedIndex(index)
                  }}
                  onClick={() => setDropdowns(item.name)}
                  key={`${index}_${item.name}`}
                  style={{ color: isHighlightIndex ? highlightColor : '#333333' }}
                  onMouseLeave={() => setHighlightColor('#333333')}>
                  <Span>{item.name} </Span>
                  {item?.sub?.length && (
                    <Span2>
                      <DownIcon />
                    </Span2>
                  )}
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
          {window?.innerWidth > 680 && (
            <Desktop>
              <Search placeholder="Search" icon="search" />
              {getButtons(token)}
            </Desktop>
          )}
          <Mobile>
            <MenuIcon id="mobile_menu_icon" onClick={() => setMenuOpen(!menuOpen ? 'mobile' : false)} ref={wrapperRef}>
              <IconComponent name="navbarToggleIcon" width="39" height="39" viewBox="0 0 39 39" fill="#333333" />
            </MenuIcon>
            {menuOpen === 'mobile' && (
              <Absolute right="0px" top="0px">
                <FullScreenDropdown
                  menuItems={mobileMenuItems.filter(item => {
                    if (seenNames.has(item.name)) {
                      // If so, filter this item out
                      return false
                    } else {
                      seenNames.add(item.name)
                      return true
                    }
                  })}
                  startAProject={startAProject}
                  isAuth={isAuthenticated}
                  logoutUser={signOut}
                  onClose={() => setMenuOpen(false)}
                  role={role}
                />
              </Absolute>
            )}
          </Mobile>
        </Right>
      </Container>
      {isAuthenticated && isSubMenu && (
        <SubMenTop
          padding={token ? '0px 0px 0px 15%;' : '0px 0px 25px 15%;'}
          style={{
            transition: 'transform 0.3s ease-in-out',
            transform: isHidden ? 'translateY(-110%)' : 'translateY(0)'
          }}>
          {handleSearch && (
            <>
              <div>
                <h4>Browse</h4>
                <SearchBar
                  handleSearch={handleSearch}
                  filter={searchValue}
                  setFilter={setFilter}
                  searchButton={searchButton}
                  alignItems={'start'}
                />
              </div>
            </>
          )}
          {token && (
            <SubMenu>
              {subMenuItems.map((item, key) => (
                <Link href={item.link} key={`${key}_${item.name}`}>
                  <SpanWhite
                    count={key}
                    underline={
                      router?.pathname.includes('projects') && item.link.includes('projects')
                        ? true
                        : router?.pathname.includes('account') && item.name.toLowerCase() === 'dashboard'
                        ? true
                        : router?.pathname === item.link
                    }>
                    <Sub>{item.name}</Sub>
                  </SpanWhite>
                </Link>
              ))}
            </SubMenu>
          )}
        </SubMenTop>
      )}
    </Div>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.Auth.isAuthenticated,
    role: state.Auth.user?.role,
    token: state.Auth.token,
    loading: state.Auth.loading,
    profilePic: state.Auth?.user?.profileImage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: bindActionCreators(logoutUser, dispatch),
    resetBusinessForm: bindActionCreators(resetBusinessForm, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
