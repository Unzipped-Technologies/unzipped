import React from 'react'
import Icon from './ui/Icon'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import styled from 'styled-components'

const Logo = styled.div`
  margin: 25px 20px 10px 20px;
`

const useStyles = makeStyles(theme => ({
  root: {
    width: '70%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    },
    marginTop: '10px'
  }
}))

const Loading = () => {
  const classes = useStyles()

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        zIndex: '100000',
        display: 'grid',
        justifyItems: 'center',
        top: '35%'
      }}>
      <div className="vohnt-load-box">
        <Logo>
          <Icon name="logo" />
        </Logo>
        <p style={{ margin: '15px' }}>
          Connect. Build. <span className="enjoy">grow </span>.
        </p>
        <div className={classes.root}>
          <LinearProgress />
        </div>
      </div>
    </div>
  )
}

export default Loading
