import React from 'react'
import { FaRegCheckCircle } from 'react-icons/fa'
import { MdKeyboardArrowDown } from 'react-icons/md'

import MenuIcon from '../../../ui/icons/menu'
import { TitleText, DarkText, WhiteCard, Underline, DIV } from '../style'

const ProjectsPanel = ({ businesses, selectedDepartment, onSelectDepartment, currentBusiness, onSelectBusiness, setIsEditable }) => {

  return (
    <>
      <DIV
        position="relative"
        border="1px solid #d9d9d9"
        minWidth="400px"
        height="fit-content"
        borderRadius="10px"
        overflow="hidden">
        {businesses?.length > 0 &&
          businesses.map(business => {
            return (
              <div key={business._id}>
                <DIV
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  padding="20px 0px 0px 0px"
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
                </DIV>
                {business._id !== currentBusiness?._id && <Underline />}
                {business?.businessDepartments?.length && currentBusiness?._id === business?._id ? (
                  business?.businessDepartments?.map(department => {
                    return (
                      <DIV key={department._id}>
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
                                  <DIV position="relative" display="inline-block">
                                    <DIV>
                                      <MenuIcon width="28px" height="28px" color="#2F76FF" />
                                    </DIV>
                                    <DIV
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
                                    </DIV>
                                  </DIV>
                                </>
                              ) : (
                                <MenuIcon width="28px" height="28px" color="#2F76FF" />
                              )}
                            </span>
                            {department.name}
                          </DarkText>
                        </WhiteCard>
                      </DIV>
                    )
                  })
                ) : (
                  <span data-testid={business._id + '_empty_departments'}>{''}</span>
                )}
                {business._id === currentBusiness?._id && <Underline />}
              </div>
            )
          })}
      </DIV>
    </>
  )
}

export default ProjectsPanel
