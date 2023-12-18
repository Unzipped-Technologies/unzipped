import styled from 'styled-components'
import FreelancerWorks from './../components/unzipped/how-it-works-freelancer/FreelancerWorks'
import Footer from '../components/unzipped/Footer'
import Nav from '../components/unzipped/header'

const Container = styled.div`
  display: flex;
  flex-flow: column;
`
const FreelancerPage = () => {
  return (
    <>
      <Container>
        <Nav />
        <FreelancerWorks />
        <Footer />
      </Container>
    </>
  )
}

export default FreelancerPage
