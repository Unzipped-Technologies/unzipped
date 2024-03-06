import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Nav from '../../header'
import MobileTaskForm from './MobileTaskForm'
import { getTaskById, resetStoryForm } from '../../../../redux/actions'
const MobileTaskDetail = ({ getTaskById, detail, resetStoryForm }) => {
  const router = useRouter()

  const { id } = router.query

  useEffect(() => {
    getTaskById(id)
  }, [])

  const onCancel = async () => {
    router.back()
    await resetStoryForm()
  }

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
      <MobileTaskForm taskDetail={detail} departmentData={detail?.department} onCancel={onCancel} />
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
    getTaskById: bindActionCreators(getTaskById, dispatch),
    resetStoryForm: bindActionCreators(resetStoryForm, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileTaskDetail)
