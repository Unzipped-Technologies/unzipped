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
import MobileSearchBar from '../../components/ui/MobileSearchBar';
import MobileFreelancerCard from '../../components/unzipped/dashboard/MobileFreelancerCard';
import MobileFreelancerFooter from '../../components/unzipped/MobileFreelancerFooter';
import MobileSearchFilter from '../../components/unzipped/MobileSearchFilter';

const Container = styled.div`
    display: flex;
    flex-flow: column;
    width: 100%;
    justify-content: center;
    margin-top: 41px;
    @media(max-width: 680px) {
        margin-top:0;
        background-color: #F6F7F9;
    }
`;

const Box = styled.div`
    display: flex;
    width: 80%;
    max-width: 1100px;
    align-self: center;
    min-height: 320px;
    @media(max-width: 680px) {
        display: none;
    }
`;

const MobileDisplayBox = styled.div`
    @media(min-width: 680px) {
        display: none;
    }
`;
const DesktopDisplayBox = styled.div`
@media(max-width: 680px) {
    display: none;
}
`

const Freelancers = ({ freelancerList = [], getFreelancerList, token, clearSelectedFreelancer }) => {
    const [take, setTake] = useState(25)
    const [sort, setSort] = useState('ALL CATEGORIES')
    const [filterOpenClose, setFilterOpenClose] = useState(false)
    const sortOptions = [
        {
            text: 'ALL CATEGORIES',
            onClick: () => setSort('ALL CATEGORIES'),
        },
        {
            text: 'Most Relavent',
            onClick: () => setSort('Most Relavent'),
        },
        {
            text: 'Most reviews',
            onClick: () => setSort('Most reviews'),
        },
        {
            text: 'highest hourly rate',
            onClick: () => setSort('highest hourly rate'),
        },
        {
            text: 'lowest hourly rate',
            onClick: () => setSort('lowest hourly rate'),
        },
        {
            text: 'recomended',
            onClick: () => setSort('recomended'),
        },
    ]
    useEffect(() => {
        getFreelancerList({
            filter: {},
            take,
        }, token.access_token)
    }, [take])
    console.log(sortOptions, "s")
    const handleFilterOpenClose = (value) => {
        setFilterOpenClose(value)
    }
    return (
        <React.Fragment>
            {!filterOpenClose && <Nav isSubMenu />}
            <SearchBar take={take} setTake={setTake} sort={sort} setSort={setSort} sortOptions={sortOptions} />
            {!filterOpenClose && <MobileDisplayBox><MobileSearchBar handleFilterOpenClose={handleFilterOpenClose} /></MobileDisplayBox>}
            <Container>
                {!filterOpenClose ? <MobileDisplayBox>
                    <div className='d-flex align-items-baseline p-2 bg-white' style={{ marginTop: "41px" }}>
                        <b style={{ paddingRight: "20px" }}>Top Results</b>
                        <small>{"1 - 2 of 300 results"}</small>
                    </div>
                    <div style={{ margin: "0 5px", padding: "1px", border: "3px solid #EFF1F4;" }}></div>
                </MobileDisplayBox> :
                    <MobileDisplayBox>
                        <MobileSearchFilter sortOptions={sortOptions} handleFilterOpenClose={handleFilterOpenClose} />
                    </MobileDisplayBox>}
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
                            <>
                                <Box>
                                    <WhiteCard overlayDesktop cardHeightDesktop>
                                        <FreelancerCard user={freelancer} includeRate clearSelectedFreelancer={clearSelectedFreelancer} />
                                    </WhiteCard>
                                </Box>
                                {!filterOpenClose && <MobileDisplayBox>
                                    <MobileFreelancerCard user={freelancer} includeRate clearSelectedFreelancer={clearSelectedFreelancer} />
                                </MobileDisplayBox>}
                            </>
                        )
                    }
                })}
                {freelancerList?.length === 0 && (
                    <Box>
                        <DarkText>0 Freelancers found for this search</DarkText>
                    </Box>
                )}
            </Container>
            <DesktopDisplayBox>
                <Footer />
            </DesktopDisplayBox>
            {!filterOpenClose && <MobileDisplayBox>
                <MobileFreelancerFooter />
            </MobileDisplayBox>}
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