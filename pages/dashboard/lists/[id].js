import react, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { DIV } from '../../../components/unzipped/dashboard/style'
import { WorkIcon } from '../../../components/icons'
import Nav from '../../../components/unzipped/header'
import IconComponent from '../../../components/ui/icons/IconComponent'
import { TEXT } from '../../../components/unzipped/dashboard/style'
import { deleteList, getListByid } from '../../../redux/Lists/ListsAction'
import { getUserLists, getListEntriesById } from '../../../redux/ListEntries/action'
import { useDispatch, useSelector } from 'react-redux'
import ListManagementPanel from '../../../components/unzipped/dashboard/ListManagementPanel'
import DownArrow from '../../../components/icons/downArrow'
import MobileFreelancerCard from '../../../components/unzipped/dashboard/MobileFreelancerCard'
import Button from '../../../components/ui/Button'

const Container = styled.div`
  @media (min-width: 680px) {
    display: none;
  }
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
`

const NoUsersInList = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const MobileListDetail = () => {
  const dispatch = useDispatch()
  const dropdownRef = useRef()

  const router = useRouter()
  const { id } = router.query

  const userId = useSelector(selector => selector.Auth.user._id)
  const selectedList = useSelector(state => state.Lists?.selectedList)
  const ListEntries = useSelector(state => state.ListEntries.listEntries)

  const [IsDropwDownOpen, setDropDown] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const [freelancers, setFreelancerList] = useState([])

  useEffect(() => {
    getFreelancerCardData(ListEntries)
  }, [ListEntries])

  useEffect(() => {
    const fetchData = () => {
      dispatch(getListByid(id))
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = () => {
      selectedList?._id && dispatch(getListEntriesById(selectedList._id))
    }
    fetchData()
  }, [selectedList])

  const toggleDropdown = e => {
    setDropDown(!isOpen)
  }

  const getFreelancerCardData = listEntries => {
    if (listEntries?.length > 0) {
      const freelancerTransformedArr = listEntries?.map(item => {
        return {
          id: item?.freelancerId?._id,
          itemId: item?._id,
          name: `${item?.freelancerId?.userId?.FirstName} ${item?.freelancerId?.userId?.LastName}`,
          skills: item?.freelancerId?.freelancerSkills ?? [],
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
  }

  const handleSelectChange = value => {
    if (value == 'EDIT') {
      setOpen(true)
      handleOpen()
    }
    if (value == 'DELETE') {
      dispatch(deleteList(selectedList?.listId, () => dispatch(getUserLists(userId))))
    }
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = async () => {
    setOpen(false)
    await dispatch(getUserLists(userId))
  }

  return (
    <Container data-testid="mobile_list_detail">
      <Nav isSubMenu marginBottom={'85px'} isLogoHidden={true} />

      <div
        style={{
          display: 'flex',
          marginLeft: 'auto',
          padding: '5px 5px 10px 5px ',
          borderBottom: '3px solid #EFF1F4'
        }}>
        <div className="d-flex  gap-3 align-items-center pt-3" id="list_basic_info">
          <div className="d-flex">
            {selectedList?.isPrivate && (
              <>
                <div className="pt-2" id="lock_icon">
                  <IconComponent name="closedLock" width="15px" viewBox="0 0 6 7" height="15px" fill={'#B2B9C5'} />
                </div>
                <TEXT fontSize="14px" lineHeight="19.5px" letterSpacing="0.15px" textColor="#000000">
                  Private
                </TEXT>
              </>
            )}
          </div>
          <TEXT fontSize="14px" lineHeight="19.5px" letterSpacing="0.15px" textColor="#000000">
            {ListEntries?.length ?? 0} members
          </TEXT>
        </div>
        <DIV
          position="relative"
          display="inline-block"
          border="1px solid #d9d9d9"
          background="rgba(217, 217, 217, 0.28)"
          borderRadius="3px"
          padding="5px"
          width="98px"
          height="28px"
          margin="0px 0px 0px auto"
          id="list_actions_dropdown"
          ref={dropdownRef}>
          <DIV
            padding="5px 10px 10px 10px"
            cursor="pointer"
            outline="none"
            borderRadius="3px"
            border="0.25px solid #d9d9d947"
            onClick={toggleDropdown}>
            <div style={{ display: 'flex' }}>
              <div> Details </div>
              <div style={{ marginLeft: 'auto' }}>
                <DownArrow color="#444444" />
              </div>
            </div>
          </DIV>
          {IsDropwDownOpen && (
            <DropdownContainer>
              <DropdownItems
                onClick={() => {
                  handleSelectChange('EDIT')
                  setDropDown(true)
                }}>
                Edit
              </DropdownItems>
              <DropdownItems
                onClick={() => {
                  handleSelectChange('DELETE')
                  setDropDown(false)
                }}>
                Delete
              </DropdownItems>
            </DropdownContainer>
          )}
        </DIV>
      </div>
      {freelancers?.map(freelancer => (
        <div
          data-testid={freelancer?.itemId + '_entry'}
          key={freelancer?.itemId}
          style={{
            padding: '5px 5px 10px 5px ',
            borderBottom: '3px solid #EFF1F4'
          }}>
          <MobileFreelancerCard user={freelancer} hasBorder={false} />
        </div>
      ))}
      {freelancers?.length < 1 && (
        <NoUsersInList>
          <WorkIcon width={200} height={200} />
          <TEXT textAlign="center" fontSize="24px">
            This list is empty
          </TEXT>
          <TEXT center>Add investors to your list to quickly find them later. </TEXT>
          <div>
            <Button noBorder oval style={{ color: 'black' }}>
              BROWSE FREELANCERS
            </Button>
          </div>
        </NoUsersInList>
      )}

      {isOpen && (
        <ListManagementPanel
          isModalOpen={isOpen}
          setIsEditMode={handleClose}
          setIsModalOpen={handleClose}
          isEditMode={true}
          userId={userId}
          listInfo={{
            listTitle: selectedList?.name,
            listIcon: selectedList?.icon,
            listId: selectedList?._id
          }}
        />
      )}
    </Container>
  )
}

export default MobileListDetail
