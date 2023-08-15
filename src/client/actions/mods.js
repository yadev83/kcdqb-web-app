import { request, API_URL } from '../utils'

export const MODS_FETCH_ALL = 'MODS_FETCH_ALL'
export const MODS_FETCH_ALL_FULFILLED = 'MODS_FETCH_ALL_FULFILLED'
export const MODS_FETCH_ALL_REJECTED = 'MODS_FETCH_ALL_REJECTED'

export function fetchMods() {
    return dispatch => {
        dispatch({type: MODS_FETCH_ALL})

        request.get(`${API_URL}/api/mods`).then(response => {
            const payload = response.data
            dispatch({type: MODS_FETCH_ALL_FULFILLED, payload})
        }).catch(response => {
            const payload = response.data
            dispatch({type: MODS_FETCH_ALL_REJECTED, payload})
        })
    }
}