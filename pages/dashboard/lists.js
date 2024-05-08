import React, { useEffect, useRef, useState } from 'react'
import Nav from '../../components/unzipped/header'
import Icon from '../../components/ui/Icon'
import ListPanel from '../../components/unzipped/dashboard/ListPanel'
import { connect, useDispatch, useSelector } from 'react-redux'
import { parseCookies } from '../../services/cookieHelper'
import { getUserLists } from '../../redux/ListEntries/action'
import MobileFreelancerFooter from '../../components/unzipped/MobileFreelancerFooter'
import MobileProjects from '../../components/unzipped/dashboard/MobileProjects'
import MobileFreelancerCard from '../../components/unzipped/dashboard/MobileFreelancerCard'
import ViewAllList from '../../components/unzipped/dashboard/ViewAllList'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import ListManagementPanel from '../../components/unzipped/dashboard/ListManagementPanel'
import { deleteList } from '../../redux/Lists/ListsAction'
import DownArrow from '../../components/icons/downArrow'
import { WorkIcon } from '../../components/icons';
import { DarkText, TitleText } from '../../components/unzipped/dashboard/style';
import Button from '../../components/ui/Button';

const Lists = [
  {
    text: 'Favorites',
    icon: <Icon name="heart" />,
    padding: true
  },
  {
    text: 'Recently Viewed',
    icon: <Icon name="eye" />,
    padding: false
  },
  {
    text: 'My Team',
    icon: <Icon name="suitcase" />,
    padding: false
  }
]

const SelectInputStyled = styled.select`
  position: relative;
  border-radius: 3px;
  border: 0.25px solid #000;
  background: rgba(217, 217, 217, 0.28);
  display: block;
  padding: 5px;
  width: 200px;
  height: 35px;
  font-size: 12px;
`

const SelectionContainer = styled.div`
  position: relative;
  display: inline-block;
  border: 1px solid #d9d9d9;
  background: rgba(217, 217, 217, 0.28);
  border-radius: 3px;
  padding: 5px;
  width: 100px;
  margin-left: auto;
`

const SelectionButton = styled.div`
    border: none;
    padding: 10px;
    cursor: pointer;
    outline: none;
    border-radius: 3px;
    border: 0.25px solid #D9D9D947;
    background: #D9D9D9;
    
    // &::after{
    //     content : '\2304';
    //     display : block;
    // }

`

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  margin-top: 2px;
`

const DropdownItems = styled.div`
    padding: 12px;
    cursor: pointer;
    font-size: 18px;
    line-height: 24.5px;
    text-transform: uppercase;
    font-wight: 500;
    margin-top: 5px;
`;
// Freelancers listing page


const NoUsersInList = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const Dashboard = ({ business = 'Lists', selectedList = "Favorites", token, cookie }) => {
    const dispatch = useDispatch();
    const access = token?.access_token || cookie
    const userState = useSelector(state => state.Auth.user);
    const userListItems = useSelector((state) => state.ListEntries?.userLists);
    const [listEntities, setListEntities] = useState([]);
    const [userLists, setUserLists] = useState(null);
    const [isLogoHidden, setIsLogoHidden] = useState(false);
    const router = useRouter();
    const dropdownRef = useRef();

    // select favorites freelancer lists
    const [freelancers, setFreelancers] = useState([]);
    const freelancersArray = useSelector(state => state.ListEntries.listEntries);
    const [isViewable, setIsViewable] = useState(false);
    const [isFavourite, setIsFavourite] = useState(true);
    const [isRecentlyViewed, setIsRecentlyViewed] = useState(false);
    const [isMyTeam, setIsMyTeam] = useState(false);
    const recentlyViewedItems = useSelector(state => state.ListEntries.recentlyViewedList);
    const teamMembers = useSelector(state => state.ListEntries.teamMembers);
    const [listName, setListName] = useState('');
    const [isListViewable, setIsListViewable] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [listInfo, setListInfo] = useState({ lsitId: null, listTitle: null, listIcon: null })
    const [isEditMode, setIsEditMode] = useState(false)
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        setUserLists(userState);
    }, [userState]);

    useEffect(() => {
        dispatch(getUserLists(userState._id))
    }, [userState])

    useEffect(() => {
        setListEntities(userListItems)
    }, [userListItems]);

    useEffect(() => {
        if (!access) {
            router.push('/login')
        }
    }, []);

    useEffect(() => {
        if (freelancersArray && freelancersArray.length > 0) {
            const transformedArray = freelancersArray.map((item) => {
                return {
                    id: item?.freelancerId?._id,
                    name: `${item?.freelancerId.userId?.FirstName} ${item?.freelancerId?.userId?.LastName}`,
                    skills: (item?.freelancerId?.freelancerSkills.length > 0) ?
                        item?.freelancerId?.freelancerSkills?.map((skill) => skill.skill) : [],
                    cover:
                        item?.userId?.cover ||
                        `I have been a ${item?.freelancerId?.category || 'developer'} for over ${(item?.freelancerId && item?.freelancerId?.freelancerSkills && item?.freelancerId?.freelancerSkills[0]?.yearsExperience) || 1
                        } years. schedule a meeting to check if I'm a good fit for your business.`,
                    profilePic:
                        item?.userId?.profileImage ||
                        'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',
                    rate: item?.freelancerId?.rate,
                    likes: item?.freelancerId?.likeTotal || 0,
                    country: item?.userId?.AddressLineCountry,
                    type: item?.freelancerId?.category
                }
            }
            )
            setFreelancers(transformedArray);
        }
        else {
            setFreelancers([])
        }

    }, [freelancersArray]);

    useEffect(() => {
        if (recentlyViewedItems && recentlyViewedItems.length > 0) {
            const viewedItemsTransformed = recentlyViewedItems.map(item => {
                return {
                    id: item?.freelancerId?._id,
                    name: `${item?.userId?.FirstName} ${item?.userId?.LastName}`,
                    skills: (item?.freelancerId?.freelancerSkills.length > 0) ?
                        item?.freelancerId?.freelancerSkills?.map((skill) => skill.skill) : [],
                    cover:
                        item?.userId?.cover ||
                        `I have been a ${item?.freelancerId?.category || 'developer'} for over ${(item?.freelancerId && item?.freelancerId?.freelancerSkills && item?.freelancerId?.freelancerSkills[0]?.yearsExperience) || 1
                        } years. schedule a meeting to check if I'm a good fit for your business.`,
                    profilePic:
                        item?.userId?.profileImage ||
                        'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',
                    rate: item?.freelancerId?.rate,
                    likes: item?.freelancerId?.likeTotal || 0,
                    country: item?.userId?.AddressLineCountry
                }

            });
            setFreelancers(viewedItemsTransformed);
        } else {
            setFreelancers([])
        }
    }, [recentlyViewedItems]);

    useEffect(() => {
        const freelancerTransformedArr = teamMembers.map(item => {
            return {
                id: item?.freelancerId?._id,
                name: `${item?.freelancerId?.user?.FirstName} ${item?.freelancerId?.user?.LastName}`,
                skills: (item?.freelancerId?.freelancerSkills?.length > 0) ?
                    item?.freelancerId?.freelancerSkills?.map((skill) => skill.skill) : [],
                cover:
                    item?.freelancerId?.user?.cover ||
                    `I have been a ${item?.freelancerId?.category || 'developer'} for over ${(item?.freelancerId && item?.freelancerId?.freelancerSkills && item?.freelancerId?.freelancerSkills[0]?.yearsExperience) || 1
                    } years. schedule a meeting to check if I'm a good fit for your business.`,
                profilePic:
                    item?.freelancerId?.user?.profileImage ||
                    'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',
                rate: item?.freelancerId?.rate,
                likes: item?.freelancerId?.likeTotal || 0,
                country: item?.freelancerId?.user?.AddressLineCountry
            }

        });
        setFreelancers(freelancerTransformedArr)
    }, [teamMembers]);

    const [windowSize, setWindowsize] = useState('160px');

    const handleResize = () => {
        let windowSize = (window.innerWidth <= 600) ? '85px' : '160px'
        setWindowsize(windowSize);
        if (window.innerWidth > 600) {
            setIsListViewable(false);
            setIsExpanded(false);
            setIsViewable(false);
            setIsLogoHidden(false);
        }
    };

    useEffect(() => {
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [selectedValue, setSelectedValue] = useState('')
    const userId = useSelector(selector => selector.Auth.user._id);


    const toggleDropdown = (e) => {
        setIsOpen(!isOpen)
    };

    const handleSelectChange = (event) => {
        const value = event?.target?.value || event;
        // setSelectedValue(value);
        if (value == "CREATE" || value == "EDIT") {
            setIsModalOpen(true);
        }
        if (value == "EDIT") {
            setIsEditMode(true)
        }
        if (value == "DELETE") {
            dispatch(deleteList(listInfo.listId, () => dispatch(getUserLists(userId))))
            setListName('');
            setIsLogoHidden(true)
            setIsListViewable(true);
            setListInfo(null)
        }
    }

    return (
        <React.Fragment>

            <Nav
                isSubMenu
                marginBottom={windowSize}
                isLogoHidden={isLogoHidden}
                setIsViewable={setIsViewable}
                listName={listName}
                setListName={setListName}
                setIsLogoHidden={setIsLogoHidden}
                isListViewable={isListViewable}
                setIsListViewable={setIsListViewable}
                isExpanded={isExpanded}
                isViewable={isViewable}
                setIsExpanded={setIsExpanded}
            />
            <ListPanel
                list={Lists}
                business={business}
                selectedList={selectedList}
                type="list"
                userListItems={userListItems}
            />
            {!isViewable && (<MobileProjects
                userListItems={userListItems}
                setIsViewable={setIsViewable}
                setIsFavourite={setIsFavourite}
                setIsRecentlyViewed={setIsRecentlyViewed}
                setIsMyTeam={setIsMyTeam}
                setListName={setListName}
                setIsLogoHidden={setIsLogoHidden}
                setIsListViewable={setIsListViewable}
                isListViewable={isListViewable}
                setIsExpanded={setIsExpanded}
                setListInfo={setListInfo}
            />)}

            {!isViewable && (<MobileFreelancerFooter defaultSelected="Projects" />)}

            {isViewable && !isListViewable && (
                <>
                    <div style={{ display: 'flex', marginLeft: 'auto', padding: 5 }}>
                        <SelectionContainer ref={dropdownRef}>
                            <SelectionButton onClick={toggleDropdown}>
                                <div style={{ display: 'flex' }}>
                                    <div> Details </div>
                                    <div style={{ marginLeft: 'auto' }}>
                                        <DownArrow color="#444444" />
                                    </div>
                                </div>
                            </SelectionButton>
                            {isOpen && (
                                <DropdownContainer >
                                    <DropdownItems onClick={() => {
                                        handleSelectChange('CREATE');
                                        setIsOpen(false);
                                    }
                                    }>Create</DropdownItems>
                                    <DropdownItems onClick={() => {
                                        handleSelectChange('EDIT');
                                        setIsOpen(false);
                                    }
                                    }>Edit</DropdownItems>
                                    <DropdownItems onClick={() => {
                                        handleSelectChange('DELETE');
                                        setIsOpen(false);
                                    }
                                    }>
                                        Delete
                                    </DropdownItems>
                                </DropdownContainer>
                            )}
                        </SelectionContainer>
                    </div>
                    {freelancers.map((freelancer) => (
                        <>
                            <MobileFreelancerCard
                                user={freelancer}
                            />
                        </>
                    ))}
                    {
                        freelancers.length < 1 && (
                            <NoUsersInList>
                                <WorkIcon width={200} height={200} />
                                <TitleText center noMargin size="24px" style={{ justifyContent: 'center' }}>This list is empty</TitleText>
                                <DarkText center>Add investors to your list to quickly find them later. </DarkText>
                                <div><Button noBorder oval style={{ color: "black" }}>BROWSE FREELANCERS</Button></div>
                            </NoUsersInList>
                        )
                    }
                </>
            )}
            {userListItems?.length > 0 && isListViewable && (<ViewAllList
                userLists={userListItems}
                setIsViewable={setIsViewable}
                setIsFavourite={setIsFavourite}
                setIsRecentlyViewed={setIsRecentlyViewed}
                setIsMyTeam={setIsMyTeam}
                setListName={setListName}
                setIsLogoHidden={setIsLogoHidden}
                setIsListViewable={setIsListViewable}
                userId={userState._id}
                setListInfo={setListInfo}
            />)}
            {isModalOpen && (<ListManagementPanel
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                listInfo={listInfo}
                isEditMode={isEditMode}
                setIsEditMode={setIsEditMode}
                userId={userState._id}
                setIsViewable={setIsViewable}
                setIsListViewable={setIsListViewable}
                setListName={setListName}
                setIsLogoHidden={setIsLogoHidden}
                setListInfo={setListInfo}
                isViewable={true}
            />)}
        </React.Fragment>
    )
}

Dashboard.getInitialProps = async ({ req, res }) => {
  const token = parseCookies(req)

  return {
    token: token && token
  }
}

const mapStateToProps = state => {
  return {
    cookie: state.Auth.token,
    user: state.Auth.user
  }
}
const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
