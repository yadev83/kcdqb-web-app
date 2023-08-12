import { request, API_URL } from '../utils'

export const MC_GETSTATS = 'MC_GETSTATS'
export const MC_GETSTATS_FULFILLED = 'MC_GETSTATS_FULFILLED'
export const MC_GETSTATS_REJECTED = 'MC_GETSTATS_REJECTED'

export function fetchServerStats() {
    return dispatch => {
        dispatch({type: MC_GETSTATS})

        request.get(`${API_URL}/api/mc/stats`).then(response => {
            const payload = response.data
            dispatch({type: MC_GETSTATS_FULFILLED, payload})
        }).catch(response => {
            const payload = response.data
            dispatch({type: MC_GETSTATS_REJECTED, payload})
        })
    }
}