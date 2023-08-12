import { request, API_URL } from '../utils'

export const CDN_GET_LIST = 'CDN_GET_LIST'
export const CDN_GET_LIST_FULFILLED = 'CDN_GET_LIST_FULFILLED'
export const CDN_GET_LIST_REJECTED = 'CDN_GET_LIST_REJECTED'

export function fetchDownloadablesList() {
    return dispatch => {
        dispatch({type: CDN_GET_LIST})

        request.get(`${API_URL}/api/cdn/list`).then(response => {
            const payload = response.data
            dispatch({type: CDN_GET_LIST_FULFILLED, payload})
        }).catch(response => {
            const payload = response.data
            dispatch({type: CDN_GET_LIST_REJECTED, payload})
        })
    }
}