import React from 'react'
import Styled from 'styled-components'

const Container = Styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Inputs = Styled.div`
    display: flex;
    flex-flow: row nowrap;
`;


const SimpleExample = () => {
    const [age, setAge] = React.useState('')
	const [name, setName] = React.useState('');
    const [formData, setFormData] = React.useState({
        name: '',
        age: ''
    }) 
    const calcDate = () => {
        const date = new Date();
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    }
    const calcTime = () => {
        const date = new Date();
        let ampm = 'AM'
        let hours = date.getUTCHours()
        if(hours > 12) {
            hours = hours - 12
            ampm = 'PM'
        }
        return `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()} ${ampm}`
    }

    const setNameField = (e) => {
        setName(e.target.value);
    }

    const setAgeField = (e) => {
        setAge(e.target.value);
    }

    const setFormDataField = () => {
        setFormData({
            name,
            age
        })
    }
	// React components are simple functions that take in props and state, and render HTML
    const date = calcDate()
    const time = calcTime()
	return (
		<Container>
            <div>
			<h4>A demonstration of how to access a Text Field</h4>
			<Inputs>
				<input placeholder="Marcus" value={name} onChange={setNameField} style={{border: '1px solid black', marginRight: '5px'}}/>
				<input placeholder="20" value={age} onChange={setAgeField} style={{border: '1px solid black'}} />
			</Inputs>
			<p style={{fontSize: '20px'}}>Click the "Generate" button to get the text/s in the text fields.</p>
			<button onClick={setFormDataField}>Generate</button>
            <p>{formData.name}</p>
            <p>{formData.age}</p>
            <div>Time: {time}</div>
            <div>Date: {date}</div>
            </div>

		</Container>
	);
}

export default SimpleExample;