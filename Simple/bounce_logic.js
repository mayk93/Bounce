/**
 * Created by michael on 05/02/2018.
 */


function main() {
    let board = new Board();
    let set_canvas_size;
    let render_interval = 10;

    let score_update_interval = 10000;

    create_counters();
    create_ledger();

    board.canvas = create_canvas();
    board.context = board.canvas.getContext("2d");

    board.canvas.addEventListener("click", board.click_handler.bind(board));

    set_canvas_size = _set_canvas_size(board.canvas.id);
    set_canvas_size();
    window.onresize = set_canvas_size;

    setInterval(board.behave.bind(board), render_interval);

    score_update();
    setInterval(score_update, score_update_interval);
}

if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", main, false);
} else if (document.attachEvent) {
    document.attachEvent("onreadystatechange", main);
} else {
    window.onload = main;
}