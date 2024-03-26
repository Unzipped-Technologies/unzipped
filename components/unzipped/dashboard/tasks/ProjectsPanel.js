import React from 'react'
import styled from 'styled-components'
import { TitleText, DarkText, WhiteCard, Underline } from '../style'
import { MdKeyboardArrowDown } from 'react-icons/md'
import MenuIcon from '../../../ui/icons/menu'
import { FaRegCheckCircle } from 'react-icons/fa'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  border: 1px solid #d9d9d9;
  min-width: 400px;
  height: fit-content;
  border-radius: 10px;
  overflow: hidden;
`

const ProjectsPanel = ({ businesses, selectedDepartment, onSelectDepartment, currentBusiness, onSelectBusiness }) => {
  return (
    <>
      <Container>
        {businesses?.length
          ? businesses.map(business => {
              return (
                <div key={business._id}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingTop: '20px'
                    }}
                    onClick={() => {
                      if (business._id === currentBusiness?._id) {
                        onSelectBusiness('')
                      } else {
                        onSelectBusiness(business)
                      }
                    }}>
                    <TitleText paddingLeft clickable>
                      {business.name}
                    </TitleText>
                    <MdKeyboardArrowDown
                      style={{
                        fontSize: '48px',
                        fontWeight: 'bold',
                        marginRight: '10px',
                        marginTop: '-10px'
                      }}
                    />
                  </div>
                  {business._id !== currentBusiness?._id && <Underline />}
                  {business?.businessDepartments?.length && currentBusiness?._id === business?._id
                    ? business?.businessDepartments?.map(department => {
                        return (
                          <div key={department._id}>
                            <WhiteCard
                              borderColor="transparent"
                              padding="0px 5px 30px 20px"
                              height="30px"
                              row
                              noMargin
                              clickable
                              borderLeft={'transparent'}>
                              <DarkText
                                clickable
                                noMargin
                                hover
                                fontSize="20px"
                                onClick={() => {
                                  onSelectDepartment(department)
                                }}>
                                <span style={{ paddingRight: '25px' }}>
                                  {selectedDepartment?._id === department._id ? (
                                    <>
                                      <div
                                        style={{
                                          position: 'relative',
                                          display: 'inline-block'
                                        }}>
                                        <div style={{}}>
                                          {' '}
                                          <MenuIcon width="28px" height="28px" color="#2F76FF" />
                                        </div>
                                        <div
                                          style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            top: 11,
                                            right: -12
                                          }}>
                                          {' '}
                                          <FaRegCheckCircle
                                            style={{
                                              width: '18px',
                                              height: '17px',
                                              color: '#2F76FF'
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <MenuIcon width="28px" height="28px" color="#2F76FF" />
                                  )}
                                </span>
                                {department.name}
                              </DarkText>
                            </WhiteCard>
                          </div>
                        )
                      })
                    : ''}
                  {business._id === currentBusiness?._id && <Underline />}
                </div>
              )
            })
          : ''}
      </Container>
    </>
  )
}

export default ProjectsPanel
