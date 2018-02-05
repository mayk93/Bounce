# Bounce
A simulation of a bouncing ball.

<div>
    <p>Status</p>
</div>

<div style="padding: 5px">
    <a href="https://travis-ci.org/mayk93/Bounce">
        <img src="https://travis-ci.org/mayk93/Bounce.svg?branch=master">
    </a>
</div>

<div style="padding: 5px">
    <a href="https://coveralls.io/github/mayk93/Bounce?branch=master">
        <img src="https://coveralls.io/repos/github/mayk93/Bounce/badge.svg?branch=master">
    </a>
</div>

---

Installation:

1. `git clone git@github.com:mayk93/Bounce.git`

2. `cd Bounce/Simple`

3. `bash jasmine_setup.sh`

This setup should be sufficient to view `index.html` and `index_test.html`.
The `index.html` file does not run the unit tests while `index_test.html` does.

You can also run `npm install` in `Bounce/Simple` and run `npm test`.

Please note, the test suite that is run by node is only partially complete.

The project uses `HTML canvas` and obviously, the `DOM`. Some functions are tested with `JSDOM`
but other tests have been disabled. The tests for the `Board` class are enabled.
   
---

How it works:

The project is set up like this. I will be referring to `index.html`. The different between
`index.html` and `index_test.html` is that `index_test.html` imports `jasmine` and runs the `specs`.
 
The `HTML` file references two javascript files, `bounce.js` and `bounce_logic.js`. The first file,
`bounce.js` contains a class definition and utility function definitions. The other file, `bounce_logic.js`
makes uses of the class and the functions.

The class `Board` is a manager for the canvas and the balls. It keeps track of the balls and the application
of forces for each individual ball. By application I mean indirectly, it ensures each individual ball
invokes it's force application method.

Rendering is handled by the `Board` it's self, by cleaning the entire canvas and redrawing the balls in
the correct position.

The class `Ball` is a representation of each individual ball. It keeps track of it's own position and
the forces that are applied to it. It also keeps a id, used to ensure collisions are not counted 
against it's self and a collision counter, to destroy balls that are stuck in a collision loop.

I have also deployed the project on a amazon instance that I rent. The setup is rather simple, I use
`nginx` to serve files and used `Let's Encrypt` in order to get `SSL` certificates.

---

Deployment:

A demo of the project can be seen on my [website](https://myapps.gallery/).

---
   
---
   
Notes:
---

The file `imagediff.js` is **NOT** written by me. It is only used as part of the unit tests.
I have included this file in order to compare two images, as part of a unit test.

One image, the expected one, is the canvas with the ball spawned in a pre determined position. 
The second image is obtained by the unit test after running the code that is supposed to spawn the
ball in the pre determined location.
 
Comparing those two images should yield no difference, because the ball should look the same and
it should be in the same place.

Source: [Github](https://github.com/HumbleSoftware/js-imagediff) 

Site / demo: [js-imagediff](http://humblesoftware.github.io/js-imagediff/)

---