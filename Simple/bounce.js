/**
 * Created by michael on 05/02/2018.
 */

/* Board class - holds information about the ball and the canvas where it is drawn */
function Board() {
    /* Canvas and context */
    this.canvas = null;
    this.context = null;

    this.spawned = false;
    this.current_ball_position_x = null;
    this.current_ball_position_y = null;

    /* Constants */
    this.ball_radius = 50;
    this.ball_start_angle = 0;
    this.ball_end_angle = 2 * Math.PI;
}

Board.prototype.spawn = function (x, y) {
    this.spawned = true;
    this.current_ball_position_x = x;
    this.current_ball_position_y = y;
};

Board.prototype.clear_canvas = function () {
    this.context.clearRect(
        0, 0, this.canvas.width, this.canvas.height
    );
};

Board.prototype.render_canvas = function () {
    /* There is not point in re rendering when nothing is spawned */
    if (this.spawned) {
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

Board.prototype.behave = function () {};

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

function main() {
    let board = new Board();
    let set_canvas_size;
    let render_interval = 10;

    board.canvas = create_canvas();
    board.context = board.canvas.getContext("2D");

    set_canvas_size = _set_canvas_size(board.canvas.id);
    set_canvas_size();
    window.onresize = set_canvas_size;

    setInterval(board.behave, render_interval);
}

if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", main, false);
} else if (document.attachEvent) {
    document.attachEvent("onreadystatechange", main);
} else {
    window.onload = main;
}