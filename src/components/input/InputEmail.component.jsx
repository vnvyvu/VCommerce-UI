import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useRef, useState } from 'react';

export function InputEmail(params) {
    const [status, setStatus] = useState({ value: '', helperText: '' });
    const fieldRef = useRef(null);
    const handleTyping = (e) => {
        e.target.value ?
            e.target.value.match(/\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi) ?
                setStatus({ value: e.target.value, helperText: '' }) :
                setStatus({ value: e.target.value, helperText: 'Wrong format' }) :
            setStatus(prev => ({ ...prev, value: e.target.value }))
    }
    return (
        <TextField
            label="Email"
            required
            {...status}
            error={Boolean(status.helperText)}
            inputRef={fieldRef}
            onChange={handleTyping}
            InputProps={{
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
