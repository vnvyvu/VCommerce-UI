import { IconButton, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import { useContext, useRef } from 'react';
import { RegisterContext } from '../../pages/register/Register.context';

export function InputName({ context, actionUpdate, ...params }) {
    const { data: { gender, name: { helperText } }, dispatch } = useContext(RegisterContext);
    const fieldRef = useRef(null);
    const handleTyping = (e) => {
        e.target.value ?
            e.target.value.match(/\w+( \w+)+$/) ?
                dispatch(actionUpdate('name', e.target.value, '')) :
                dispatch(actionUpdate('name', e.target.value, 'Please enter your full name')) :
            dispatch(actionUpdate('name', e.target.value, helperText));
    }
    return (
        <TextField
            label="Full name"
            required
            helperText={helperText}
            error={Boolean(helperText)}
            inputRef={fieldRef}
            onBlur={handleTyping}
            InputProps={{
                startAdornment: <InputAdornment position='start'>
                    <Select
                        value={gender.value}
                        onChange={(e) => {
                            dispatch(actionUpdate('gender', e.target.value));
                        }}
                        variant='standard'
                        disableUnderline
                    >
                        <MenuItem value="Mr">Mr.</MenuItem>
                        <MenuItem value="Ms">Ms.</MenuItem>
                    </Select>
                </InputAdornment>,
                endAdornment: helperText && <InputAdornment position='end'>
                    <IconButton
                        size='small'
                        sx={{
                            color: 'error.light'
                        }}
                        onClick={() => {
                            fieldRef.current.value = '';
                            fieldRef.current.focus();
                            dispatch(actionUpdate('name', '', ''));
                        }}
                        edge="end"
                    >
                        <i className="far fa-times-circle"></i>
                    </IconButton>
                </InputAdornment>
            }}
            {...params}
        />
    );
}
