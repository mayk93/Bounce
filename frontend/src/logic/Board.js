/**
 * Created by michael on 08/02/2018.
 */

/* My libs / components */
import Ball from './Ball';

/* Constants */
import {ball_radius, ball_start_angle, ball_end_angle} from '../utils/constants';

class Board {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");

        this.canvas.addEventListener("click", this.click_handler.bind(this));

        this.balls = [];
    }

    /* Start Rendering section */
    clear_canvas() {
        this.context.clearRect(
            0, 0, this.canvas.width, this.canvas.height
        );
    };

    render_canvas() {
        /* There is not point in re rendering when nothing is spawned or nothing is dragged */
        let self = this;

        this.balls.map(function (ball) {
            /*
                This says something like this.
                Consider the point (current_ball_position_x, current_ball_position_y) the center of a circle with radius
                ball_radius.
                Draw the contour of that circle starting at 0 radians ( where sin(x) = 0 and cos(x) = 1 ) and end
                after 2PI radians ( same place, so a full circle )
            */

            if (ball) {
                self.context.beginPath();
                self.context.arc(
                    ball.current_ball_position_x, ball.current_ball_position_y,
                    ball_radius,
                    ball_start_angle, ball_end_angle
                );
                self.context.fillStyle = "black";
                self.context.fill();
                self.context.stroke();

                // console.log("Ball rendered");
                // console.log(ball.current_ball_position_x, ball.current_ball_position_y);
                // console.log(ball_radius);
                // console.log(ball_start_angle, ball_end_angle);
                // console.log("-----");
            }

            return null;
        })
    };

    click_handler(event) {
        let new_ball = new Ball();

        new_ball.ball_id = (+new Date()).toString();
        new_ball.canvas = this.canvas;
        new_ball.spawn(event.pageX, event.pageY);

        this.balls.push(new_ball);
    }

    behave() {
        // let self = this;

        this.balls.map(function (ball) {
            if (ball.collisions > 100) {
                ball = null;
            }

            if (ball) {
                // ball.gravity();
                // ball.bounce(self.balls);
                // ball.apply_forces();
            }

            return null;
        });

        this.balls = this.balls.filter(function (ball) {
            return ball !== null && ball.collisions < 100;
        });


        this.render();
    }

    /* Important! Not the React Render. Render for canvas. */
    render() {
        // console.log('Rendering board.');
        this.clear_canvas();
        this.render_canvas();
    }
}

export default Board;