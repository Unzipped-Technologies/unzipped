import styled from 'styled-components'
import Icon from '../../../components/ui/Icon'
import {
  getListEntriesById,
  getRecentlyViewedList,
  getTeamMembers,
  getUserLists
} from '../../../redux/ListEntries/action'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { COLORS, getFontStyled, FONT_SIZE, LETTER_SPACING } from '../../ui/TextMaskInput/core/utilities'
import { createList } from '../../../redux/Lists/ListsAction'
import RenderIcon from '../RenderIcon'
import * as Icons from '@ant-design/icons/lib/icons'
import { FontIconsArray } from '../../../utils/FontIcons'

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '0px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '15px',
    width: '80%',
    height: 'auto'
  }
}))

const InputStyled = styled.input`
  height: 2rem !important;
  border: 1px solid #d9d9d9;
  // padding-left: 15px !important;
  border-radius: 5px;
  :focus {
    box-shadow: none !important;
  }
`

const Label = styled.span`
  text-transform: uppercase;
  display: block;
  ${getFontStyled({
    color: COLORS.black,
    fontSize: FONT_SIZE.PX_12,
    fontWeight: 500,
    fontStyle: 'normal',
    lineHeight: FONT_SIZE.PX_24,
    letterSpacing: LETTER_SPACING
  })};
  margin-top: 12px;
  margin-bottom: 6px;
`

const CancelButtonStyled = styled.button`
  background: #fff;
  color: #1976d2;
  border: 1px solid #1976d2;
  text-transform: uppercase;
  font-size: 15px;
  letter-spacing: 0.4px;
  text-align: center;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 5px;
  font-family: Roboto;
  font-weight: 500;
  line-height: 24.5px;
`

const AddListButtonStyled = styled.button`
  background: #1976d2;
  color: #fff;
  text-transform: uppercase;
  font-size: 15px;
  letter-spacing: 0.4px;
  text-align: center;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 5px;
  font-family: Roboto;
  font-weight: 500;
  line-weight: 24.5px;
  border: 0;
  margin-left: 10px;
`

const ListStyled = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 2px;
  margin-bottom: 2px;
  box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.25);
  padding: 15px;
`

const ListItemStyled = styled.div`
  font-size: 20px;
  font-weight: 500;
`

const ViewAllList = ({
  userLists,
  setIsViewable,
  setIsFavourite,
  setIsRecentlyViewed,
  setIsMyTeam,
  setListName,
  setIsLogoHidden,
  setIsListViewable,
  userId,
  setIsExpanded,
  setListInfo
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('')
  const { token } = useSelector(state => state.Auth)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isIconDropdownOpen, setIsIconDropdownOpen] = useState(false)
  const [listIcon, setListIcon] = useState('')
  const [filterdIcons, setFilterdIcons] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const handleIconChangeEvent = event => {
    setIcon(event.target.value)
  }

  const handleNameChangeEvent = event => {
    setName(event.target.value)
  }

  const handleListChangeEv = item => {
    if (item.name === 'Favorites') {
      setIsFavourite(true)
      dispatch(getListEntriesById(item._id))
    }

    if (item.name === 'Recently Viewed') {
      setIsRecentlyViewed(true)
      dispatch(getRecentlyViewedList(item._id))
    }

    if (item.name === 'My Team') {
      setIsMyTeam(true)
      dispatch(getTeamMembers(userId))
    }
    if (item.name !== 'Favorites' && item.name !== 'My Team' && item.name !== 'Recently Viewed') {
      setIsFavourite(false)
      setIsRecentlyViewed(false)
      setIsMyTeam(false)
      dispatch(getListEntriesById(item._id))
    }

    setIsViewable(true)
    setListName(item.name)
    setIsLogoHidden(true)
    setIsListViewable(false)
    // setIsExpanded(true)
    setListInfo({ listId: item._id, listTitle: item.name, listIcon: item.icon })
  }
  const handleListSaveEvent = () => {
    dispatch(
      createList(
        {
          name,
          icon,
          userId
        },
        token,
        () => dispatch(getUserLists(userId))
      )
    )
    handleClose()
  }

  const handleClose = () => {
    setName('')
    setIcon('')
    setIsModalOpen(false)
    setListIcon('')
  }

  const handleIconSelect = icon => {
    setListIcon(icon)
    setFilterdIcons([])
    setIcon(icon)
  }

  const handleIconSearch = event => {
    setTimeout(() => {
      setSearchTerm(event.target.value)
      const finalList = FontIconsArray.filter(icon => icon.toLowerCase().includes(event.target.value))
      Object.keys(Icons).map(icon => {
        const Icon = Icons[icon]
        return (
          <div key={icon} style={{ fontSize: '30px', paddingLeft: '10px', color: '#1C1C1C' }}>
            <Icon
              onClick={() => {
                handleIconSelect(icon)
              }}
            />
          </div>
        )
      })
      setFilterdIcons(finalList)
    }, 1200)
  }
  const handleSelectIcon = () => {
    setIsIconDropdownOpen(!isIconDropdownOpen)
  }

  useEffect(() => {
    setIsIconDropdownOpen(!isIconDropdownOpen)
  }, [listIcon])

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 10,
          fontSize: 16,
          fontWeight: 500,
          borderBottom: '1px solid gray'
        }}>
        <div>
          <p>Lists</p>
        </div>
        <div
          style={{
            color: 'blue',
            marginRight: 10
          }}
          onClick={() => setIsModalOpen(true)}>
          <p>+ New List</p>
        </div>
      </div>
      {userLists &&
        userLists.length > 0 &&
        userLists.map(item => (
          <ListStyled>
            <div>{item.icon && <RenderIcon iconName={item.icon} />}</div>
            <ListItemStyled onClick={() => handleListChangeEv(item)}> {item.name}</ListItemStyled>
          </ListStyled>
        ))}
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={isModalOpen}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{ timeout: 500 }}>
          <Fade in={isModalOpen}>
            <div className={classes.paper}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 40
                }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    justifyContent: 'space-between',
                    gap: '0px'
                  }}>
                  <div>
                    <Label>List Name</Label>
                    <InputStyled
                      type="text"
                      placeholder="Enter List Name"
                      value={name}
                      onChange={handleNameChangeEvent}
                    />
                  </div>
                  <div style={{ display: 'flex' }}>
                    <span style={{ marginRight: '20px', marginTop: '5px' }}>Select Icon</span>
                    <span style={{ display: listIcon ? 'block' : 'none' }} onClick={handleSelectIcon}>
                      {listIcon && <RenderIcon iconName={listIcon} />}
                    </span>
                  </div>
                  {isIconDropdownOpen && (
                    <div>
                      <input
                        type="text"
                        placeholder="Search Icon"
                        onKeyDown={handleIconSearch}
                        style={{ position: 'relative' }}
                      />
                    </div>
                  )}
                  {isIconDropdownOpen && (
                    <div style={{ position: 'relative' }}>
                      <div
                        style={{
                          width: '100%',
                          position: 'absolute',
                          display: 'flex',
                          flexDirection: 'column',
                          top: '-30px'
                        }}>
                        <div
                          style={{
                            width: '100%',
                            height: '200px',
                            padding: '10px',
                            display: 'flex',
                            background: '#e5e5e5',
                            borderRadius: '10px',
                            position: 'absolute',
                            zIndex: 10,
                            top: '25px'
                          }}>
                          {filterdIcons && filterdIcons.length > 0 ? (
                            <>
                              <div
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  overflowY: 'scroll',
                                  flexWrap: 'wrap',
                                  display: 'flex'
                                }}>
                                {filterdIcons.map(icon => {
                                  const Icon = Icons[icon]
                                  return (
                                    <div key={icon} style={{ fontSize: '30px', paddingLeft: '10px', color: '#1C1C1C' }}>
                                      <Icon
                                        onClick={() => {
                                          handleIconSelect(icon)
                                        }}
                                      />
                                    </div>
                                  )
                                })}
                              </div>
                            </>
                          ) : (
                            <>
                              <div
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  overflowY: 'scroll',
                                  flexWrap: 'wrap',
                                  display: 'flex'
                                }}>
                                {Object.keys(Icons).map(icon => {
                                  const Icon = Icons[icon]
                                  return (
                                    <div key={icon} style={{ fontSize: '30px', paddingLeft: '10px', color: '#1C1C1C' }}>
                                      <Icon
                                        onClick={() => {
                                          handleIconSelect(icon)
                                        }}
                                      />
                                    </div>
                                  )
                                })}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      marginTop: '20px'
                    }}>
                    <CancelButtonStyled onClick={handleClose}>cancel</CancelButtonStyled>
                    <AddListButtonStyled onClick={handleListSaveEvent}>{'ADD LIST'}</AddListButtonStyled>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  )
}

export default ViewAllList
