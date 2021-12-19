import { IconButton, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import { useRef, useState } from 'react';

export function InputName(params) {
    const [gender, setGender] = useState('Mr');
    const [status, setStatus] = useState({ value: '', helperText: '' });
    const fieldRef = useRef(null);
    const handleTyping = (e) => {
        e.target.value ?
            e.target.value.match(/\w+( \w+)+$/) ?
                setStatus({ value: e.target.value, helperText: '' }) :
                setStatus({ value: e.target.value, helperText: 'Please enter your full name' }) :
            setStatus(prev => ({ ...prev, value: e.target.value }))
    }
    return (
        <TextField
            label="Full name"
            required
            {...status}
            error={Boolean(status.helperText)}
            inputRef={fieldRef}
            onChange={handleTyping}
            InputProps={{
                startAdornment: <InputAdornment position='start'>
                    <Select
                        value={gender}
                        onChange={(e) => {
                            setGender(e.target.value);
                        }}
                        variant='standard'
                        disableUnderline
                    >
                        <MenuItem value="Mr">Mr.</MenuItem>
                        <MenuItem value="Mrs">Mrs.</MenuItem>
                    </Select>
                </InputAdornment>,
                endAdornment: status.helperText && <InputAdornment position='end'>
                    <IconButton
                        size='small'
                        sx={{
                            color: 'error.light'
                        }}
                        onClick={() => {
                            fieldRef.current.focus();
                            setStatus({ value: '', helperText: '' });
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
