import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import MobileProjectHires from './MobileProjectHires'
import { getContracts } from '../../../../redux/Contract/actions'

const AllProjectHires = ({ getContracts, contracts }) => {
  useEffect(() => {
    getContracts({ businessId: '', freelancerId: '', limit: 'all', page: 1 })
  }, [])

  return (
    <>
      <MobileProjectHires data={contracts} />
    </>
  )
}

const mapStateToProps = state => {
  return {
    contracts: state.Contracts.contracts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getContracts: bindActionCreators(getContracts, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProjectHires)
