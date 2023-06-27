import {setError, setStatus, StateType} from './reducer';
import {AppReducer} from './reducer';

let startState: StateType;

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