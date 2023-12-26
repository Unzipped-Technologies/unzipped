import React, { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import IconComponent from '../../ui/icons/IconComponent'
import Link from 'next/link'
import { getBusinessList } from '../../../redux/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { accountTypeEnum } from '../../../server/enum/accountTypeEnum'

const P = styled.p`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '16px')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '')};
  color: ${({ color }) => (color ? color : 'black')};
  background: ${({ background }) => (background ? background : '#fff')};
  padding: ${({ padding }) => (padding ? padding : '')};
  margin: ${({ margin }) => (margin ? margin : '')};
  text-align: ${({ align }) => (align ? align : '')};
  border-bottom: ${({ borderBottom }) => (borderBottom ? borderBottom : '')};
  right: ${({ right }) => (right ? right : '')};
`
const Heading = styled.div`
  gap: 20px;
  display: flex;
  align-items: baseline;
`
{
  /* <img src='/img/heart.png' />
        <IconComponent name='eye' width="20" height="13" viewBox="0 0 20 13" fill="#8EDE64" />
        <IconComponent name='team' width="18" height="15" viewBox="0 0 18 15" fill="#FFC24E" />
        <IconComponent name='team' width="18" height="15" viewBox="0 0 18 15" fill="#000000" /> */
}

function MobileProjects({ _id, token, cookie, businesses = [], getBusinessList, role, loading, access_token }) {
  const access = token?.access_token || cookie

  const [selected, setSelected] = useState(null)

  const [take, setTake] = useState(3)
  const [page, setPage] = useState(1)

  const limitedProjects = useMemo(() => businesses.slice(0, 3), [businesses])

  useEffect(() => {
    if (role === accountTypeEnum.ADMIN) {
      setSelected(accountTypeEnum.FOUNDER)
    }
  }, [])

  useEffect(() => {
    if (selected == 0) {
      getBusinessList(
        {
          take: take,
          skip: (page - 1) * 25
        },
        access,
        selected,
        _id
      )
    } else if (selected == 1) {
      getBusinessList(
        {
          take: take,
          skip: (page - 1) * 25
        },
        access_token,
        selected,
        _id
      )
    }
  }, [selected])

  return (
    <div className="px-4 mb-5 pb-4">
      <div className="d-flex justify-content-between align-items-center">
        <P fontSize="16px" fontWeight="500" color="#000">
          Recent Projects
        </P>
        <Link href={'projects/view'}>
          <P fontSize="12px" fontWeight="500" color="#0057FF">
            VIEW ALL
          </P>
        </Link>
      </div>
      {limitedProjects?.length ? (
        limitedProjects.map((project, index) => {
          return (
            <Heading key={project._id}>
              <IconComponent name="team" width="18" height="15" viewBox="0 0 18 15" fill="#000000" />
              <P>{project?.name}</P>
            </Heading>
          )
        })
      ) : (
        <p style={{ textAlign: 'center' }}>Start a project and you will see it here...</p>
      )}
      <div className="d-flex justify-content-between align-items-center">
        <P fontSize="16px" fontWeight="500" color="#000">
          Lists
        </P>
        <P fontSize="12px" fontWeight="500" color="#0057FF">
          VIEW ALL
        </P>
      </div>
      <Heading>
        <img src="/img/heart.png" height={15} width={20} />
        <P>Favoites</P>
      </Heading>
      <Heading>
        <IconComponent name="eye" width="20" height="13" viewBox="0 0 20 13" fill="#8EDE64" />
        <P>Recently Viewed</P>
      </Heading>
      <Heading>
        <IconComponent name="team" width="18" height="15" viewBox="0 0 18 15" fill="#FFC24E" />
        <P>My Team</P>
      </Heading>
      <div className="d-flex justify-content-between align-items-center">
        <P fontSize="16px" fontWeight="500" color="#000">
          Departments
        </P>
        <P fontSize="12px" fontWeight="500" color="#0057FF">
          VIEW ALL
        </P>
      </div>
      <Heading>
        <img src="/img/heart.png" height={15} width={20} />
        <P>Department one</P>
      </Heading>
      <Heading>
        <IconComponent name="eye" width="20" height="13" viewBox="0 0 20 13" fill="#8EDE64" />
        <P>Department two</P>
      </Heading>
      <Heading>
        <IconComponent name="team" width="18" height="15" viewBox="0 0 18 15" fill="#FFC24E" />
        <P>Department three</P>
      </Heading>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    _id: state.Auth.user._id,
    access_token: state.Auth.token,
    businesses: state.Business?.businesses,
    loading: state.Business?.loading,
    role: state.Auth.user.role,
    cookie: state.Auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBusinessList: bindActionCreators(getBusinessList, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileProjects)
