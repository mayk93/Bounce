/**
 * Created by michael on 05/02/2018.
 */

/* Constants */
let ball_radius = 50;
let ball_start_angle = 0;
let ball_end_angle = 2 * Math.PI;
let gravitational_acceleration = 9.75;

let click_counter = 0;
let ball_counter = 0;

let user = "";
let scores = [];

/* ----- # ----- # ----- # ----- */
/* Ball Class */
/* ----- # ----- # ----- # ----- */
function Ball() {
    this.ball_id = null;
    this.collisions = 0;

    this.current_ball_position_x = null;
    this.current_ball_position_y = null;

    /* Forces */
    this.applied_force_x = 0;
    this.applied_force_y = 0;

    this.force_x = 0;
    this.force_y = 0;

    this.canvas = null;
}

// /* Start Handler section */
Ball.prototype.spawn = function (x, y) {
    this.current_ball_position_x = x;
    this.current_ball_position_y = y;

    /* When we 'spawn' the ball, we drop it, thus we need to apply a little force to it. */
    if (this.canvas) {
        this.force_x = [-1, 1][Math.floor(Math.random() * 2)] * (Math.random() * 25 + 10);
        this.applied_force_y = (1 - (y / this.canvas.height)) * Math.random() * 50 + 25;
    }
};
/* End Handler section */

Ball.prototype.gravity = function () {
    this.current_ball_position_y += gravitational_acceleration;
};

Ball.prototype.bounce = function (other_balls) {
    /* The reason we use ball_radius, for example */
    /* this.current_ball_position_x = ball_radius; */
    /* Is because current_ball_position_x refers to the center of the ball. When we hit, in this example */
    /*
        The left side, we want to reposition the ball a radius away, so it appears as if the side of the ball is stopped
    */

    let self = this;
    let width_limit = this.canvas.width - ball_radius;
    let height_limit = this.canvas.height - ball_radius;

    /* Width */
    if (this.current_ball_position_x - ball_radius < 0) {
        /* Left side */
        this.current_ball_position_x = ball_radius;

        // We want to 'bounce' left with a force equal to the currently applied force.
        this.force_x = this.applied_force_x;
        // Every time we apply the force, we decrease it a little bit.
        this.applied_force_x /= 1.2;
    }
    if (this.current_ball_position_x + ball_radius > width_limit) {
        /* Right side */
        this.current_ball_position_x = width_limit;
        this.force_x = -this.applied_force_x; // We want to 'bounce' right
        this.applied_force_x /= 1.2;
    }

    /* Height */
    if (this.current_ball_position_y - ball_radius < 0) {
        /* Top side */
        this.current_ball_position_y = ball_radius;
        this.force_y = this.applied_force_y; // We want to bounce 'down'
        this.applied_force_y /= 1.2;
    }
    if (this.current_ball_position_y > height_limit) {
        /* Bottom side */
        this.current_ball_position_y = height_limit;
        this.force_y = -this.applied_force_y; // We want to bounce 'up'
        this.applied_force_y /= 1.2;
    }

    if (other_balls) {
        other_balls.map(function (other_ball) {
            if (self.ball_id !== other_ball.ball_id && circles_intersect(
                    self.current_ball_position_x, self.current_ball_position_y,
                    other_ball.current_ball_position_x, other_ball.current_ball_position_y
                )
            ) {
                self.collisions += 1;

                self.force_x = [-1, 1][Math.floor(Math.random() * 2)] * (Math.random() * 25 + 10);
                self.applied_force_y = (1 - (self.current_ball_position_y / self.canvas.height)) * Math.random() * 50 + 25;
            }
        });
    }

    /* Force stop */
    /* In order to avoid perpetual bounce, we just set the applied force to zero once it gets too small. */
    if (this.applied_force_x < 0.1) {
        this.applied_force_x = 0
    }
    if (this.applied_force_y < 0.1) {
        this.applied_force_y = 0
    }
};

Ball.prototype.apply_forces = function () {
    /*
        In this function, we 'apply' the forces to the directions, x and y.
        We apply the force and then decrease it, no we don't apply it forever.
        Because the force can be positive or negative, 'decrease' means either decreasing by one, in the
        case of positive functions or adding by one in the case of negative ones.
    */

    this.current_ball_position_x += this.force_x;
    this.current_ball_position_y += this.force_y;

    if (this.force_x != 0) {
        if (this.force_x > 0) {
            this.force_x -= 1;
        } else if (this.force_x < 0) {
            this.force_x += 1;
        }
    }

    if (this.force_y != 0) {
        if (this.force_y > 0) {
            this.force_y -= 1;
        } else if (this.force_y < 0) {
            this.force_y += 1;
        }
    }
};
/* ----- # ----- # ----- # ----- */

/* ----- # ----- # ----- # ----- */
/* Board Class */
/* ----- # ----- # ----- # ----- */

/* Board class - holds information about the ball and the canvas where it is drawn */
function Board() {
    /* Canvas and context */
    this.canvas = null;
    this.context = null;

    /* Balls */
    this.balls = []
}

/* Start Rendering section */
Board.prototype.clear_canvas = function () {
    this.context.clearRect(
        0, 0, this.canvas.width, this.canvas.height
    );
};

Board.prototype.render_canvas = function () {
    /* There is not point in re rendering when nothing is spawned or nothing is dragged */
    let self = this;

    this.balls.map(function (ball) {
        /*
            This says something like this.
            Consider the point (current_ball_position_x, current_ball_position_y) the center of a circle with radius
            ball_radius.
            Draw the contour of that circle starting at 0 radians ( where sin(x) = 0 and cos(x) = 1 ) and end
            after 2PI radians ( same place, so a full circle )
        */
        if (ball) {
            self.context.beginPath();
            self.context.arc(
                ball.current_ball_position_x, ball.current_ball_position_y,
                ball_radius,
                ball_start_angle, ball_end_angle
            );
            self.context.stroke();
        }
    })
};

Board.prototype.render = function () {
    /* In render, we clear the board and draw again based on the new data*/
    this.clear_canvas();
    this.render_canvas();
};
/* End Rendering section */

Board.prototype.behave = function () {
    let self = this;

    this.balls.map(function (ball) {
        if (ball.collisions > 100) {
            ball = null;
        }

        if (ball) {
            ball.gravity();
            ball.bounce(self.balls);
            ball.apply_forces();
        }
    });

    this.balls = this.balls.filter(function (ball) {
        return ball !== null && ball.collisions < 100;
    });
    ball_counter = this.balls.length;

    document.getElementById("ball_counter").innerHTML = `${ball_counter} balls`;
    document.getElementById("click_counter").innerHTML = `${click_counter} clicks`;

    populate_ledger();

    this.render();
};

Board.prototype.click_handler = function (event) {
    let new_ball = new Ball();
    new_ball.ball_id = (+ new Date()).toString();
    new_ball.canvas = this.canvas;
    new_ball.spawn(event.pageX, event.pageY);

    this.balls.push(new_ball);

    click_counter += 1;
    ball_counter = this.balls.length;
};

/* Functions */
function create_canvas(id="bounce_canvas") {
    // console.log("Creating canvas with id: ", id)

    let new_canvas = document.createElement("canvas");

    new_canvas.setAttribute("id", id);
    new_canvas.setAttribute("class", "canvas_class");

    document.getElementById("main").appendChild(new_canvas);

    return new_canvas;
}

function create_counters() {
    let ball_counter_div = document.createElement("div");
    let click_counter_div = document.createElement("div");

    ball_counter_div.setAttribute("id", "ball_counter");
    click_counter_div.setAttribute("id", "click_counter");

    document.getElementById("main").appendChild(ball_counter_div);
    document.getElementById("main").appendChild(click_counter_div);
}

function create_ledger() {
    let ledger = document.createElement("ul");
    ledger.setAttribute("id", "ledger");

    document.getElementById("main").appendChild(ledger);
}

function populate_ledger() {
    if (scores.length) {
        document.getElementById("ledger").innerHTML = "";
    }

    scores.map(function (score) {
        let score_element = document.createElement("li");
        score_element.innerHTML = `User ${score.user} has ${score.click_counter} click score and ${score.ball_counter} ball score`;
        document.getElementById("ledger").appendChild(score_element);
    });

    scores = [];
}

function create_input() {
    let input_element =  document.createElement("input");
    input_element.setAttribute("id", "input_element");
    input_element.onchange = function (event) {
        user = event.target.value;
    }

    document.getElementById("main").appendChild(input_element);
};

function score_update() {
    console.log('Score update')

    let server = "https://myapps.gallery:8000";
    // let server = "http://localhost:8000";

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            scores = JSON.parse(this.responseText).scores;
        }
    };

    console.log("Sending to");
    console.log(`${server}/scores`)

    xhttp.open("POST", `${server}/scores`, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({"user": user, "click_counter": click_counter, "ball_counter": ball_counter}));
}

function _set_canvas_size(canvas_id) {
    return function () {
        // console.log('Executing set size with id ', canvas_id)

        let canvas = document.getElementById(canvas_id);
        let canvas_width = window.innerWidth - 50;
        let canvas_height = window.innerHeight - 50;

        canvas.setAttribute("width", canvas_width);
        canvas.setAttribute("height", canvas_height);
    }
}

function circles_intersect(circle_a_x, circle_a_y, circle_b_x, circle_b_y) {
    let circle_point = Math.pow((circle_a_x - circle_b_x), 2) + Math.pow((circle_a_y - circle_b_y), 2);

    if (circle_point < 0) {
        return false;
    } else if (circle_point > Math.pow(2 * ball_radius, 2)) {
        return false;
    }

    return true;
}