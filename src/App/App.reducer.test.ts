import {setError, setStatus, InitialStateType} from './App.reducer';
import {AppReducer} from './App.reducer';

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null
    }
})

// Set Error
test('Correct error should be set', () => { 
    const endState = AppReducer(startState, setError({error: 'Some error'}))
    expect(endState.error).toBe('Some error')
})

// Set Status
test('Correct status should be chenged', () => { 
    const endState = AppReducer(startState, setStatus({status: 'loading'}))
    expect(endState.status).toBe('loading')
})