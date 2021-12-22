import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useContext, useRef } from 'react';

export function InputEmail({ context, actionUpdate, ...params }) {
    const { data: { email: { helperText } }, dispatch } = useContext(context);
    const fieldRef = useRef(null);
    const handleTyping = (e) => {
        e.target.value ?
            e.target.value.match(/\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi) ?
                dispatch(actionUpdate('email', e.target.value, '')) :
                dispatch(actionUpdate('email', e.target.value, 'Wrong format')) :
            dispatch(actionUpdate('email', e.target.value, helperText))
    }
    return (
        <TextField
            label="Email"
            required
            helperText={helperText}
            error={Boolean(helperText)}
            inputRef={fieldRef}
            onBlur={handleTyping}
            InputProps={{
                endAdornment: helperText && <InputAdornment position='end'>
                    <IconButton
                        size='small'
                        sx={{
                            color: 'error.light'
                        }}
                        onClick={() => {
                            fieldRef.current.value = '';
                            fieldRef.current.focus();
                            dispatch(actionUpdate('email', '', ''))
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
