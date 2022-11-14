import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import SimpleBar from 'simplebar-react';

const Field = ({model, modelLoading, selModel, setSelModel, changeModel, type}) => {
    return (
        <>
        {modelLoading &&
            <CircularProgress />
        }
        {!modelLoading &&
        <FormControl>
        <Select value={selModel} onChange={changeModel}>
            <MenuItem value={type}>{type}</MenuItem>
            {model.map((item, index) => (
                <MenuItem key={index} value={item}>{item}</MenuItem>
            ))}
        </Select>
        </FormControl>
        }
        </>
    )
}

export default Field;