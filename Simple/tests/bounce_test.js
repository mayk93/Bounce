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
