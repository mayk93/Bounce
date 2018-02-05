/**
 * Created by michael on 05/02/2018.
 */

/* Board class - holds information about the ball and the canvas where it is drawn */
function Board() {
    /* Canvas and context */
    this.canvas = null;
    this.context = null;

    this.spawned = false;
    this.dragged = false;

    this.current_ball_position_x = null;
    this.current_ball_position_y = null;

    /* Constants */
    this.ball_radius = 50;
    this.ball_start_angle = 0;
    this.ball_end_angle = 2 * Math.PI;
    this.gravitational_acceleration = 9.75;
}

Board.prototype.spawn = function (x, y) {
    this.spawned = true;
    this.current_ball_position_x = x;
    this.current_ball_position_y = y;
};

Board.prototype.drag = function (x, y) {
    this.current_ball_position_x += x;
    this.current_ball_position_y += y;
};

Board.prototype.drag_stop = function () {
    this.dragged = false;
};

Board.prototype.click_handler = function (event) {
    if (!this.spawned) {
        this.spawn(event.pageX, event.pageY);
    }
};

Board.prototype.mouse_move_handler = function (event) {
    if (event.buttons == 1 && in_ball(
        this.current_ball_position_x, this.current_ball_position_y, this.ball_radius, event.pageX, event.pageY)
    ) {
        this.dragged = true;
        this.drag(event.movementX, event.movementY);
    } else {
        this.drag_stop(event.pageX, event.pageY);
    }
};

Board.prototype.mouse_up_handler = function (event) {
    this.drag(event.pageX, event.pageY);
};

Board.prototype.gravity = function () {
    this.current_ball_position_y += this.gravitational_acceleration;
};

Board.prototype.bounce = function () {
    /* The reason we use ball_radius, for example */
    /* this.current_ball_position_x = this.ball_radius; */
    /* Is because current_ball_position_x refers to the center of the ball. When we hit, in this example */
    /*
        The left side, we want to reposition the ball a radius away, so it appears as if the side of the ball is stopped
    */

    let width_limit = this.canvas.width - this.ball_radius;
    let height_limit = this.canvas.height - this.ball_radius;

    /* Width */
    if (this.current_ball_position_x - this.ball_radius < 0) {
        /* Left side */
        this.current_ball_position_x = this.ball_radius;
    }
    if (this.current_ball_position_x + this.ball_radius > width_limit) {
        /* Right side */
        this.current_ball_position_x = width_limit
    }

    /* Height */
    if (this.current_ball_position_y - this.ball_radius < 0) {
        /* Top side */
        this.current_ball_position_y = this.ball_radius;
    }
    if (this.current_ball_position_y > height_limit) {
        /* Bottom side */
        this.current_ball_position_y = height_limit
    }
};

Board.prototype.apply_forces = function () {};

Board.prototype.clear_canvas = function () {
    this.context.clearRect(
        0, 0, this.canvas.width, this.canvas.height
    );
};

Board.prototype.render_canvas = function () {
    /* There is not point in re rendering when nothing is spawned or nothing is dragged */
    if (this.spawned || this.dragged) {
        /*
            This says something like this.
            Consider the point (current_ball_position_x, current_ball_position_y) the center of a circle with radius
            ball_radius.
            Draw the contour of that circle starting at 0 radians ( where sin(x) = 0 and cos(x) = 1 ) and end
            after 2PI radians ( same place, so a full circle )
        */
        this.context.beginPath();
        this.context.arc(
            this.current_ball_position_x, this.current_ball_position_y,
            this.ball_radius,
            this.ball_start_angle, this.ball_end_angle
        );

        this.context.stroke();
    }
};

Board.prototype.render = function () {
    /* In render, we clear the board and draw again based on the new data*/
    this.clear_canvas();
    this.render_canvas();
};

Board.prototype.behave = function () {
    if (this.spawned && !this.dragged) {
        this.gravity();
        this.bounce();
        this.apply_forces();

        this.render();
    }
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

function main() {
    let board = new Board();
    let set_canvas_size;
    let render_interval = 10;

    board.canvas = create_canvas();
    board.context = board.canvas.getContext("2d");

    board.canvas.addEventListener("click", board.click_handler.bind(board));
    board.canvas.addEventListener("mousemove", board.mouse_move_handler.bind(board));
    board.canvas.addEventListener("mouseup", board.mouse_up_handler.bind(board));

    set_canvas_size = _set_canvas_size(board.canvas.id);
    set_canvas_size();
    window.onresize = set_canvas_size;

    setInterval(board.behave.bind(board), render_interval);
}

if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", main, false);
} else if (document.attachEvent) {
    document.attachEvent("onreadystatechange", main);
} else {
    window.onload = main;
}