import React, { useState, useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { bindActionCreators } from 'redux'

import Nav from '../../../../components/unzipped/header'
import { IconColors } from '../../../../utils/FontIcons'
import { getUserLists } from '../../../../redux/ListEntries/action'
import { TEXT, DIV } from '../../../../components/unzipped/dashboard/style'
import IconSelector from '../../../../components/unzipped/dashboard/IconSelector'
import ListManagementPanel from '../../../../components/unzipped/dashboard/ListManagementPanel'

const Container = styled.div`
  @media (min-width: 680px) {
    display: none;
  }
`

const DropDown = styled.div`
  display: blockk;
  position: absolute;
  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  width: 100%; /* Adjust the width as needed */
  border: 1px solid #ccc;
`

function MobileProjects({ lists, userId, getUserLists }) {
  const router = useRouter()

  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      await getUserLists(userId)
    }

    fetchData()
  }, [])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = async () => {
    setOpen(false)
    await getUserLists(userId)
  }

  return (
    <Container data-testid="view_all_lists">
      <Nav isSubMenu marginBottom={'85px'} isLogoHidden={true} />
      <div className="d-flex px-4 py-2 me-2" style={{ gap: '15px', borderBottom: '3px solid #EFF1F4', width: '100%' }}>
        <TEXT
          fontSize="14px"
          lineHeight="19.5px"
          fontWeight="600"
          letterSpacing="0.15px"
          margin="0"
          textColor="#000000">
          Lists
        </TEXT>
        <DIV
          id="add_new_list"
          width="97%"
          display="flex"
          overflow="hidden"
          alignItems="flex-end"
          justifyContent="flex-end"
          margin="-25px 0px 0px 35px"
          onClick={handleOpen}>
          <TEXT
            fontSize="14px"
            lineHeight="19.5px"
            fontWeight="400"
            letterSpacing="0.15px"
            margin="0"
            textColor="#0057FF">
            + New List
          </TEXT>
        </DIV>
      </div>
      <DropDown display={'block'}>
        {lists?.length > 0 &&
          lists.map(list => (
            <div
              data-testid={list?._id}
              className="px-4 py-2 me-2"
              style={{ borderBottom: '3px solid #EFF1F4' }}
              key={list?._id}
              onClick={() => {
                router.push(`${list?._id}`)
              }}>
              <div className="d-flex">
                {list?.icon && (
                  <IconSelector
                    id={list?._id + '_icon'}
                    icon={list.icon}
                    size={24}
                    style={{ color: IconColors[list?.icon] }}
                    twoToneColor={IconColors[list?.icon]}
                  />
                )}{' '}
                <div>
                  <TEXT fontSize="16px" padding="10px 0px 0px 5px" margin="0px !important">
                    {list?.name ?? 'List Name'}
                  </TEXT>

                  <div className="d-flex ">
                    <TEXT
                      fontSize="7px"
                      padding="0px 0px 0px 3px"
                      margin="0px !important"
                      lineHeight="19.5px"
                      letterSpacing="0.15px"
                      fontWeight="400">
                      {list?.isPrivate && 'Private'}
                    </TEXT>

                    <TEXT
                      fontSize="7px"
                      margin="0px !important"
                      padding="0px 0px 0px 3px"
                      lineHeight="19.5px"
                      letterSpacing="0.15px"
                      fontWeight="400">
                      {list?.listEntries?.length ?? 0} members
                    </TEXT>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </DropDown>
      {isOpen && (
        <ListManagementPanel isModalOpen={isOpen} setIsModalOpen={handleClose} isEditMode={false} userId={userId} />
      )}
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.Auth?.user?._id,
    lists: state.ListEntries?.userLists
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserLists: bindActionCreators(getUserLists, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileProjects)
