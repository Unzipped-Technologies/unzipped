import React, { useState, useEffect } from 'react';
import Nav from '../../components/unzipped/header';
import SearchBar from '../../components/ui/SearchBar'
import FreelancerCard from '../../components/unzipped/dashboard/FreelancerCard'
import Footer from '../../components/unzipped/Footer'
import {
    TitleText,
    DarkText,
    WhiteCard
} from '../../components/unzipped/dashboard/style'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getFreelancerList, clearSelectedFreelancer } from '../../redux/actions';
import { parseCookies } from "../../services/cookieHelper";

const Container = styled.div`
    display: flex;
    flex-flow: column;
    width: 100%;
    justify-content: center;
    margin-top: 40px;
`;

const Box = styled.div`
    display: flex;
    width: 80%;
    max-width: 1100px;
    align-self: center;
    min-height: 320px;
`;

const Freelancers = ({freelancerList = [], getFreelancerList, token, clearSelectedFreelancer}) => {
    const [take, setTake] = useState(25)
    const [sort, setSort] = useState('All')
    const sortOptions = [
        {
            text: 'All',
            onClick: () => setSort('All'),
        },
        {
            text: 'Salary',
            onClick: () => setSort('Salary'),
        },
        {
            text: 'Upvotes',
            onClick: () => setSort('Upvotes'),
        },
        {
            text: 'Category',
            onClick: () => setSort('Category'),
        },
        {
            text: 'Skils',
            onClick: () => setSort('Skils'),
        },
    ]
    useEffect(() => {
        getFreelancerList({
            filter: { },
            take,
        }, token.access_token)
    }, [take])

    return (
        <React.Fragment>
                <Nav isSubMenu/>
                <SearchBar title="Freelancers" take={take} setTake={setTake} sort={sort} setSort={setSort} sortOptions={sortOptions}/>
            <Container>
                {freelancerList.map(user => {
                    const freelancer = {
                        id: user._id,
                        name: `${user?.user?.FirstName} ${user?.user?.LastName}`,
                        type: user.category,
                        country: user?.user?.AddressLineCountry || 'United States',
                        skills: user?.user?.freelancerSkills?.map(e => e.skill),
                        cover: user?.cover || `I have been a ${user?.category || 'developer'} for over ${user?.user?.freelancerSkills && user?.user?.freelancerSkills[0]?.yearsExperience || 1} years. schedule a meeting to check if I'm a good fit for your business.`,
                        profilePic: user?.user?.profileImage || 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',
                        rate: user?.rate,
                        likes: user?.likeTotal
                    }
                    if (user?.user?.FirstName) {
                        return (
                            <Box>
                                <WhiteCard height="270px">
                                    <FreelancerCard user={freelancer} includeRate clearSelectedFreelancer={clearSelectedFreelancer}/>
                                </WhiteCard>
                            </Box>
                        )
                    }
                })}
                {freelancerList?.length === 0 && (
                    <Box>
                        <DarkText>0 Freelancers found for this search</DarkText>
                    </Box>
                )}
            </Container>
            <Footer />
        </React.Fragment>
    )
}

Freelancers.getInitialProps = async ({ req, res }) => {
    const token = parseCookies(req)
    
      return {
        token: token && token,
      }
    }

const mapStateToProps = (state) => {
    return {
        freelancerList: state.Freelancers?.freelancers
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        getFreelancerList: bindActionCreators(getFreelancerList, dispatch),
        clearSelectedFreelancer: bindActionCreators(clearSelectedFreelancer, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Freelancers);