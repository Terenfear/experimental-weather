import { Alert, Box, CircularProgress, Collapse, IconButton, Modal } from '@mui/material'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Weather from '../Weather'
import { resetError, selectError, selectIsLoading } from './appSlice'
import CloseIcon from '@mui/icons-material/Close'

const App: React.FC = () => {
    const isLoading = useSelector(selectIsLoading)
    const error = useSelector(selectError)
    const dispatch = useDispatch()
    const closeError = useCallback(() => dispatch(resetError()), [])
    return (
        <Box>
            <Weather />
            <Modal open={isLoading}
                sx={{ position: 'relative' }}>
                <CircularProgress sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    mr: '-50%'
                }} />
            </Modal>
            <Collapse in={!!error}
                sx={{
                    position: 'fixed',
                    bottom: '0%',
                    left: '0%',
                    right: '0%',
                    m: 2
                }}>
                <Alert
                    severity='error'
                    action={
                        <IconButton
                            aria-label='close'
                            color='inherit'
                            size='small'
                            onClick={closeError}
                        >
                            <CloseIcon fontSize='inherit' />
                        </IconButton>
                    }
                >
                    {error?.message}
                </Alert>
            </Collapse>
        </Box >
    )
}

export default App
