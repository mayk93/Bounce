/**
 * Created by michael on 08/02/2018.
 */

/* Functions and Constants */
import {circles_intersect} from '../utils/functions';
import {ball_radius, gravitational_acceleration} from '../utils/constants';

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

        this.root_height = document.getElementById("root").offsetHeight;
    }

    spawn(x, y) {
        this.current_ball_position_x = x;
        this.current_ball_position_y = y;

        /* When we 'spawn' the ball, we drop it, thus we need to apply a little force to it. */
        if (this.canvas) {
            this.force_x = [-1, 1][Math.floor(Math.random() * 2)] * (Math.random() * 25 + 10);
            this.applied_force_y = (1 - (y / (this.canvas.height - 0))) * Math.random() * 50 + 25;
        }
    }

    apply_forces() {
        this.current_ball_position_x += this.force_x;
        this.current_ball_position_y += this.force_y;

        if (this.force_x != 0) {
            if (this.force_x > 0) {
                this.force_x -= 1;
            } else if (this.force_x < 0) {
                this.force_x += 1;
            }
        }

        if (this.force_y != 0) {
            if (this.force_y > 0) {
                this.force_y -= 1;
            } else if (this.force_y < 0) {
                this.force_y += 1;
            }
        }
    }

    gravity() {
        this.current_ball_position_y += gravitational_acceleration;
    }

    bounce(other_balls) {
        /* The reason we use ball_radius, for example */
        /* this.current_ball_position_x = ball_radius; */
        /* Is because current_ball_position_x refers to the center of the ball. When we hit, in this example */
        /*
            The left side, we want to reposition the ball a radius away, so it appears as if the side of the ball is stopped
        */

        let self = this;
        let width_limit = this.canvas.width - ball_radius;
        let height_limit = this.canvas.height - ball_radius - 65;

        /* Width */
        if (this.current_ball_position_x - ball_radius < 0) {
            /* Left side */
            this.current_ball_position_x = ball_radius;

            // We want to 'bounce' left with a force equal to the currently applied force.
            this.force_x = this.applied_force_x;
            // Every time we apply the force, we decrease it a little bit.
            this.applied_force_x /= 1.2;
        }
        if (this.current_ball_position_x + ball_radius > width_limit) {
            /* Right side */
            this.current_ball_position_x = width_limit;
            this.force_x = -this.applied_force_x; // We want to 'bounce' right
            this.applied_force_x /= 1.2;
        }

        /* Height */
        if (this.current_ball_position_y - ball_radius < 0) {
            /* Top side */
            this.current_ball_position_y = ball_radius;
            this.force_y = this.applied_force_y; // We want to bounce 'down'
            this.applied_force_y /= 1.2;
        }
        if (this.current_ball_position_y > height_limit) {
            /* Bottom side */
            this.current_ball_position_y = height_limit;
            this.force_y = -this.applied_force_y; // We want to bounce 'up'
            this.applied_force_y /= 1.2;
        }

        if (other_balls) {
            other_balls.map(function (other_ball) {
                if (self.ball_id !== other_ball.ball_id && circles_intersect(
                        self.current_ball_position_x, self.current_ball_position_y,
                        other_ball.current_ball_position_x, other_ball.current_ball_position_y,
                        ball_radius
                    )
                ) {
                    self.collisions += 1;

                    self.force_x = [-1, 1][Math.floor(Math.random() * 2)] * (Math.random() * 25 + 10);
                    self.applied_force_y = (
                        1 - (self.current_ball_position_y / self.canvas.height)
                    ) * Math.random() * 50 + 25;
                }
            });
        }

        /* Force stop */
        /* In order to avoid perpetual bounce, we just set the applied force to zero once it gets too small. */
        if (this.applied_force_x < 0.1) {
            this.applied_force_x = 0
        }
        if (this.applied_force_y < 0.1) {
            this.applied_force_y = 0
        }
    }
}

export default Ball;