import React, {useState} from 'react'
import styled from 'styled-components'
import OptionTileGroup from '../components/ui/OptionTileGroup'
import CreateABusiness from '../components/unzipped/CreateABusiness'
import FormField from '../components/ui/FormField'
import {
    BlackCard,
    WhiteText,
    TitleText,
    DarkText,
    Absolute,
    WhiteCard,
    SelectCard,
    Dismiss, 
    Grid,
} from '../components/unzipped/dashboard/style'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { updateBusinessForm } from '../redux/actions';
import router from 'next/router'


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #D9D9D9;
    height: 100vh;
    width: 100vw;
`;

const CardContainer = styled.div`
    display: flex;
    width: 952px;
    height: 611px;
`;



const CreateBusiness = ({
    stage, 
    updateBusinessForm, 
    isFirstBusiness, 
    incomePlatform, 
    isExistingAudience, 
    socialMediaPlatforms = [], 
    numberOfSocialFollowing,
    businessNiche,
    name,
}) => {
    const [businessName, setBusinessName] = useState(name)
    const submitForm = (step) => {
        // submit form
        // if step is true then go forward 1 step
        updateBusinessForm({
            stage: step ? step + 1 : stage
        })
        if (step === 'dashboard') {
            router.push('/dashboard')
        }
    }

    const updateForm = (data) => {
        // update form
        updateBusinessForm({
            ...data
        })
    }

    const goBack = (step) => {
        // update form step 
        // if on 1st page go back to dashboard
        if (stage > 1) {
            updateBusinessForm({
                stage: (step || stage) - 1
            })
        } else {
            router.push('/dashboard')
        }

    }
    const GetCard = ({stage}) => {
        switch (stage) {
            case 1:
                return (
                    <CreateABusiness 
                    title={`Let’s get started. Which of these best describes this business?`}
                    sub={`We’ll help you get started based on your business needs.`}
                    onUpdate={updateForm}
                    onBack={goBack}
                    onSubmit={submitForm}
                    progress={stage * 10}
                    stage={stage}
                >
                    <Grid>
                        <OptionTileGroup
                            selectedValue={isFirstBusiness}
                            type="radio"
                            tileList={[
                                {
                                    label: `I'M JUST STARTING`,
                                    iconName: 'profileNew',
                                    value: 'true',
                                },
                                {
                                    label: `I already have a business`,
                                    iconName: 'desktop',
                                    value: 'false',
                                },
                            ]}
                            onChange={e => updateForm({ isFirstBusiness: e.target.value})}
                            stage={stage}
                        /> 
                    </Grid>
                </CreateABusiness>
                );
            case 2:
                return (
                    <CreateABusiness 
                    title="Let’s get started. Which of these best describes this business?"
                    sub="We’ll help you get started based on your business needs."
                    onBack={goBack}
                    onSubmit={submitForm}
                    noMargin
                    progress={stage * 10}
                    stage={stage}
                >
                    <Grid margin="10px 0px">
                        <OptionTileGroup
                            selectedValue={[...incomePlatform]}
                            type="check"
                            tileList={[
                                {
                                    label: `An online store`,
                                    sub: `Build a fully customizable website`,
                                    iconName: 'profileNew',
                                    value: 'An online store',
                                },
                                {
                                    label: `An existing website or blog`,
                                    sub: `Add a Buy Button to your website`,
                                    iconName: 'desktop',
                                    value: `An existing website or blog`,
                                },
                            ]}
                            margin="5px 0px"
                            onChange={e => updateForm({ incomePlatform: incomePlatform.find(i => i === e.target.value) ? incomePlatform.filter(i => i !== e.target.value) : [...incomePlatform ,e.target.value]})}
                            stage={stage}
                        /> 
                        <OptionTileGroup
                            selectedValue={[...incomePlatform]}
                            type="check"
                            tileList={[
                                {
                                    label: `Social Media`,
                                    sub: `Reach customers through Facebook, TikTok and more`,
                                    iconName: 'profileNew',
                                    value: 'Social Media',
                                },
                                {
                                    label: `Online marketplaces`,
                                    sub: `List products on google, Amazon, and more`,
                                    iconName: 'desktop',
                                    value: `Online marketplaces`,
                                },
                            ]}
                            margin="5px 0px"
                            onChange={e => {
                                updateForm({ incomePlatform: incomePlatform.find(i => i === e.target.value) ? incomePlatform.filter(i => i !== e.target.value) : [...incomePlatform ,e.target.value]})}
                            }
                            stage={stage}
                        /> 
                        <OptionTileGroup
                            selectedValue={incomePlatform}
                            type="check"
                            tileList={[
                                {
                                    label: `In person`,
                                    sub: `Pick as many as you like – you can always change these later.`,
                                    iconName: 'profileNew',
                                    value: 'In person',
                                },
                                {
                                    label: `I’m not sure`,
                                    sub: '',
                                    iconName: 'desktop',
                                    value: `I’m not sure`,
                                },
                            ]}
                            margin="5px 0px"
                            onChange={e => updateForm({ incomePlatform: incomePlatform.find(i => i === e.target.value) ? incomePlatform.filter(i => i !== e.target.value) : [...incomePlatform ,e.target.value]})}
                            stage={stage}
                        /> 
                    </Grid>
                </CreateABusiness>
                );
                case 3:
                    return (
                        <CreateABusiness 
                        title="Do you have an online audience or following?"
                        sub="If you’re engaging with an audience on online platforms like YouTube, Instagram, Twitter, Substack, Patreon,
                        or elsewhere, we can set you up to sell to them."
                        onUpdate={updateForm}
                        onBack={goBack}
                        onSubmit={submitForm}
                        progress={stage * 10}
                        stage={isExistingAudience !== "true" ? stage + 2 : stage}
                    >
                        <Grid>
                            <OptionTileGroup
                                selectedValue={isExistingAudience}
                                type="radio"
                                tileList={[
                                    {
                                        label: `YES`,
                                        iconName: 'profileNew',
                                        value: 'true',
                                    },
                                    {
                                        label: `NO`,
                                        iconName: 'desktop',
                                        value: 'false',
                                    },
                                ]}
                                onChange={e => updateForm({ isExistingAudience: e.target.value})}
                                stage={stage}
                            /> 
                        </Grid>
                    </CreateABusiness>
                    );
                case 4:
                    return (
                        <CreateABusiness 
                        title="Where is your existing audience?"
                        sub="Choose all online platforms that apply."
                        onUpdate={updateForm}
                        onBack={() => goBack()}
                        onSubmit={submitForm}
                        progress={stage * 10}
                        stage={stage}
                    >
                        <Grid margin="10px 0px">
                            <OptionTileGroup
                                selectedValue={socialMediaPlatforms}
                                type="check"
                                tileList={[
                                    {
                                        label: `FACEBOOK`,
                                        sub: `Pick as many as you like – you can always change these later.`,
                                        iconName: 'profileNew',
                                        value: 'FACEBOOK',
                                    },
                                    {
                                        label: `YOUTUBE`,
                                        sub: '',
                                        iconName: 'desktop',
                                        value: `YOUTUBE`,
                                    },
                                    {
                                        label: `INSTAGRAM`,
                                        sub: '',
                                        iconName: 'desktop',
                                        value: `INSTAGRAM`,
                                    },
                                ]}
                                margin="5px 0px"
                                onChange={e => updateForm({ socialMediaPlatforms: socialMediaPlatforms.find(i => i === e.target.value) ? socialMediaPlatforms.filter(i => i !== e.target.value) : [...socialMediaPlatforms ,e.target.value]})}
                                stage={stage}
                            /> 
                            <OptionTileGroup
                                selectedValue={socialMediaPlatforms}
                                type="check"
                                tileList={[
                                    {
                                        label: `TIKTOK`,
                                        sub: `Pick as many as you like – you can always change these later.`,
                                        iconName: 'profileNew',
                                        value: 'TIKTOK',
                                    },
                                    {
                                        label: `SNAPCHAT`,
                                        sub: '',
                                        iconName: 'desktop',
                                        value: `SNAPCHAT`,
                                    },
                                    {
                                        label: `PINTEREST`,
                                        sub: '',
                                        iconName: 'desktop',
                                        value: `PINTEREST`,
                                    },
                                ]}
                                margin="5px 0px"
                                onChange={e => updateForm({ socialMediaPlatforms: socialMediaPlatforms.find(i => i === e.target.value) ? socialMediaPlatforms.filter(i => i !== e.target.value) : [...socialMediaPlatforms ,e.target.value]})}
                                stage={stage}
                            /> 
                            <OptionTileGroup
                                selectedValue={socialMediaPlatforms}
                                type="check"
                                tileList={[
                                    {
                                        label: `TWITTER`,
                                        sub: `Pick as many as you like – you can always change these later.`,
                                        iconName: 'profileNew',
                                        value: 'TWITTER',
                                    },
                                    {
                                        label: `LINKEDIN`,
                                        sub: '',
                                        iconName: 'desktop',
                                        value: `LINKEDIN`,
                                    },
                                    {
                                        label: `EMAIL LIST`,
                                        sub: '',
                                        iconName: 'desktop',
                                        value: `EMAIL LIST`,
                                    },
                                ]}
                                margin="5px 0px"
                                onChange={e => updateForm({ socialMediaPlatforms: socialMediaPlatforms.find(i => i === e.target.value) ? socialMediaPlatforms.filter(i => i !== e.target.value) : [...socialMediaPlatforms ,e.target.value]})}
                                stage={stage}
                            /> 
                        </Grid>
                    </CreateABusiness>
                    );
                case 5:
                    return (
                        <CreateABusiness 
                        title="Let’s get started. Which of these best describes your business?"
                        sub="We’ll help you get started based on your business needs."
                        onUpdate={updateForm}
                        onBack={goBack}
                        onSubmit={submitForm}
                        progress={stage * 10}
                        stage={stage}
                    >
                        <Grid margin="10px 0px">
                            <OptionTileGroup
                                selectedValue={numberOfSocialFollowing}
                                type="radio"
                                margin="5px"
                                tileList={[
                                    {
                                        label: `1-1,000`,
                                        iconName: 'profileNew',
                                        value: '1-1,000',
                                    },
                                    {
                                        label: `1,001-10,000`,
                                        iconName: 'desktop',
                                        value: '1,001-10,000',
                                    },
                                ]}
                                onChange={e => updateForm({ numberOfSocialFollowing: e.target.value})}
                                stage={stage}
                            /> 
                            <OptionTileGroup
                                selectedValue={numberOfSocialFollowing}
                                type="radio"
                                margin="5px"
                                tileList={[
                                    {
                                        label: `10,001-100,000`,
                                        iconName: 'profileNew',
                                        value: '10,001-100,000',
                                    },
                                    {
                                        label: `100,001-1 MILLION`,
                                        iconName: 'desktop',
                                        value: '100,001-1 MILLION',
                                    },
                                ]}
                                onChange={e => updateForm({ numberOfSocialFollowing: e.target.value})}
                                stage={stage}
                            /> 
                            <OptionTileGroup
                                selectedValue={numberOfSocialFollowing}
                                type="radio"
                                margin="5px"
                                tileList={[
                                    {
                                        label: `1 MILLION OR MORE`,
                                        iconName: 'profileNew',
                                        value: '1 MILLION OR MORE',
                                    },
                                    {
                                        label: `I'M NOT SURE`,
                                        iconName: 'desktop',
                                        value: `I'M NOT SURE`,
                                    },
                                ]}
                                onChange={e => updateForm({ numberOfSocialFollowing: e.target.value})}
                                stage={stage}
                            /> 
                        </Grid>
                    </CreateABusiness>
                    );
                case 6:
                    return (
                        <CreateABusiness 
                        title="Which of the following best describes your content niche or field?"
                        sub="Choose all that apply, and we’ll use this information to identify features to tailor your experience to your niche."
                        onUpdate={updateForm}
                        onBack={() => goBack(isExistingAudience !== "true" ? stage - 2 : stage)}
                        onSubmit={submitForm}
                        progress={stage * 10}
                        stage={stage}
                    >
                        <Grid margin="10px 0px">
                            <OptionTileGroup
                                selectedValue={businessNiche}
                                type="radio"
                                tileList={[
                                    {
                                        label: `BEAUTY`,
                                        sub: `Pick as many as you like – you can always change these later.`,
                                        iconName: 'profileNew',
                                        value: 'BEAUTY',
                                    },
                                    {
                                        label: `FASHION`,
                                        sub: '',
                                        iconName: 'desktop',
                                        value: `FASHION`,
                                    },
                                    {
                                        label: `HOME`,
                                        sub: '',
                                        iconName: 'desktop',
                                        value: `HOME`,
                                    },
                                ]}
                                margin="5px 0px"
                                onChange={e => updateForm({ businessNiche: e.target.value })}
                                stage={stage}
                            /> 
                            <OptionTileGroup
                                selectedValue={businessNiche}
                                type="radio"
                                tileList={[
                                    {
                                        label: `ANIMALS & PETS`,
                                        sub: `Pick as many as you like – you can always change these later.`,
                                        iconName: 'profileNew',
                                        value: 'ANIMALS & PETS',
                                    },
                                    {
                                        label: `ARTS & ENTETAINMENT`,
                                        sub: '',
                                        iconName: 'desktop',
                                        value: `ARTS & ENTETAINMENT`,
                                    },
                                    {
                                        label: `CAREER & ENTREPRENEURSHIP`,
                                        sub: '',
                                        iconName: 'desktop',
                                        value: `CAREER & ENTREPRENEURSHIP`,
                                    },
                                ]}
                                margin="5px 0px"
                                onChange={e => updateForm({ businessNiche: e.target.value })}
                                stage={stage}
                            /> 
                            <OptionTileGroup
                                selectedValue={businessNiche}
                                type="radio"
                                tileList={[
                                    {
                                        label: `CRAFTS & DIY`,
                                        sub: `Pick as many as you like – you can always change these later.`,
                                        iconName: 'profileNew',
                                        value: 'CRAFTS & DIY',
                                    },
                                    {
                                        label: `ELECTRONICS`,
                                        sub: '',
                                        iconName: 'desktop',
                                        value: `ELECTRONICS`,
                                    },
                                    {
                                        label: `FINANCE`,
                                        sub: '',
                                        iconName: 'desktop',
                                        value: `FINANCE`,
                                    },
                                ]}
                                margin="5px 0px"
                                onChange={e => updateForm({ businessNiche: e.target.value })}
                                stage={stage}
                            /> 
                        </Grid>
                    </CreateABusiness>
                    );
                case 7:
                    return (
                        <CreateABusiness 
                        title="What would you like to name your business?"
                        sub="You can skip this for now if you’re still working on it."
                        onUpdate={updateForm}
                        onBack={goBack}
                        onSubmit={submitForm}
                        progress={stage * 10}
                        stage={isExistingAudience !== "true" ? stage + 2 : stage}
                    >
                        <Grid>
                            <FormField 
                                fieldType="input"
                                fontSize='20px'
                                width="80%"
                                onChange={e => setBusinessName(e.target.value)}
                                onBlur={e => updateForm({ name: businessName })}
                                value={businessName}
                            >
                                Business Name (you can change this later)
                            </FormField>
                        </Grid>
                    </CreateABusiness>
                    );
            default:
                return <></>;
        }
    }

    return (
        <Container>
            <GetCard stage={stage}/>
        </Container>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        name: state.Business?.businessForm.name,
        isFirstBusiness: state.Business?.businessForm.isFirstBusiness,
        budget: state.Business?.businessForm.budget,
        isExistingAudience: state.Business?.businessForm.isExistingAudience,
        isEquity: state.Business?.businessForm.isEquity,
        equity: state.Business?.businessForm.equity,
        deadline: state.Business?.businessForm.deadline,
        incomePlatform: state.Business?.businessForm.incomePlatform,
        numberOfSocialFollowing: state.Business?.businessForm.numberOfSocialFollowing,
        socialMediaPlatforms: state.Business?.businessForm.socialMediaPlatforms,
        businessNiche: state.Business?.businessForm.businessNiche,
        businessAddressLineOne: state.Business?.businessForm.businessAddressLineOne,
        businessAddressLineTwo: state.Business?.businessForm.businessAddressLineTwo,
        businessCountry: state.Business?.businessForm.businessCountry,
        businessCity: state.Business?.businessForm.businessCity,
        businessState: state.Business?.businessForm.businessState,
        businessZip: state.Business?.businessForm.businessZip,
        description: state.Business?.businessForm.description,
        businessImage: state.Business?.businessForm.businessImage,
        stage: state.Business?.businessForm.stage,
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        updateBusinessForm: bindActionCreators(updateBusinessForm, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBusiness);