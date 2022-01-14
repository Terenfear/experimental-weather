import { createAction, RSAA, RSAARequestAction } from 'redux-api-middleware'

declare module 'redux-api-middleware' {
    interface RSAAAction<State = any, Payload = any, Meta = any> {
        type: string
    }
}

const createTypedAction: typeof createAction = (clientCall) => {
    const action = createAction(clientCall)
    action.type = 'RSAA'
    return action
}

export const GLOBAL_REQUEST_STARTED_TYPE = 'GLOBAL_REQUEST_STARTED'
export const GLOBAL_REQUEST_FAILURE_TYPE = 'GLOBAL_REQUEST_FAILURE'

export const SUCCESS_GET_WEATHER = 'SUCCESS_WEATHER'
export const GET_WEATHER = createTypedAction({
    endpoint: process.env.REACT_APP_API_URL + '/current.json?key=' + process.env.REACT_APP_API_KEY + '&q=Minsk',
    method: 'GET',
    types: [
        GLOBAL_REQUEST_STARTED_TYPE,
        SUCCESS_GET_WEATHER,
        {
            type: GLOBAL_REQUEST_FAILURE_TYPE,
            meta: (action) => ({ endpoint: action[RSAA].endpoint })
        }
    ]
})
