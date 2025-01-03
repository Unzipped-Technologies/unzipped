import React, { useState, useEffect } from 'react'
import { Dialog } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import ProgressBar from '../ui/ProgressBar'
import Button from '../ui/Button'
import { FormField } from '../ui'

import { TitleText } from './dashboard/style'
import CircularProgress from '@material-ui/core/CircularProgress'
import { updateFreelancerSkills, deleteFreelancerSkill } from '../../redux/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Image from '../ui/Image'
import Loading from '../loading'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@mui/material/TextField'
import { useRouter } from 'next/router'
import Autocomplete from '@mui/material/Autocomplete'
import { RECENT_SKILLS } from '../../utils/constants'
import Badge from '../ui/Badge'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const MUIDialog = withStyles(theme => ({
  paper: {
    width: '600px',
    height: '611px !important',
    borderRadius: '25px',
    margin: '0px !important',
    padding: '0px !important'
  },
  root: {}
}))(Dialog)

const DialogContent = withStyles(theme => ({
  root: {
    display: 'flex !important',
    flexDirection: 'column !important',
    padding: theme.spacing(2),
    border: '0px !important',

    marginLeft: window.innerWidth > 680 ? '20px !important' : '0px !important',
    marginRight: window.innerWidth > 680 ? '20px !important' : '0px !important'
  }
}))(MuiDialogContent)

const MUIDialogActions = withStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginLeft: window.innerWidth > 680 ? '20px !important' : '0px !important',
    marginRight: window.innerWidth > 680 ? '20px !important' : '0px !important',
    marginBottom: '45px',
    gap: '5px'
  }
}))(DialogActions)

const ProjectModal = ({
  setReFetch,
  skills = [],
  open = false,
  onHide,
  loading = false,
  updateFreelancerSkills,
  deleteFreelancerSkill
}) => {
  const isMobile = window.innerWidth > 680 ? false : true
  const [skill, setSkill] = useState({
    skill: '',
    yearsExperience: ''
  })
  const [newSkills, setNewSkills] = useState([])
  const [allSkills, setAllSkills] = useState([])

  useEffect(() => {
    let skillsArray = []
    skillsArray = skills.concat(newSkills)
    setAllSkills(skillsArray)
  }, [newSkills, skills])

  const handleDelete = async data => {
    if (!data?._id) {
      const filteredSkills = newSkills?.filter(obj => obj.skill !== data?.skill)
      setNewSkills(prevSkills => [...prevSkills, ...filteredSkills])
    } else {
      const response = await deleteFreelancerSkill(data?._id)
      if (response?.status === 200) {
        setReFetch(true)
      }
    }
  }

  const handleSubmit = async () => {
    if (newSkills?.length) {
      const payload = {
        skills: newSkills
      }
      const response = await updateFreelancerSkills(payload)
      if (response?.status === 200) {
        onHide()
      }
    }
  }

  return (
    <>
      <>
        {/* {loading && <Loading />} */}
        <MUIDialog
          data-testid="freelancer_education_modal"
          onClose={onHide}
          disableEscapeKeyDown
          open={open}
          maxWidth="sm"
          aria-labelledby="story-preview-modal"
          aria-describedby="story-preview-modal-description">
          <DialogContent>
            <div width="100%">
            <Image src="/img/Unzipped-Primary-Logo.png" alt="logo" width="200px" />
            </div>
            <div className="mt-3 ">
              <TitleText fontWeight="500" lineHeight="25.78px" fontSize="18px">
                Search skills or add your own
              </TitleText>
              <div className="mt-2">
                <div style={{ display: 'flex', justifyContent: 'space-between' , gap: isMobile ? '15px' : '0px' , 
                  flexDirection: isMobile ? 'column' : 'row'}}>
                  <Autocomplete
                    id="skills-standard"
                    value={RECENT_SKILLS.find(obj => obj.value === skill.skill) ?? { label: skill.skill }} // Updated: pass actual value, not a function
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setSkill(prevState => ({
                          ...prevState,
                          skill: newValue?.value
                        }))
                      }
                    }}
                    onInputChange={(event, inputValue) => {
                      if (
                        inputValue &&
                        !RECENT_SKILLS.some(option => option.label.toLowerCase() === inputValue.toLowerCase())
                      ) {
                        setSkill(prevState => ({
                          ...prevState,
                          skill: inputValue.toLowerCase()
                        }))
                      }
                    }}
                    options={RECENT_SKILLS}
                    isOptionEqualToValue={(option, value) => {
                      // Custom equality check to avoid warning
                      return option.value === value.value || option.label === value.label
                    }}
                    getOptionLabel={option => option.label}
                    sx={{
                      height: 47,
                      width: isMobile ? '100%' : '200px',
                      border: '2px solid #CED4DA',
                      borderRadius: '10px',
                      padding: '4px 0px 0px 20px',
                      '& .Mui-focused': {
                        border: '0px !important'
                      },
                      '& .Mui-focused:after': {
                        border: '0px !important'
                      },
                      '& .MuiInputBase-root': {
                        maxHeight: 47,
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                        '::-webkit-scrollbar': {
                          width: 5,
                          height: 0
                        },

                        '::-webkit-scrollbar-track': {
                          background: 'transparent'
                        },

                        '::-webkit-scrollbar-thumb': {
                          background: 'transparent'
                        }
                      },
                      '& input': {
                        border: '0px !important',
                        boxShadow: 'none !important'
                      },
                      '& input:focus': {
                        border: '0px !important',
                        boxShadow: 'none !important'
                      },
                      '& .MuiAutocomplete-root': {
                        borderRadius: '8px !important',
                        padding: '10px !important',
                        border: '1px solid purple !important'
                      },
                      '& .MuiInputBase-root-MuiInput-root:after': {
                        border: '0px !important',
                        width: '100%'
                      },
                      '& .MuiAutocomplete-endAdornment': {
                        top: '35%'
                      }
                    }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        inputProps={{
                          ...params.inputProps,
                          maxLength: 40
                        }}
                        variant="standard"
                        placeholder="Skill"
                      />
                    )}
                    noOptionsText="Add Skill"
                  />
                  <FormField
                    zIndexUnset
                    fieldType="input"
                    type="number"
                    placeholder="Years of Experience..."
                    fontSize="14px"
                    name="title"
                    width={isMobile ? '100%' : '200px'}
                    height="42px !important"
                    borderRadius="10px"
                    border="2px solid #CED4DA"
                    value={skill.yearsExperience}
                    max={100}
                    min={0}
                    onChange={e => {
                      if (e?.target?.value < 100) {
                        setSkill(prevErrors => ({
                          ...prevErrors,
                          yearsExperience: e?.target?.value
                        }))
                      }
                    }}></FormField>
                  <Button
                    disabled={!skill.skill}
                    zIndex={10}
                    type="purple"
                    buttonHeight="42px"
                    onClick={() => {
                      if (!allSkills.includes(skill.skill)) {
                        setNewSkills(prevSkills => [
                          ...prevSkills,
                          { ...skill, yearsExperience: !skill.yearsExperience ? 0 : skill.yearsExperience }
                        ])
                        setSkill({ skill: '', yearsExperience: '' })
                      }
                    }}>
                    Add
                  </Button>
                </div>

                <div className="mt-3">
                  {allSkills?.length > 0
                    ? allSkills.map((skill, index) => (
                        <Badge key={`${skill?.skill}_${index}`} className = "overflow-hidden" >
                          <div className="d-flex" key={skill?.skill + '_' + index}>
                            <AiOutlineCloseCircle
                              onClick={() => {
                                handleDelete(skill)
                              }}
                              id={`${skill?.skill}_icon`}
                              style={{
                                fontSize: '18px',
                                marginRight: '20px',
                                color: '#333',
                                margin: '0 8px 2px'
                              }}
                            />

                            <span>
                              {skill?.skill} | {!skill.yearsExperience ? '0' : skill.yearsExperience}{' '}
                              {skill.yearsExperience > 1 ? 'Years' : 'Year'}
                            </span>
                          </div>
                        </Badge>
                      ))
                    : ''}
                </div>
              </div>
            </div>
          </DialogContent>
          <MUIDialogActions>
            <Button oval type="outlineInverse2" width="120px !important" extraWide onClick={onHide}>
              Cancel
            </Button>

            <Button width="120px !important" oval type="black" height="42px" extraWide onClick={handleSubmit}>
              SAVE
            </Button>
          </MUIDialogActions>
        </MUIDialog>
      </>
    </>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.Loading?.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateFreelancerSkills: bindActionCreators(updateFreelancerSkills, dispatch),
    deleteFreelancerSkill: bindActionCreators(deleteFreelancerSkill, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectModal)
