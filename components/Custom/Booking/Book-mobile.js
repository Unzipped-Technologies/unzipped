import React, { useState } from 'react';
import moment from "moment";
import DatePicker from "material-ui/DatePicker";
import Dialog from "material-ui/Dialog";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import SnackBar from "material-ui/Snackbar";
import Card from "material-ui/Card";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent
} from "material-ui/Stepper";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	root: {
	  width: '80vw',
	  minHeight: "20vw",
	  paddingTop:'1.3vh',
	  marginBottom: '8vh',
	  backgroundColor: 'white',
	  boxShadow: "3px 3px 3px darkgray"
	},
	button: {
	  marginTop: theme.spacing(1),
	//   position: 'relative',
	//   right: '13vw',
	//   float: 'right',

	},
	text: {
		display: "block",
		marginBottom: '1.3vh',
		marginTop: '.5vh',
	},
	actionsContainer: {
	  marginBottom: theme.spacing(2),
	},
	resetContainer: {
	  padding: theme.spacing(3),
	},
  }));

  function getSteps() {
	return ['Location', 'Choose Appointment', 'User Details'];
  }
  
  function getStepContent(step) {
	switch (step) {
	  case 0:
		return `Location`;
	  case 1:
		return `Select-time`;
	  case 2:
		return `Your-Information`;
	  default:
		return 'Unknown step';
	}
  }


const BookNow = () => {
	const [firstName, setFirstName] = useState("");
	const [location, setLocation] = useState('');
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
	const [phone, setPhone] = useState('');
	const [date, setDate] = useState('');
	const [service, setService] = useState('');
	const [time, setTime] = useState('');
    const [schedule, setSchedule] = useState([]);
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [appointmentDate, setAppointmentDate] = useState(false);
	const [appointmentSlot, setAppointmentSlot] = useState(0)
    const [appointmentMeridiem, setAppointmentMeridiem] = useState(0);
    const [validEmail, setValidEmail] = useState(true);
    const [validPhone, setValidPhone] = useState(true);
    const [finished, setFinished] = useState(false);
    // const [smallScreen, setSmallScreen] = useState(window.innerWidth < 768);
    const [stepIndex, setStepIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [confirmationSnackbarOpen, setConfirmationSnackbarOpen] = useState(false);
	const [ConfirmationTextVisible, setConfirmationTextVisible] = useState(false);
	const [processed, setProcessed] = useState(false);
	const contactFormFilled = useState('');

	const classes = useStyles();
	const [activeStep, setActiveStep] = useState(0);
	const steps = getSteps();
  
	const handleNext = () => {
	  setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};
  
	const handleBack = () => {
	  setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};
  
	const handleReset = () => {
	  setActiveStep(0);
	};
  
	return (
	  <React.Fragment>
	  <div className={classes.root}>
		<Stepper activeStep={activeStep} orientation="vertical">
		  {steps.map((label, index) => (
			<Step key={label}>
			  <StepLabel>{label}</StepLabel>
			  <StepContent>
				<Typography>
					{getStepContent(index) === 'Location' &&
						<div className={classes.book}>
							<TextField 
								// style={{ display: "block" }}
								className={classes.text}
								name="Location"
								hintText="Pick Up Location"
								floatingLabelText="Location"
								// errorText={
								// 	validEmail ? null : "Enter a pickup location"
								// }
								onChange={(evt, newValue) => setLocation(newValue)}
							/>
						</div>
					}
					{getStepContent(index) === `Select-time` &&
						<div className={classes.book}>
						<TextField 
							// style={{ display: "block" }}
							className={classes.text}
							name="Time"
							hintText="Add time"
							floatingLabelText="Time"
							// errorText={
							// 	validEmail ? null : "Enter a pickup location"
							// }
							onChange={(evt, newValue) => setDate(newValue)}
						/>
					</div>
					}
					{getStepContent(index) === `Your-Information` &&
						<div className={classes.book}>
						<TextField 
							// style={{ display: "block" }}
							className={classes.text}
							name="Service"
							hintText="Select a Service"
							floatingLabelText="Service"
							// errorText={
							// 	validEmail ? null : "Enter a pickup location"
							// }
							onChange={(evt, newValue) => setService(newValue)}
						/>
					</div>
					}

				</Typography>
				<div className={classes.actionsContainer}>
				  <div>
					<Button
					  variant="contained"
					  color="primary"
					  onClick={handleNext}
					  className={classes.button}
					>
					  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
					</Button>
					<Button
					  disabled={activeStep === 0}
					  onClick={handleBack}
					  className={classes.button}
					>
					  Back
					</Button>
				  </div>
				</div>
			  </StepContent>
			</Step>
		  ))}
		</Stepper>
		{activeStep === steps.length && (
		  <Paper square elevation={0} className={classes.resetContainer}>
			<Typography>All steps completed - you&apos;re finished</Typography>
			<Button onClick={handleReset} className={classes.button}>
			  Reset
			</Button>
		  </Paper>
		)}
	  </div>
	  </React.Fragment>
	);
  }

export default BookNow;