/**
 * Created by michael on 05/02/2018.
 */

/**
 * Created by michael on 05/02/2018.
 */

const bounce = require('../bounce_lib');
const {Ball, _set_canvas_size, circles_intersect} = bounce;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM("<!DOCTYPE html><html lang='en'><head></head><body><div id='main'></div></body></html>");
const document = dom.window.document;

let test_bounce_canvas_id = "test_bounce_canvas";

describe("Canvas size", function () {
    it("should return a function based on the id we give it", function () {
        let canvas_size_function = _set_canvas_size(test_bounce_canvas_id);

        expect(canvas_size_function).toBeDefined();
        expect(typeof canvas_size_function).toEqual("function");
    });
});

describe("Ball", function () {
    let ball = new Ball();

    it("should be in a uninitialized state", function () {
        expect(ball.ball_id).toEqual(null);
        expect(ball.current_ball_position_x).toEqual(null);
        expect(ball.current_ball_position_y).toEqual(null);
        expect(ball.canvas).toEqual(null);
    });

    it("should be able to spawn the ball", function () {
        let x = 10;
        let y = 20;

        ball.spawn(x, y);

        expect(ball.current_ball_position_x).toEqual(x);
        expect(ball.current_ball_position_y).toEqual(y);
    });
});

describe("Functions", function () {
        /*
        0 1 2 3 4 5 6 7
        1
        2     .
        3   . x .
        4     . x .
        5       .
        6
        7
        */

    afterEach(function () {
        let canvas = document.getElementById(test_bounce_canvas_id);
        if (canvas) {
            canvas.parentNode.removeChild(canvas);
        }
    });

    it("should intersect", function () {
        expect(circles_intersect(3, 3, 4, 4)).toEqual(true);
    });

    it("should not intersect", function () {
        expect(circles_intersect(3, 3, 40, 40)).toEqual(true);
    });
});