/**
 * Created by michael on 05/02/2018.
 */

/* Board class - holds information about the ball and the canvas where it is drawn */
function Board() {
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
}

function main() {
    create_canvas();

    let board = new Board();
}

if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", main, false);
} else if (document.attachEvent) {
    document.attachEvent("onreadystatechange", main);
} else {
    window.onload = main;
}