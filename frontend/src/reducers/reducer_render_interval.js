/**
 * Created by michael on 08/02/2018.
 */

import {SET_RENDER_INTERVAL} from '../utils/types';


export default function (state=10, action) {
    switch (action.type) {
        case SET_RENDER_INTERVAL:
            return action.payload;
        default:

            return state;
    }
}