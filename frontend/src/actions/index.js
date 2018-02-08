/**
 * Created by michael on 08/02/2018.
 */


import {SET_RENDER_INTERVAL} from '../utils/types';

export let set_render_interval = (new_state) => {
    return {
        type: SET_RENDER_INTERVAL,
        payload: new_state
    }
};