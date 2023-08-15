import { KEY_TO_STRING } from "./constants"

export function getStringFromKey(key) {
    const availableKeys = Object.keys(KEY_TO_STRING)
    if(!availableKeys.includes(key))
        return key
    
    return KEY_TO_STRING[key]
}