/**
 * Created by michael on 05/02/2018.
 */

/* Board class - holds information about the ball and the canvas where it is drawn */
function Board() {
    this.canvas = null;
    this.context = null;

    this.spawned = false;
    this.current_ball_position_x = null;
    this.current_ball_position_y = null;
}
Board.prototype.spawn = function (x, y) {
    this.spawned = true;
    this.current_ball_position_x = x;
    this.current_ball_position_y = y;
};

/* Functions */
function create_canvas() {
    let new_canvas = document.createElement("canvas");

    new_canvas.setAttribute("id", "bounce_canvas");
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

    board.canvas = create_canvas();
    set_canvas_size = _set_canvas_size(board.canvas.id);
    set_canvas_size();
    window.onresize = set_canvas_size;
}

if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", main, false);
} else if (document.attachEvent) {
    document.attachEvent("onreadystatechange", main);
} else {
    window.onload = main;
}