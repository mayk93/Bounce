/**
 * Created by michael on 05/02/2018.
 */

/**
 * Created by michael on 05/02/2018.
 */

const bounce = require('../bounce_lib');
const {Board, create_canvas, _set_canvas_size, in_ball} = bounce;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM("<!DOCTYPE html><html lang='en'><head></head><body><div id='main'></div></body></html>");
const document = dom.window.document;

/* JS DOM appears to need HTMLCanvasElement.prototype.getContext from the canvas package to work */
/* Those tests will be commented out momentarily */

// describe("Canvas Creation", function () {
//     let main;
//     let canvas;
//
//     beforeEach(function () {
//         /* Delete the canvas if it exists */
//         main = document.getElementById("main");
//         canvas = document.getElementById("test_bounce_canvas");
//         if (canvas) {
//             canvas.parentNode.removeChild(canvas);
//         }
//     });
//
//     it("should not have a canvas", function () {
//         /* We check specifically for test_bounce_canvas */
//         expect(main.childNodes.length).toEqual(0);
//         expect(document.getElementById("test_bounce_canvas")).toBeNull();
//     });
//
//     it("should have a canvas child after initialization", function () {
//         create_canvas(document, "test_bounce_canvas");
//         expect(main.childNodes.length).toEqual(1);
//         expect(document.getElementById("test_bounce_canvas")).toBeDefined();
//     })
// });

describe("Canvas size", function () {
    let main;
    let canvas;

    beforeEach(function () {
        /* Delete the canvas if it exists and create it again. */
        main = document.getElementById("main");
        canvas = document.getElementById("test_bounce_canvas");
        if (canvas) {
            canvas.parentNode.removeChild(canvas);
            create_canvas(document, "test_bounce_canvas");
            canvas = document.getElementById("test_bounce_canvas");
        }
    });

    it("should return a function based on the id we give it", function () {
        let canvas_id = "test_bounce_canvas";
        let canvas_size_function = _set_canvas_size(document, canvas_id);

        expect(canvas_size_function).toBeDefined();
        expect(typeof canvas_size_function).toEqual("function");
    });

    // it("should set the size of the canvas", function () {
    //     // We run the function and check to see those attributes have been added.
    //     // Since create_canvas does not set size, we know those must have been set by canvas_size_function
    //
    //     let canvas_id = "test_bounce_canvas";
    //     let canvas_size_function = _set_canvas_size(document, canvas_id);
    //
    //     canvas_size_function();
    //
    //     expect(canvas.width).toBeDefined();
    //     expect(canvas.height).toBeDefined();
    // });
});

describe("Board", function () {
    let board;
    let canvas;

    beforeEach(function () {
        board = new Board();
        canvas = document.getElementById("test_bounce_canvas");
        if (canvas) {
            canvas.parentNode.removeChild(canvas);
        }
    });

    afterEach(function () {
        canvas = document.getElementById("test_bounce_canvas");
        if (canvas) {
            canvas.parentNode.removeChild(canvas);
        }
    });

    it("should be in a uninitialized state", function () {
        expect(board.spawned).toEqual(false);
        expect(board.current_ball_position_x).toEqual(null);
        expect(board.current_ball_position_y).toEqual(null);
        expect(board.canvas).toEqual(null);
        expect(board.context).toEqual(null);
    });

    // it("should be aware of the canvas and context once create canvas is set", function () {
    //     expect(board.canvas).toEqual(null);
    //     expect(board.context).toEqual(null);
    //
    //     board.canvas = create_canvas(document, "test_bounce_canvas");
    //     board.context = board.canvas.getContext("2d");
    //
    //     expect(board.canvas).not.toBeNull();
    //     expect(board.context).not.toBeNull();
    // });

    it("should be able to spawn the ball", function () {
        let x = 10;
        let y = 20;

        board.spawn(x, y);

        expect(board.spawned).toEqual(true);
        expect(board.current_ball_position_x).toEqual(x);
        expect(board.current_ball_position_y).toEqual(y);
    });

    /* Important note! */
    /* The test immediately bellow is inspired by this article */
    /* https://github.com/HumbleSoftware/js-imagediff */
    /* http://humblesoftware.github.io/js-imagediff/test.html */

    /* Image diff is not written by me, just used here. */

    // it("should be able to draw the ball", function () {
    //
    //     /*
    //         What we do is something like this:
    //
    //         1. Load the expect image.
    //         2. Tell the board to spawn the ball at a pre determined position.
    //         3. Ensure that the canvas with a ball spawned at a pre determined position looks exactly like
    //            the image we expect.
    //         4. We do this by checking the diff, given by imagediff.
    //     */
    //
    //     let expected_image = new Image(10, 10);
    //     let actual_image = new Image(10, 10);
    //
    //     let actual_image_data;
    //
    //     let diff;
    //
    //     let x = 150;
    //     let y = 150;
    //
    //     expected_image.src = "tests/ball_expect.png";
    //
    //     board.canvas = create_canvas(document, "test_bounce_canvas");
    //     board.context = board.canvas.getContext("2d");
    //
    //     _set_canvas_size(document, "test_bounce_canvas")();
    //
    //     board.spawn(x, y);
    //     board.render_canvas();
    //
    //     actual_image_data = document.getElementById("test_bounce_canvas").toDataURL("img/png");
    //     actual_image.src = actual_image_data;
    //
    //     diff = imagediff.diff(
    //         actual_image,
    //         expected_image
    //     );
    //
    //     expect(diff).toBeDefined();
    //
    //     diff.data.map(function (point, index) {
    //         /* In order to ensure the diff shows equal images, we want to check if every point is empty */
    //         /* That is, 0, 0, 0, 255 (RGBA) */
    //         /*
    //             diff.data does not have shape [[], []] ( list o points ) instead has a list of ints,
    //             every 4 making a point
    //         */
    //
    //         if (index % 4 == 3) {
    //             expect(point).toEqual(255);
    //         } else {
    //             expect(point).toEqual(0);
    //         }
    //     })
    //
    // });
});

describe("Mechanics", function () {
    let board;
    let canvas;

    beforeEach(function () {
        board = new Board();
        canvas = document.getElementById("test_bounce_canvas");
        if (canvas) {
            canvas.parentNode.removeChild(canvas);
        }
    });

    afterEach(function () {
        canvas = document.getElementById("test_bounce_canvas");
        if (canvas) {
            canvas.parentNode.removeChild(canvas);
        }
    });

    it("should bounce when hitting the sides", function () {
        let x = 10;
        let y = 20;
        let canvas_size_function;

        board.spawn(x, y);

        board.canvas = create_canvas(document, "test_bounce_canvas");
        board.context = board.canvas.getContext("2d");

        canvas_size_function = _set_canvas_size(document, board.canvas.id);
        canvas_size_function();

        expect(board.current_ball_position_x).toEqual(10);
        expect(board.current_ball_position_y).toEqual(20);

        /* Here, we 'try' to go over the border */
        board.current_ball_position_x = board.canvas.width + 5000;
        board.current_ball_position_y = board.canvas.height + 5000;

        board.applied_force_x = 100;

        board.bounce();

        /*
            We expect the following after bouncing once with applied force 100:

            1. We expect the values of the ball, current_x, current_y to be reset to the maximum admissible values.

            2. We expect the applied_force on x to have been reduced.

            3. We expect force_x ( what apply_forces would actually apply ) to be the original applied_force_x,
               except in negative, since we are hitting the right side.
        */

        /* 1 */
        let expected_x = board.canvas.width - board.ball_radius;
        let expected_y = board.canvas.height - board.ball_radius;

        expect(board.current_ball_position_x).toEqual(expected_x);
        expect(board.current_ball_position_y).toEqual(expected_y);

        /* 2 */
        expect(board.applied_force_x).toEqual(100 / 1.2);

        /* 3 */
        expect(board.force_x).toEqual(-100);
    });

    it("should bounce when hitting the bottom", function () {
        let x = 10;
        let y = 20;
        let canvas_size_function;

        board.spawn(x, y);

        board.canvas = create_canvas(document, "test_bounce_canvas");
        board.context = board.canvas.getContext("2d");

        canvas_size_function = _set_canvas_size(document, board.canvas.id);
        canvas_size_function();

        expect(board.current_ball_position_x).toEqual(10);
        expect(board.current_ball_position_y).toEqual(20);

        /* Here, we 'try' to go over the bottom */
        board.current_ball_position_y = board.canvas.height + 5000;

        board.applied_force_y = 150;

        board.bounce();

        /*
            We expect the following after bouncing once with applied force 100:

            1. We expect the current_y value to be reset to the maximum admissible value.

            2. We expect the applied_force on y to have been reduced.

            3. We expect force_y to be the original applied_force_y, but negative.
        */

        /* 1 */
        let expected_y = board.canvas.height - board.ball_radius;

        expect(board.current_ball_position_y).toEqual(expected_y);

        /* 2 */
        expect(board.applied_force_y).toEqual(150 / 1.2);

        /* 3 */
        expect(board.force_y).toEqual(-150);
    });
});

describe("Functions", function () {
        /*
        0 1 2 3 4 5 6 7
        1
        2     .
        3   . x .
        4     .
        5
        6
        7
        */

    it("should be in the ball", function () {
        expect(in_ball(3, 3, 1, 2.8, 2.4)).toEqual(true);
    });

    it("should not be in the ball", function () {
        expect(in_ball(3, 3, 1, 21.8, 42.4)).toEqual(false);
    });
});