/**
 * Created by michael on 08/02/2018.
 */

/* My libs / components */
import Ball from './Ball';

/* Constants */
import {ball_radius, ball_start_angle, ball_end_angle} from '../utils/constants';

/* Style and CSS */
import '../style/css/Board.css';

class Board {
    constructor() {
        /* Canvas creation and definition */
        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute("id", "main_canvas");
        this.canvas.setAttribute("class", "canvas_class");
        this.canvas.addEventListener("click", this.click_handler.bind(this));

        /* Canvas size and resize */
        this.set_canvas_size();
        window.onresize = this.set_canvas_size.bind(this);

        /* Context */
        this.context = this.canvas.getContext("2d");

        /* Document insertion */
        document.getElementById("main").appendChild(this.canvas);

        /* Board logic data */
        this.root_height = document.getElementById("root").offsetHeight;

        this.balls = [];
    }

    set_canvas_size() {
        this.canvas.setAttribute("width", window.innerWidth );
        this.canvas.setAttribute("height", window.innerHeight);
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
                self.context.stroke();
            }

            return null;
        })
    };

    click_handler(event) {
        let new_ball = new Ball();
        let x = event.pageX;
        let y = event.pageY - this.root_height;

        new_ball.ball_id = (+new Date()).toString();
        new_ball.canvas = this.canvas;
        new_ball.spawn(x, y);

        this.balls.push(new_ball);
    }

    behave() {
        let self = this;

        this.balls.map(function (ball) {
            if (ball.collisions > 100) {
                ball = null;
            }

            if (ball) {
                ball.gravity();
                ball.bounce(self.balls);
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
        this.clear_canvas();
        this.render_canvas();
    }
}

export default Board;