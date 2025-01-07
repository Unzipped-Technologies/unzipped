import React, { useEffect } from 'react'
import { TitleText, DarkText, WhiteCard, Underline, DIV } from '../style'
import { MdKeyboardArrowDown } from 'react-icons/md'
import MenuIcon from '../../../ui/icons/menu'
import { FaRegCheckCircle } from 'react-icons/fa'
import { getBusinessEmployees, getProjectsList } from '../../../../redux/Business/actions'
import { ConverterUtils } from '../../../../utils'
import { useDispatch, useSelector } from 'react-redux'

const ProjectsPanel = ({
  businesses,
  selectedDepartment,
  onSelectDepartment,
  currentBusiness,
  onSelectBusiness,
  setIsEditable,
  showBusinessMenu,
  setShowBusinessMenu
}) => {
  const dispatch = useDispatch()
  const isMobileView = window.innerWidth <= 680

  const businessState = useSelector(state => state.Business)
  const filteredBusinesses = businesses.filter(business => !business.isArchived)
  
  useEffect(() => {
    if (currentBusiness?.businessDepartments?.[0]?.businessId) {
      dispatch(getBusinessEmployees(currentBusiness.businessDepartments[0].businessId, true))
    }
  }, [businessState.selectedBusiness?.departments])

  return (
    <>
      <DIV
        position="relative"
        border="1px solid #d9d9d9"
        minWidth="400px"
        height="fit-content"
        borderRadius="10px"
        overflow="hidden"
        overFlowX="hidden">
        {filteredBusinesses?.length
          ? filteredBusinesses.map(business => {
              return (
                <div key={business._id} id={`business_${business._id}`}>
                  <DIV
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    padding="20px 0px 0px 0px"
                    onClick={() => {
                      if (business._id === showBusinessMenu || business._id === currentBusiness?._id) {
                        setShowBusinessMenu('')
                        onSelectBusiness('')
                      } else {
                        setShowBusinessMenu(business._id)
                        onSelectBusiness(business)
                        dispatch(getBusinessEmployees(business.businessDepartments?.[0].businessId, true))
                        {
                          !isMobileView && onSelectDepartment(business.businessDepartments?.[0])
                        }
                      }
                    }}>
                    <TitleText paddingLeft clickable>
                      {ConverterUtils.truncateString(business.name, 30)}
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
                  {business?.businessDepartments?.length &&
                  (business._id === currentBusiness?._id || business._id === showBusinessMenu)
                    ? business?.businessDepartments?.map(department => {
                        return (
                          <DIV key={department._id} id={`department_${department._id}`}>
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
                                  dispatch(getBusinessEmployees(selectedDepartment?.businessId, true))
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
                                {ConverterUtils.truncateString(department.name, 20)}
                              </DarkText>
                            </WhiteCard>
                          </DIV>
                        )
                      })
                    : ''}
                  {(business._id === currentBusiness?._id || business._id === showBusinessMenu) && <Underline />}
                </div>
              )
            })
          : ''}
      </DIV>
    </>
  )
}

export default ProjectsPanel
