import React, { JSX } from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';

import { setError, useAppDispatch, useAppSelector } from '@/App';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Error = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(state => state.App.error);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setError({ error: null }));
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Stack>
    );
};
