import styled from 'styled-components'

const StyledTextarea = styled.textarea`
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 16px;
    resize: vertical;

    &:focus {
        outline: none;
        border-color: #4a90e2;
    }
`

const Textarea = props => <StyledTextarea {...props} />

export default Textarea
