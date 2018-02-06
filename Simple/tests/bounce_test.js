/**
 * Created by michael on 05/02/2018.
 */

let test_bounce_canvas_id = "test_bounce_canvas";

describe("Canvas Creation", function () {
    let main;
    let canvas;

    beforeEach(function () {
        /* Delete the canvas if it exists */
        main = document.getElementById("main");
        canvas = document.getElementById(test_bounce_canvas_id);
        if (canvas) {
            canvas.parentNode.removeChild(canvas);
        }
    });

    afterEach(function () {
        canvas = document.getElementById(test_bounce_canvas_id);
        if (canvas) {
            canvas.parentNode.removeChild(canvas);
        }
    });

    it("should not have a canvas", function () {
        /* We check specifically for test_bounce_canvas */
        expect(main.childNodes.length).toEqual(3);
        expect(main.childNodes[0].id).not.toEqual(test_bounce_canvas_id);
        expect(document.getElementById(test_bounce_canvas_id)).toBeNull();
    });

    it("should have a canvas child after initialization", function () {
        create_canvas(test_bounce_canvas_id);
        expect(main.childNodes.length).toEqual(4);
        expect(document.getElementById(test_bounce_canvas_id)).toBeDefined();
    })
});

describe("Canvas size", function () {
    let main;
    let canvas;

    beforeEach(function () {
        /* Delete the canvas if it exists and create it again. */
        main = document.getElementById("main");
        canvas = document.getElementById(test_bounce_canvas_id);
        if (canvas) {
            canvas.parentNode.removeChild(canvas);
            create_canvas(test_bounce_canvas_id);
            canvas = document.getElementById(test_bounce_canvas_id);
        } else {
            canvas = create_canvas(test_bounce_canvas_id);
        }
    });

    afterEach(function () {
        canvas = document.getElementById(test_bounce_canvas_id);
        if (canvas) {
            canvas.parentNode.removeChild(canvas);
        }
    });

    it("should return a function based on the id we give it", function () {
        let canvas_size_function = _set_canvas_size(test_bounce_canvas_id);

        expect(canvas_size_function).toBeDefined();
        expect(typeof canvas_size_function).toEqual("function");
    });

    it("should set the size of the canvas", function () {
        // We run the function and check to see those attributes have been added.
        // Since create_canvas does not set size, we know those must have been set by canvas_size_function

        let canvas_size_function = _set_canvas_size(test_bounce_canvas_id);
        canvas_size_function();

        expect(canvas.width).toBeDefined();
        expect(canvas.height).toBeDefined();
    });
});

describe("Ball", function () {
    let ball;
    let main;
    let canvas;

    beforeEach(function () {
        ball = new Ball();
        main = document.getElementById("main");
        canvas = document.getElementById(test_bounce_canvas_id);
        if (canvas) {
            canvas.parentNode.removeChild(canvas);
            create_canvas(test_bounce_canvas_id);
            canvas = document.getElementById(test_bounce_canvas_id);
        }
    });

    afterEach(function () {
        canvas = document.getElementById(test_bounce_canvas_id);
        if (canvas) {
            canvas.parentNode.removeChild(canvas);
        }
    });

    it("should be in a uninitialized state", function () {
        expect(ball.ball_id).toEqual(null);
        expect(ball.current_ball_position_x).toEqual(null);
        expect(ball.current_ball_position_y).toEqual(null);
        expect(ball.canvas).toEqual(null);
    });

    it("should be aware of the canvas and context once create canvas is set", function () {
        expect(ball.canvas).toEqual(null);

        ball.canvas = create_canvas(test_bounce_canvas_id);

        expect(ball.canvas).not.toBeNull();
    });

    it("should be able to spawn the ball", function () {
        let x = 10;
        let y = 20;

        ball.spawn(x, y);

        expect(ball.current_ball_position_x).toEqual(x);
        expect(ball.current_ball_position_y).toEqual(y);
    });
});

describe("Board", function () {
    let board;
    let main;
    let canvas;

    beforeEach(function () {
        board = new Board();
        main = document.getElementById("main");
        canvas = document.getElementById(test_bounce_canvas_id);
        if (canvas) {
            canvas.parentNode.removeChild(canvas);
            create_canvas(test_bounce_canvas_id);
            canvas = document.getElementById(test_bounce_canvas_id);
        }
    });

    afterEach(function () {
        canvas = document.getElementById(test_bounce_canvas_id);
        if (canvas) {
            canvas.parentNode.removeChild(canvas);
        }
    });

    /* Important note! */
    /* The test immediately bellow is inspired by this article */
    /* https://github.com/HumbleSoftware/js-imagediff */
    /* http://humblesoftware.github.io/js-imagediff/test.html */

    /* Image diff is not written by me, just used here. */

    it("should be able to draw the ball", function () {

        /*
            What we do is something like this:

            1. Load the expect image.
            2. Tell the board to spawn the ball at a pre determined position.
            3. Ensure that the canvas with a ball spawned at a pre determined position looks exactly like
               the image we expect.
            4. We do this by checking the diff, given by imagediff.
        */

        let expected_image = new Image(10, 10);
        let actual_image = new Image(10, 10);

        let actual_image_data;

        let diff;

        let x = 150;
        let y = 150;

        let new_ball;

        expected_image.src = "tests/ball_expect.png";

        board.canvas = create_canvas(test_bounce_canvas_id);
        board.context = board.canvas.getContext("2d");

        _set_canvas_size(test_bounce_canvas_id)();


        new_ball = new Ball();
        new_ball.ball_id = (+ new Date()).toString();
        new_ball.canvas = board.canvas;
        new_ball.spawn(x, y);

        board.balls.push(new_ball);
        board.render_canvas();

        actual_image_data = document.getElementById(test_bounce_canvas_id).toDataURL("img/png");
        actual_image.src = actual_image_data;

        diff = imagediff.diff(
            actual_image,
            expected_image
        );

        console.log('Look at diff.data:')
        console.log('Diff: ', diff)

        expect(diff).toBeDefined();

        diff.data.map(function (point, index) {
            /* In order to ensure the diff shows equal images, we want to check if every point is empty */
            /* That is, 0, 0, 0, 255 (RGBA) */
            /*
                diff.data does not have shape [[], []] ( list o points ) instead has a list of ints,
                every 4 making a point
            */

            if (index % 4 == 3) {
                expect(point).toEqual(255);
            } else {
                expect(point).toEqual(0);
            }
        })

    });
});

describe("Mechanics", function () {
    let board;
    let main;
    let canvas;

    beforeEach(function () {
        board = new Board();
        main = document.getElementById("main");
        canvas = document.getElementById(test_bounce_canvas_id);
        if (canvas) {
            canvas.parentNode.removeChild(canvas);
            create_canvas(test_bounce_canvas_id);
            canvas = document.getElementById(test_bounce_canvas_id);
        }
    });

    afterEach(function () {
        canvas = document.getElementById(test_bounce_canvas_id);
        if (canvas) {
            canvas.parentNode.removeChild(canvas);
        }
    });

    it("should bounce when hitting the sides", function () {
        let x = 10;
        let y = 20;
        let canvas_size_function;

        let new_ball;

        board.canvas = create_canvas(test_bounce_canvas_id);
        board.context = board.canvas.getContext("2d");

        canvas_size_function = _set_canvas_size(test_bounce_canvas_id);
        canvas_size_function();

        new_ball = new Ball();
        new_ball.ball_id = (+ new Date()).toString();
        new_ball.canvas = board.canvas;
        new_ball.spawn(x, y);

        board.balls.push(new_ball);

        expect(board.balls[0].current_ball_position_x).toEqual(10);
        expect(board.balls[0].current_ball_position_y).toEqual(20);

        /* Here, we 'try' to go over the border */
        board.balls[0].current_ball_position_x = board.canvas.width + 5000;
        board.balls[0].current_ball_position_y = board.canvas.height + 5000;

        board.applied_force_x = 100;

        board.balls[0].bounce();

        /*
            We expect the following after bouncing once with applied force 100:

            1. We expect the values of the ball, current_x, current_y to be reset to the maximum admissible values.
        */

        /* 1 */
        let expected_x = board.canvas.width - ball_radius;
        let expected_y = board.canvas.height - ball_radius;

        expect(board.balls[0].current_ball_position_x).toEqual(expected_x);
        expect(board.balls[0].current_ball_position_y).toEqual(expected_y);
    });

    it("should bounce when hitting the bottom", function () {
        let x = 10;
        let y = 20;
        let canvas_size_function;

        let new_ball;

        board.canvas = create_canvas(test_bounce_canvas_id);
        board.context = board.canvas.getContext("2d");

        new_ball = new Ball();
        new_ball.ball_id = (+ new Date()).toString();
        new_ball.canvas = board.canvas;
        new_ball.spawn(x, y);

        board.balls.push(new_ball);

        canvas_size_function = _set_canvas_size(board.canvas.id);
        canvas_size_function();

        expect(board.balls[0].current_ball_position_x).toEqual(10);
        expect(board.balls[0].current_ball_position_y).toEqual(20);

        /* Here, we 'try' to go beneath the floor */
        board.balls[0].current_ball_position_y = board.canvas.height + 5000;

        board.applied_force_y = 100;

        board.balls[0].bounce();

        /*
            We expect the following after bouncing once with applied force 100:

            1. We expect the values of the ball, current_x, current_y to be reset to the maximum admissible values.
        */

        /* 1 */
        let expected_y = board.canvas.height - ball_radius;

        expect(board.balls[0].current_ball_position_y).toEqual(expected_y);
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