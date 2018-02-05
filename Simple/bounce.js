/**
 * Created by michael on 05/02/2018.
 */

/* Constants */
let ball_radius = 50;
let ball_start_angle = 0;
let ball_end_angle = 2 * Math.PI;
let gravitational_acceleration = 9.75;

let force_modifier_x = 2;
let force_modifier_y = 50;

function Ball() {
    this.spawned = false;
    this.dragged = false;

    this.current_ball_position_x = null;
    this.current_ball_position_y = null;

    /* Forces */
    this.applied_force_x = 0;
    this.applied_force_y = 0;

    this.force_x = 0;
    this.force_y = 0;

    this.direction = [];

    this.canvas = null;
}

// /* Start Handler section */
Ball.prototype.spawn = function (x, y) {
    this.spawned = true;
    this.current_ball_position_x = x;
    this.current_ball_position_y = y;

    /* When we 'spawn' the ball, we drop it, thus we need to apply a little force to it. */
    if (this.canvas) {
        this.applied_force_y = (1 - (y / this.canvas.height)) * force_modifier_y;
    }
};
//
// Ball.prototype.drag = function (x, y) {
//     this.current_ball_position_x += x;
//     this.current_ball_position_y += y;
//
//     this.direction.push(event.x);
//     if (this.direction.length > 2) {
//         this.direction.shift();
//     }
// };
//
// Ball.prototype.drag_stop = function (x, y) {
//     if (this.dragged) {
//         this.dragged = false;
//
//         /* When we stop dragging the ball, we drop it, thus we need to apply a little force to it. */
//         if (this.canvas) {
//             let x_position;
//             let direction_value = 0;
//
//             if (this.direction.length == 2) {
//                 direction_value = this.direction[1] - this.direction[0];
//             }
//
//             if (x > this.canvas.width / 2) {
//                 // When x is in the right half, the x_position is x it's self
//                 // That is because x is between 0 and SOME_VALUE.
//                 // We want applied_force_x to be proportional to the distance between ( current position ) and the side
//                 // the ball is headed to.
//
//                 // So, if we are in the right half, applied_force is going to be greatest when it's furthers to the
//                 // right.
//
//                 // When going the other way, we want applied_force_x to be greatest when furthers from the left.
//
//                 x_position = x;
//             } else {
//                 x_position = -1 * (this.canvas.width - x);
//             }
//
//             this.force_x = direction_value;
//             this.applied_force_x = (
//                 x_position / this.canvas.width
//             ) * direction_value * force_modifier_x;
//
//             this.applied_force_y = (1 - (y / this.canvas.height)) * force_modifier_y;
//         }
//     }
// };
//
// Ball.prototype.click_handler = function (event) {
//     if (!this.spawned) {
//         this.spawn(event.pageX, event.pageY);
//     }
// };
//
// Ball.prototype.mouse_move_handler = function (event) {
//     // We drag if we are already dragging of if we start the dragging by clicking inside the ball.
//     if (
//         this.dragged || ( event.buttons == 1 && in_ball(
//             this.current_ball_position_x, this.current_ball_position_y, ball_radius, event.pageX, event.pageY
//             )
//         )
//     ) {
//         this.dragged = true;
//         this.drag(event.movementX, event.movementY);
//     } else {
//         this.drag_stop(event.pageX, event.pageY);
//     }
// };
//
// Ball.prototype.mouse_up_handler = function (event) {
//     this.drag_stop(event.pageX, event.pageY);
// };
/* End Handler section */

Ball.prototype.gravity = function () {
    this.current_ball_position_y += gravitational_acceleration;
};

Ball.prototype.bounce = function () {
    /* The reason we use ball_radius, for example */
    /* this.current_ball_position_x = ball_radius; */
    /* Is because current_ball_position_x refers to the center of the ball. When we hit, in this example */
    /*
        The left side, we want to reposition the ball a radius away, so it appears as if the side of the ball is stopped
    */

    let width_limit = this.canvas.width - ball_radius;
    let height_limit = this.canvas.height - ball_radius;

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

    /* Force stop */
    /* In order to avoid perpetual bounce, we just set the applied force to zero once it gets too small. */
    if (this.applied_force_x < 0.1) {
        this.applied_force_x = 0
    }
    if (this.applied_force_y < 0.1) {
        this.applied_force_y = 0
    }
};

Ball.prototype.apply_forces = function () {
    /*
        In this function, we 'apply' the forces to the directions, x and y.
        We apply the force and then decrease it, no we don't apply it forever.
        Because the force can be positive or negative, 'decrease' means either decreasing by one, in the
        case of positive functions or adding by one in the case of negative ones.
    */

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
};

/* ----- # ----- # ----- # ----- */

/* Board class - holds information about the ball and the canvas where it is drawn */
function Board() {
    /* Canvas and context */
    this.canvas = null;
    this.context = null;

    /* Balls */
    this.balls = []
}

/* Start Rendering section */
Board.prototype.clear_canvas = function () {
    this.context.clearRect(
        0, 0, this.canvas.width, this.canvas.height
    );
};

Board.prototype.render_canvas = function () {
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
        self.context.beginPath();
        self.context.arc(
            ball.current_ball_position_x, ball.current_ball_position_y,
            ball_radius,
            ball_start_angle, ball_end_angle
        );

        self.context.stroke();
    })
};

Board.prototype.render = function () {
    /* In render, we clear the board and draw again based on the new data*/
    this.clear_canvas();
    this.render_canvas();
};
/* End Rendering section */

Board.prototype.behave = function () {
    this.balls.map(function (ball) {
        // console.log('Dealing with ball: ', ball);

        ball.gravity();
        ball.bounce();
        ball.apply_forces();
    });

    this.render();
};

Board.prototype.click_handler = function (event) {
    let new_ball = new Ball();
    new_ball.canvas = this.canvas;
    new_ball.spawn(event.pageX, event.pageY);

    this.balls.push(new_ball);
};

/* Functions */
function create_canvas(id="bounce_canvas") {
    let new_canvas = document.createElement("canvas");

    new_canvas.setAttribute("id", id);
    new_canvas.setAttribute("class", "canvas_class");

    document.getElementById("main").appendChild(new_canvas);

    return new_canvas;
}

function _set_canvas_size(canvas_id) {
    return function () {
        let canvas = document.getElementById(canvas_id);
        let canvas_width = window.innerWidth - 50;
        let canvas_height = window.innerHeight - 50;

        canvas.setAttribute("width", canvas_width);
        canvas.setAttribute("height", canvas_height);
    }
}

function in_ball(circle_x, circle_y, circle_radius, point_x, point_y) {
    let point_position = Math.pow(
        point_x - circle_x, 2
    ) + Math.pow(
        point_y - circle_y, 2
    );
    return point_position < Math.pow(circle_radius, 2)
}