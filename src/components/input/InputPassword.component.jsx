import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useContext, useRef } from 'react';

export function InputPassword({ disableValidator = false, repassword = false, context, actionUpdate, ...params }) {
    const { data: { password: { value, helperText } }, dispatch } = useContext(context);
    const fieldRef = useRef(null);
    const handleTyping = (e) => {
        (!disableValidator && e.target.value) ?
            e.target.value.match(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,})/g) ?
                dispatch(actionUpdate('password', e.target.value, '')) :
                dispatch(actionUpdate('password', e.target.value, 'Password must be at least 8 characters, include at least 1 special, 1 lowercase, 1 uppercase')) :
            dispatch(actionUpdate('password', e.target.value, helperText));
    }

    return (
        <>
            <TextField
                label="Password"
                required
                helperText={helperText}
                error={Boolean(helperText)}
                inputRef={fieldRef}
                onBlur={handleTyping}
                type='password'
                InputProps={{
                    endAdornment: <InputAdornment position='end'>
                        {helperText && <IconButton
                            size='small'
                            sx={{
                                color: 'error.light'
                            }}
                            onClick={() => {
                                fieldRef.current.value = '';
                                fieldRef.current.focus();
                                dispatch(actionUpdate('password', '', ''));
                            }}
                            edge="end"
                        >
                            <i className="far fa-times-circle"></i>
                        </IconButton>}
                    </InputAdornment>
                }}
                {...params}
            />
            {repassword && <InputRepassword password={value} context={context} actionUpdate={actionUpdate} {...params} />}
        </>
    );
}

function InputRepassword({ password, context, actionUpdate, ...params }) {
    const { data: { repassword: { helperText } }, dispatch } = useContext(context);
    const handleTyping = (e) => {
        password && e.target.value !== password ?
            dispatch(actionUpdate('repassword', e.target.value, 'Password not match')) :
            dispatch(actionUpdate('repassword', e.target.value, ''));
    }
    return (
        <TextField
            label="Re-password"
            required
            helperText={helperText}
            error={Boolean(helperText)}
            onBlur={handleTyping}
            type='password'
            {...params}
        />
    );
}
