import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { clearErrors, loadUser } from '../redux/actions'

const  Role = ({ role }) => {
    if (role == 0) {
        return 'FOUNDER'
    }
    else if (role == 1) {
        return 'INVESTOR'
    }
    else if (role == 2) {
        return 'ADMIN'
    }
}

const mapStateToProps = state => {
    return {
        role: state.Auth.user.role
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUser: bindActionCreators(loadUser, dispatch),
        clearErrors: bindActionCreators(clearErrors, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Role)