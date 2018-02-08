/**
 * Created by michael on 08/02/2018.
 */

export let circles_intersect = (circle_a_x, circle_a_y, circle_b_x, circle_b_y, ball_radius) => {
    let circle_point = Math.pow((circle_a_x - circle_b_x), 2) + Math.pow((circle_a_y - circle_b_y), 2);

    if (circle_point < 0) {
        return false;
    } else if (circle_point > Math.pow(2 * ball_radius, 2)) {
        return false;
    }

    return true;
};