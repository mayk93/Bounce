/**
 * Created by michael on 08/02/2018.
 */

/* Constants */
import {gravitational_acceleration} from '../utils/constants';

class Ball {
    constructor() {
        this.ball_id = null;
        this.collisions = 0;

        this.current_ball_position_x = null;
        this.current_ball_position_y = null;

        /* Forces */
        this.applied_force_x = 0;
        this.applied_force_y = 0;

        this.force_x = 0;
        this.force_y = 0;
    }

    spawn(x, y) {
        // console.log("Ball spawned: ", x, y);

        this.current_ball_position_x = x;
        this.current_ball_position_y = y;

        /* When we 'spawn' the ball, we drop it, thus we need to apply a little force to it. */
        if (this.canvas) {
            this.force_x = [-1, 1][Math.floor(Math.random() * 2)] * (Math.random() * 25 + 10);
            this.applied_force_y = (1 - (y / this.canvas.height)) * Math.random() * 50 + 25;
        }
    }

    gravity() {
        this.current_ball_position_y += gravitational_acceleration;
    }
}

export default Ball;