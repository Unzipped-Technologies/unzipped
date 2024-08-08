import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import { TitleText, DIV } from './style'
import Button from '../../ui/Button'
import FreelancerNotFound from '../../icons/freelancernotfound'
import UserNotFound from '../../icons/usernotfound'
import ListManagementPanel from './ListManagementPanel'
import { getUserLists } from '../../../redux/ListEntries/action'
import { deleteList } from '../../../redux/Lists/ListsAction'
import { useRouter } from 'next/router'
import FreelancerListingCard from './FreelancersListingCard'
import DownArrow from '../../../components/icons/downArrow'

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
`

const Panel = ({ listInfo, setListInfo }) => {
  const router = useRouter()
  const dropdownRef = useRef(null)
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)
  const [freelancer, setFreelancerList] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  const ListEntries = useSelector(state => state.ListEntries.listEntries)
  const userId = useSelector(selector => selector.Auth.user._id)
  const isLoading = useSelector(state => state.Loading.loading)

  useEffect(() => {
    getFreelancerCardData(ListEntries)
  }, [ListEntries])

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  const getFreelancerCardData = listEntries => {
    const freelancerTransformedArr = listEntries?.map(item => {
      return {
        id: item?.freelancerId?._id,
        itemId: item?._id,
        name: `${item?.freelancerId?.userId?.FirstName} ${item?.freelancerId?.userId?.LastName}`,
        skills:
          item?.freelancerId?.freelancerSkills.length > 0
            ? item?.freelancerId?.freelancerSkills?.map(skill => skill.skill)
            : [],
        cover:
          item?.freelancerId?.cover ||
          `I have been a ${item?.freelancerId?.category || 'developer'} for over ${
            (item?.freelancerId &&
              item?.freelancerId?.freelancerSkills &&
              item?.freelancerId?.freelancerSkills[0]?.yearsExperience) ||
            1
          } years. schedule a meeting to check if I'm a good fit for your business.`,
        profilePic:
          item?.userId?.profileImage ||
          'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',
        rate: item?.freelancerId?.rate,
        likes: item?.freelancerId?.likeTotal,
        country: item?.freelancerId?.userId?.AddressLineCountry,
        category: item?.freelancerId?.category
      }
    })
    setFreelancerList(freelancerTransformedArr)
  }

  const hanleFreelancersBrowsing = () => router.push('/freelancers')

  const toggleDropdown = e => {
    setIsOpen(!isOpen)
  }

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  const handleSelectChange = value => {
    if (value == 'CREATE' || value == 'EDIT') {
      setIsModalOpen(true)
    }
    if (value == 'EDIT') {
      setIsEditMode(true)
    }
    if (value == 'DELETE') {
      dispatch(deleteList(listInfo.listId, () => dispatch(getUserLists(userId))))
    }
  }
  return (
    <DIV
      data-testid="right_list_panel"
      position="relative"
      display="flex"
      flexFlow="column"
      background="#fff"
      margin="0px 0px 0px 34px"
      border-radius="10px">
      <div
        className="d-flex align-items-center justify-content-between pb-3 px-3"
        style={{
          borderRadius: '5px',
          padding: '10px',
          borderRadius: '8px 8px 0px 0px',
          background: ' rgba(255, 255, 255, 0.64)',
          boxShadow: ' 0px 4px 8px 0px rgba(0, 0, 0, 0.10)'
        }}>
        <div className="d-flex align-items-center">
          <TitleText width="max-content" noMargin size="18px" paddingRight="20px">
            {listInfo.listTitle}
          </TitleText>
        </div>

        {/* List Dropdown Start */}

        <DIV
          ref={dropdownRef}
          position="relative"
          display="inline-block"
          border="1px solid #d9d9d9"
          background="rgba(217, 217, 217, 0.28)"
          borderRadius="3px"
          padding="5px"
          width="100px"
          margin="0px 0px 0px auto"
          id="list_actions_dropdown">
          <DIV
            cursor="pointer"
            outline="none"
            borderRadius="3px"
            border="0.25px solid #D9D9D947"
            onClick={toggleDropdown}>
            <div style={{ display: 'flex' }}>
              <div> Details </div>
              <div style={{ marginLeft: 'auto' }}>
                <DownArrow color="#444444" />
              </div>
            </div>
          </DIV>
          {isOpen && (
            <DropdownContainer>
              <DropdownItems
                onClick={() => {
                  handleSelectChange('CREATE')
                  setIsOpen(false)
                }}>
                Create
              </DropdownItems>
              <DropdownItems
                onClick={() => {
                  handleSelectChange('EDIT')
                  setIsOpen(false)
                }}>
                Edit
              </DropdownItems>
              <DropdownItems
                onClick={() => {
                  handleSelectChange('DELETE')
                  setIsOpen(false)
                }}>
                Delete
              </DropdownItems>
            </DropdownContainer>
          )}
        </DIV>
        {/* List Dropdown end */}
      </div>

      {!isLoading ? (
        ListEntries && freelancer?.length > 0 ? (
          <>
            {freelancer.map((item, index) => (
              <FreelancerListingCard user={item} width={'450px'} key={index} includeRate={10} />
            ))}
          </>
        ) : freelancer?.length < 1 ? (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                paddingBottom: '15px'
              }}>
              <div style={{ position: 'relative', top: 10 }}>
                {' '}
                <UserNotFound />{' '}
              </div>
              <FreelancerNotFound />
              <h3 style={{ fontSize: '22px', fontWeight: 500 }}>This list is empty</h3>
              <p>Add freelancer to your list to quickly find them later. </p>
              <Button
                onClick={hanleFreelancersBrowsing}
                style={{
                  background: '#37DEC5',
                  color: '#363636',
                  lineHeight: '24.5px',
                  fontSize: '15px',
                  fontFamily: 'Roboto',
                  border: '0',
                  borderRadius: '32px'
                }}>
                Browse Freelancers
              </Button>
            </div>
          </>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
      <ListManagementPanel
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        listInfo={listInfo}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        userId={userId}
      />
    </DIV>
  )
}

export default Panel
