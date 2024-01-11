import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import Nav from '../../../../../components/unzipped/header'
import Invoice from '../../../../../components/unzipped/dashboard/project/invoice'
import { useRouter } from 'next/router'
import { getBusinessTasksByFounder, getBusinessList } from '../../../../../redux/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MobileInvoices from '../../../../../components/unzipped/dashboard/mobile/MobileInvoices'
import { accountTypeEnum } from '../../../../../server/enum/accountTypeEnum'

const Desktop = styled.div`
  @media (max-width: 680px) {
    display: none;
  }
`
const MobileDisplayBox = styled.div`
  margin-top: -40px;
  @media (min-width: 680px) {
    display: none;
  }
`

const Navbar = styled.div`
  margin-bottom: 160px;
  @media (max-width: 680px) {
    margin-bottom: 0px !important;
    margin-top: 0px !important;
    padding-bottom: 0px !important;
    padding-top: 0px !important;
  }
`

const FounderInvoice = ({
  projectName,
  invoiceTaskHours,
  access_token,
  getBusinessTasksByFounder,
  role,
  businesses,
  _id
}) => {
  const router = useRouter()
  const { id } = router.query

  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [sortedData, setSortedData] = useState({})
  const [selectedWeek, setSelectedWeek] = useState(null)
  const [weekOptions, setWeekOptions] = useState([])
  const [take, setTake] = useState(25)
  const [searchFilter, setSearchFilter] = useState('')
  const [selected, setSelected] = useState(null)

  useMemo(() => {
    if (id !== undefined) {
      getBusinessTasksByFounder({ businessId: id, access_token })
    }
  }, [id])

  useEffect(() => {
    console.log('role', role)
    if (role === accountTypeEnum.ADMIN) {
      setSelected(accountTypeEnum.FOUNDER)
    }
  }, [])

  useEffect(() => {
    getBusinessList(
      {
        take: 10000,
        skip: 0
      },
      access_token,
      selected,
      _id
    )
  }, [])

  useEffect(() => {
    setData(invoiceTaskHours)
  }, [invoiceTaskHours])

  useEffect(() => {
    const options = []
    const currentDate = new Date()
    for (let i = 10; i >= 0; i--) {
      const startOfWeek = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay() - i * 7
      )
      startOfWeek.setHours(0, 0, 0, 0)
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(endOfWeek.getDate() + 6)
      endOfWeek.setHours(23, 59, 59, 999)
      options.unshift({ startOfWeek, endOfWeek })
    }
    setWeekOptions(options)
    setSelectedWeek(0)
  }, [])

  useEffect(() => {
    if (selectedWeek !== null && selectedWeek !== undefined) {
      const filteredItems = data.filter(item => {
        const itemDate = new Date(item.updatedAt)
        const startOfWeek = weekOptions[selectedWeek].startOfWeek
        const endOfWeek = weekOptions[selectedWeek].endOfWeek
        return itemDate >= startOfWeek && itemDate <= endOfWeek
      })
      setFilteredData(filteredItems)
    }
  }, [selectedWeek, data, weekOptions])

  useEffect(() => {
    if (selectedWeek !== null && selectedWeek !== undefined && filteredData !== null) {
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const organizedItems = Object.fromEntries(daysOfWeek.map(day => [day, []]))
      filteredData.forEach(item => {
        const itemDate = new Date(item.updatedAt)
        const dayOfWeek = daysOfWeek[itemDate.getDay()]
        organizedItems[dayOfWeek].push(item)
      })
      setSortedData(organizedItems)
    }
  }, [selectedWeek, filteredData])

  const handleWeekChange = event => {
    const selectedIndex = event.target.value
    setSelectedWeek(selectedIndex)
  }

  const handletake = value => {
    setTake(value)
  }

  const handleFilter = value => {
    setSearchFilter(value)
  }
  return (
    <>
      <Navbar>
        <Nav isSubMenu />
      </Navbar>
      <Desktop>
        <Invoice
          weekOptions={weekOptions}
          handleWeekChange={handleWeekChange}
          sortedData={sortedData}
          projectName={projectName}
          handletake={handletake}
          take={take}
          handleFilter={handleFilter}
          userType={'Founder'}
        />
      </Desktop>
      <MobileDisplayBox>
        <MobileInvoices
          data={data}
          businesses={businesses}
          weekOptions={weekOptions}
          handleWeekChange={handleWeekChange}
          sortedData={sortedData}
          projectName={projectName}
          handletake={handletake}
          take={take}
          handleFilter={handleFilter}
          userType={'Founder'}
        />
      </MobileDisplayBox>
    </>
  )
}

const mapStateToProps = state => {
  return {
    access_token: state.Auth.token,
    invoiceTaskHours: state.Business.invoiceTaskHours,
    projectName: state.Business.projectName,
    businesses: state.Business?.businesses,
    role: state.Auth.user.role,
    _id: state.Auth.user._id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBusinessTasksByFounder: bindActionCreators(getBusinessTasksByFounder, dispatch),
    getBusinessList: bindActionCreators(getBusinessList, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FounderInvoice)
