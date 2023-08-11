import {request} from '../utils'

export const TEST_GREETING = 'TEST_GREETING'
export const TEST_GREETING_FULFILLED = 'TEST_GREETING_FULFILLED'
export const TEST_GREETING_REJECTED = 'TEST_GREETING_REJECTED'

export function greet() {
    return dispatch => {
        dispatch({type: TEST_GREETING})

        request.get('/api/test').then(response => {
            const payload = response.data
            dispatch({type: TEST_GREETING_FULFILLED, payload})
        }).catch(response => {
            const payload = response.data
            dispatch({type: TEST_GREETING_REJECTED, payload})
        })
    }
}