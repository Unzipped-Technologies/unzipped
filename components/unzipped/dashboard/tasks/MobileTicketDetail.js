import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Nav from '../../header'
import MobileTaskForm from './MobileTaskForm'
import { getTaskById } from '../../../../redux/actions'
const MobileTaskDetail = ({ getTaskById, detail }) => {
  const router = useRouter()

  const { id } = router.query

  useEffect(() => {
    if (id) getTaskById(id)
  }, [])

  return (
    <>
      <Nav
        isSubMenu
        marginBottom={'85px'}
        isLogoHidden
        listName={'Ai team'}
        setIsViewable={() => {}}
        setListName={() => {}}
        setIsLogoHidden={() => {}}
        onBackArrowClick={() => {
          router.back()
        }}
      />
      <MobileTaskForm
        taskDetail={detail}
        departmentData={detail?.department}
        onCancel={() => {
          router.back()
          getTaskById(id)
        }}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    detail: state.Tasks.selectedTask
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTaskById: bindActionCreators(getTaskById, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileTaskDetail)
