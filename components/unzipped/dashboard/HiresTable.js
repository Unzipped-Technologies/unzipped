import React from 'react'
import styled from 'styled-components'
import { DarkText, Absolute, WhiteCard, Underline } from './style'
import { TableTitle } from './tableStyle'
import Button from '../../ui/Button'
import { ValidationUtils } from '../../../utils'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useRouter } from 'next/router'
import { updateBusiness } from '../../../redux/Business/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MobileProjectHires from './mobile/MobileProjectHires'

const Desktop = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: row;
  @media (max-width: 680px) {
    display: none;
  }
`

const Container = styled.div`
  display: flex;
  flex-flow: column;
  border: 1px solid #d9d9d9;
  background: ${({ background }) => (background ? background : '#D9D9D9')};
  width: 1160px;
  max-height: 900px;
  border-radius: 10px;
`

const Box = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  min-height: 100px;
  justify-content: center;
  align-items: center;
`

const StoryTable = styled.div``
import Swal from 'sweetalert2'

const HiringTable = ({ data, loading, user }) => {
  const router = useRouter()

  const menus = [
    {
      text: 'Revoke Access',
      onClick: () => {}
    },
    {
      text: 'View Profile',
      onClick: () => {}
    },
    {
      text: 'Assign Work',
      onClick: () => {}
    },
    {
      text: 'View Invoices',
      onClick: () => {}
    },
    {
      text: 'Assign Department',
      onClick: () => {}
    }
  ]

  const archivedProject = async projectID => {
    await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, close it!'
    }).then(async result => {
      if (result.isConfirmed) {
        const response = await updateBusiness({ listId: projectID, isArchived: true })
        if (response?.status === 200) {
          Swal.fire({
            title: 'Closed!',
            text: `${response?.data?.msg || 'Project closed successfully'}`,
            icon: 'success'
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${response?.data?.msg || 'Error archive the project.'}!`
          })
        }
      }
    })
  }

  return (
    <>
      <Desktop>
        <Container background={'#FDFDFD'}>
          <TableTitle paddingLeft noMargin row height="70px">
            <DarkText noMargin bold textAlignLast="left" width="100%">
              Name
            </DarkText>
            <DarkText noMargin center bold textAlignLast="left" width="100%">
              RATE
            </DarkText>
            <DarkText noMargin center bold textAlignLast="left" width="100%">
              POINTS
            </DarkText>
            <DarkText noMargin center bold textAlignLast="left" width="100%">
              DEPARTMENT
            </DarkText>
            <DarkText noMargin center bold textAlignLast="center" width="100%">
              HIRE DATE
            </DarkText>
            <DarkText noMargin center bold textAlignLast="center" width="100%">
              ACTIONS
            </DarkText>
          </TableTitle>
          <StoryTable>
            {data?.length === 0 && loading && (
              <Box>
                <CircularProgress />
              </Box>
            )}
            {data?.length === 0 && <Box>Start a project and you will see it here...</Box>}
            {data?.length > 0 &&
              data?.map((item, index) => (
                <WhiteCard
                  noMargin
                  borderRadius="0px"
                  row
                  background={!ValidationUtils.checkNumberEven(index) ? '#F7F7F7' : '#fff'}>
                  <DarkText textOverflow="ellipsis" noMargin textAlignLast="left">
                    {item.name}
                  </DarkText>
                  <DarkText noMargin center textAlignLast="left" width="100%">
                    ${item.rate || 0}
                  </DarkText>
                  <DarkText noMargin center textAlignLast="left" width="100%">
                    {item?.points || 0}
                  </DarkText>
                  <DarkText noMargin center textAlignLast="left" width="100%">
                    {item?.department || 'N/A'}
                  </DarkText>
                  <DarkText noMargin center textAlignLast="left" width="100%">
                    {item?.hireDate || 'N/A'}
                  </DarkText>
                  <Absolute>
                    <Button
                      icon="largeExpand"
                      popoutWidth="150px"
                      noBorder
                      block
                      type="lightgrey"
                      fontSize="13px"
                      popout={menus}
                      iconRight>
                      Details
                    </Button>
                  </Absolute>
                </WhiteCard>
              ))}
          </StoryTable>
        </Container>
      </Desktop>
      <MobileProjectHires />
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    updateBusiness: bindActionCreators(updateBusiness, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(HiringTable)
