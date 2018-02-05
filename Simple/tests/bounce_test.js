/**
 * Created by michael on 05/02/2018.
 */

describe("Canvas Creation", function () {
    let main;
    let canvas;

    beforeEach(function () {
        /* Delete the canvas if it exists */
        main = document.getElementById("main");
        canvas = document.getElementById("bounce_canvas");
        if (canvas) {
            canvas.parentNode.removeChild(canvas);
        }
    });

    it("should not have a canvas", function () {
        /* If it has no children, it has no canvas child */
        expect(main.childNodes.length).toEqual(0);
        expect(document.getElementById("bounce_canvas")).toBeNull();
    });

    it("should have a canvas child after initialization", function () {
        create_canvas();
        expect(main.childNodes.length).toEqual(1);
        expect(document.getElementById("bounce_canvas")).toBeDefined(null);
    })
});

describe("Canvas size", function () {
    let main;
    let canvas;

    beforeEach(function () {
        /* Delete the canvas if it exists and create it again. */
        main = document.getElementById("main");
        canvas = document.getElementById("bounce_canvas");
        if (canvas) {
            canvas.parentNode.removeChild(canvas);
            create_canvas();
            canvas = document.getElementById("bounce_canvas");
        }
    });

    it("should return a function based on the id we give it", function () {
        let canvas_id = "bounce_canvas";
        let canvas_size_function = _set_canvas_size(canvas_id);

        expect(canvas_size_function).toBeDefined();
        expect(typeof canvas_size_function).toEqual("function");
    });

    it("should set the size of the canvas", function () {
        // We run the function and check to see those attributes have been added.
        // Since create_canvas does not set size, we know those must have been set by canvas_size_function

        let canvas_id = "bounce_canvas";
        let canvas_size_function = _set_canvas_size(canvas_id);

        canvas_size_function();

        expect(canvas.width).toBeDefined();
        expect(canvas.height).toBeDefined();
    });
});

describe("Bounce", function () {
    let board;

    beforeEach(function () {
        board = new Board();
    });

    it("should be in a uninitialized state", function () {
        expect(board.spawned).toEqual(false);
        expect(board.current_ball_position_x).toEqual(null);
        expect(board.current_ball_position_y).toEqual(null);
    });
});
