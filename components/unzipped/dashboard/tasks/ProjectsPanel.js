import React from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'

import MenuIcon from '../../../ui/icons/menu'
import { TitleText, DarkText, WhiteCard, Underline, DIV, TEXT } from '../style'
import { FaRegCheckCircle } from 'react-icons/fa'
import { getBusinessEmployees } from '../../../../redux/Business/actions'
import { useDispatch } from 'react-redux'
import { ConverterUtils } from '../../../../utils/index'

const ProjectsPanel = ({
  businesses,
  selectedDepartment,
  onSelectDepartment,
  currentBusiness,
  onSelectBusiness,
  setIsEditable
}) => {
  const dispatch = useDispatch()
  return (
    <DIV
      id="projects_panel"
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
                padding="20px 20px 0px 20px"
                onClick={() => {
                  if (business._id === currentBusiness?._id) {
                    onSelectBusiness('')
                  } else {
                    onSelectBusiness(business)
                  }
                }}>
                <TEXT>{ConverterUtils.truncateString(business.name, 30)}</TEXT>
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
              {business?.businessDepartments?.length && currentBusiness?._id === business?._id
                ? business?.businessDepartments?.map(department => {
                    return (
                      <DIV key={department._id}>
                        <WhiteCard
                          borderColor="transparent"
                          padding="0px 5px 30px 20px"
                          height="30px"
                          row
                          noMargin
                          clickable
                          borderLeft={'transparent'}
                          id={`department_${department?._id}`}
                          onClick={() => {
                            onSelectDepartment(department)
                            dispatch(getBusinessEmployees(selectedDepartment?.businessId, true))
                          }}>
                          <DarkText clickable noMargin hover fontSize="20px">
                            <span style={{ paddingRight: '25px' }}>
                              {selectedDepartment?._id === department._id ? (
                                <>
                                  <DIV position="relative" display="inline-block">
                                    <DIV>
                                      <MenuIcon width="28px" height="28px" color="#2F76FF" />
                                    </DIV>
                                    <DIV
                                      style={{
                                        width: '18px',
                                        height: '17px',
                                        color: '#2F76FF'
                                      }}
                                    />
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
                : ''}
              {business._id === currentBusiness?._id && <Underline />}
            </div>
          )
        })}
    </DIV>
  )
}

export default ProjectsPanel
