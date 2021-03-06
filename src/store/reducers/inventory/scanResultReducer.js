import { SET_SCAN_RESULT, SET_SCAN_STATUS } from "../../actions/inventory/scanResultAction"

const initialState = {
    scanStatus: "",
    scanResult: "",
}

export const scanResultReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_SCAN_STATUS:
            return {...state, scanStatus: payload }
        case SET_SCAN_RESULT:
            return {...state, scanResult: payload }
        default:
            return state
    }
}