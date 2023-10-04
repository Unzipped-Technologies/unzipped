import React, { useState, useEffect } from 'react';
import Nav from '../../components/unzipped/header';
import SearchBar from '../../components/ui/SearchBar'
import FreelancerCard from '../../components/unzipped/dashboard/FreelancerCard'
import Footer from '../../components/unzipped/Footer'
import {
    DarkText,
    WhiteCard
} from '../../components/unzipped/dashboard/style'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getFreelancerList, clearSelectedFreelancer, getFreelancerSkillsList } from '../../redux/actions';
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
    @media(max-width: 680px) {
        background-color: #F6F7F9;
        margin-bottom: 48px;
    }
`;

const Box = styled.div`
    display: flex;
    width: 80%;
    max-width: 1100px;
    align-self: center;
    @media(max-width: 680px) {
        display: none;
    }
`;

const MobileDisplayBox = styled.div`
    position: relative;
    @media(min-width: 680px) {
        display: none;
    }
`;
const DesktopDisplayBox = styled.div`
@media(max-width: 680px) {
    display: none;
}
`
const Freelancers = ({ freelancerList = [], getFreelancerList, token, totalCount, clearSelectedFreelancer, getFreelancerSkillsList, freelancerSkillsList = [] }) => {
    const [take, setTake] = useState(15)
    const [skip] = useState(0);
    const [filter, setFilter] = useState('')
    const [sort, setSort] = useState('ALL CATEGORIES')
    const [minRate, setMinRate] = useState();
    const [maxRate, setMaxRate] = useState();
    const [skill, setSkill] = useState([])
    const [filterOpenClose, setFilterOpenClose] = useState(false);
    const sortOptions = [
        {
            text: 'All Categories',
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
        getFreelancerSkillsList();
        if (!filterOpenClose) {
            getFreelancerList({
                filter,
                take,
                skip,
                sort,
                minRate,
                maxRate,
                skill,
            }, token.access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJVbnppcHBlZCIsInN1YiI6IjYzOTY0MDhhNjNiMTQzMzk2MGEzOTgyMSIsImlhdCI6MTY5NDc5MTE4MCwiZXhwIjo0Mjg2NzkxMTgwfQ.26w-FzvkymHELA1re6Q5SgdqiumCpAsHfOR5d2JfiBQ')
        }
    }, [take, sort, filter])
    const handleFilterOpenClose = (value) => {
        setFilterOpenClose(value)
    }
    const handleSearch = () => {
        getFreelancerList({
            filter,
            take,
            skip,
            sort,
            minRate,
            maxRate,
            skill,
        }, token.access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJVbnppcHBlZCIsInN1YiI6IjYzOTY0MDhhNjNiMTQzMzk2MGEzOTgyMSIsImlhdCI6MTY5NDc5MTE4MCwiZXhwIjo0Mjg2NzkxMTgwfQ.26w-FzvkymHELA1re6Q5SgdqiumCpAsHfOR5d2JfiBQ')

    }
    return (
        <React.Fragment>
            {!filterOpenClose && <Nav isSubMenu />}
            <SearchBar handleSearch={handleSearch} filter={filter} setFilter={setFilter} take={take} setTake={setTake} sort={sort} setSort={setSort} sortOptions={sortOptions} />
            {!filterOpenClose && <MobileDisplayBox><MobileSearchBar handleSearch={handleSearch} filter={filter} setFilter={setFilter} handleFilterOpenClose={handleFilterOpenClose} /></MobileDisplayBox>}
            <Container>
                {!filterOpenClose ? <MobileDisplayBox>
                    <div className='d-flex align-items-baseline p-2 bg-white' style={{ marginTop: "130px" }}>
                        <b style={{ paddingRight: "20px" }}>Top Results</b>

                        <small>
                            {freelancerList?.length === 0 ? `0 results` :
                                freelancerList?.length === 1 ? `1 results` :
                                    skip === 0
                                        ? `1 - ${freelancerList?.length} ${totalCount > take ? `of ${totalCount} results` : `results`}`
                                        : `${(+skip * +take) + 1} - ${Math.min(
                                            (+skip * +take) + +take,
                                            totalCount
                                        )} ${totalCount > (+take * +skip) ? `of ${totalCount} results` : `results`}  `}
                        </small>

                    </div>
                    <div style={{ margin: "0 5px", border: "2px solid #EFF1F4" }}></div>
                </MobileDisplayBox> :
                    <MobileDisplayBox>
                        <MobileSearchFilter maxRate={maxRate} setMaxRate={setMaxRate} setMinRate={setMinRate} minRate={minRate} sort={sort} setSort={setSort} sortOptions={sortOptions} handleFilterOpenClose={handleFilterOpenClose} handleSearch={handleSearch} freelancerSkillsList={freelancerSkillsList} skill={skill} setSkill={setSkill} />
                    </MobileDisplayBox>}
                {freelancerList?.map(user => {
                    const freelancer = {
                        id: user._id,
                        name: `${user?.user?.FirstName} ${user?.user?.LastName}`,
                        type: user.category,
                        isPreferedFreelancer: user?.isPreferedFreelancer,
                        country: user?.user?.AddressLineCountry || 'United States',
                        skills: user?.user?.freelancerSkills?.map(e => e.skill) || [],
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
        freelancerList: state.Freelancers?.freelancers,
        freelancerSkillsList: state.FreelancerSkills?.freelancerSkills,
        totalCount: state.Freelancers?.totalCount[0]?.count
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFreelancerList: bindActionCreators(getFreelancerList, dispatch),
        clearSelectedFreelancer: bindActionCreators(clearSelectedFreelancer, dispatch),
        getFreelancerSkillsList: bindActionCreators(getFreelancerSkillsList, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Freelancers);