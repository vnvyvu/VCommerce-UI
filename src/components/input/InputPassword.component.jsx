import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useRef, useState } from 'react';

export function InputPassword({ disableValidator = false, repassword = false, ...params }) {
    const [status, setStatus] = useState({ value: '', helperText: '' });
    const fieldRef = useRef(null);
    const handleTyping = (e) => {
        (!disableValidator && e.target.value) ?
            e.target.value.match(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,})/g) ?
                setStatus({ value: e.target.value, helperText: '' }) :
                setStatus({ value: e.target.value, helperText: 'Password must be at least 8 characters, include at least 1 special, 1 lowercase, 1 uppercase' }) :
            setStatus(prev => ({ ...prev, value: e.target.value }))
    }

    return (
        <>
            <TextField
                label="Password"
                required
                {...status}
                error={Boolean(status.helperText)}
                inputRef={fieldRef}
                onChange={handleTyping}
                type='password'
                InputProps={{
                    endAdornment: <InputAdornment position='end'>
                        {status.helperText && <IconButton
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
                        </IconButton>}
                    </InputAdornment>
                }}
                {...params}
            />
            {repassword && <InputRepassword password={status.value} {...params} />}
        </>
    );
}

function InputRepassword({ password, ...params }) {
    const [status, setStatus] = useState({ value: '', helperText: '' });
    const handleTyping = (e) => {
        password && e.target.value !== password ?
            setStatus({ value: e.target.value, helperText: 'Password not match' }) :
            setStatus({ value: e.target.value, helperText: '' })
    }
    return (
        <TextField
            label="Re-password"
            required
            {...status}
            error={Boolean(status.helperText)}
            onChange={handleTyping}
            type='password'
            {...params}
        />
    );
}
