import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { connect, useDispatch, useSelector } from 'react-redux'

import Nav from '../../../components/unzipped/header'
import { parseCookies } from '../../../services/cookieHelper'
import { getUserLists } from '../../../redux/ListEntries/action'
import ListPanel from '../../../components/unzipped/dashboard/ListPanel'
import MobileProjects from '../../../components/unzipped/dashboard/MobileProjects'
import MobileFreelancerFooter from '../../../components/unzipped/MobileFreelancerFooter'

const Dashboard = ({ business = 'Lists', token, cookie }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const access = token?.access_token || cookie

  const userState = useSelector(state => state.Auth.user)
  const userListItems = useSelector(state => state.ListEntries?.userLists)

  const [listName, setListName] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [isViewable, setIsViewable] = useState(false)
  const [isLogoHidden, setIsLogoHidden] = useState(false)
  const [isListViewable, setIsListViewable] = useState(false)
  const [listInfo, setListInfo] = useState({ lsitId: null, listTitle: null, listIcon: null })

  useEffect(() => {
    dispatch(getUserLists(userState._id))
  }, [userState])

  useEffect(() => {
    !access && router.push('/login')
  }, [])

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const [windowSize, setWindowsize] = useState('160px')

  const handleResize = () => {
    let windowSize = window.innerWidth <= 680 ? '85px' : '160px'
    setWindowsize(windowSize)
    if (window.innerWidth > 680) {
      setIsListViewable(false)
      setIsExpanded(false)
      setIsViewable(false)
      setIsLogoHidden(false)
    }
  }

  return (
    <React.Fragment>
      <Nav
        isSubMenu
        marginBottom={windowSize}
        isLogoHidden={isLogoHidden}
        setIsViewable={setIsViewable}
        listName={listName}
        setListName={setListName}
        setIsLogoHidden={setIsLogoHidden}
        isListViewable={isListViewable}
        setIsListViewable={setIsListViewable}
        isExpanded={isExpanded}
        isViewable={isViewable}
        setIsExpanded={setIsExpanded}
      />
      <ListPanel business={business} type="list" userListItems={userListItems} />

      {/* Default List View for Mobile Device */}
      {!isViewable && (
        <>
          <MobileFreelancerFooter defaultSelected="Projects" />
          <MobileProjects
            userListItems={userListItems}
            setIsViewable={setIsViewable}
            setListName={setListName}
            setIsLogoHidden={setIsLogoHidden}
            setIsListViewable={setIsListViewable}
            isListViewable={isListViewable}
            setIsExpanded={setIsExpanded}
            setListInfo={setListInfo}
          />
        </>
      )}
    </React.Fragment>
  )
}

Dashboard.getInitialProps = async ({ req, res }) => {
  const token = parseCookies(req)

  return {
    token: token && token
  }
}

const mapStateToProps = state => {
  return {
    cookie: state.Auth.token,
    user: state.Auth.user
  }
}
const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
