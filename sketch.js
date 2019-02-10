var Engine = Matter.Engine,
    Bodies = Matter.Bodies,
    World = Matter.World;

var width;
var height;

const peg_radius = 8;
const ball_radius = 6;
const spacing = 30;

var ball_rate;
var speed;
var clearButton;
var buckets = true;

var boundaries;
var balls;
var pegs;

let engine;
let world;


function setup()
{
    frameRate(60);
    width = window.innerWidth * 0.3;
    height = window.innerHeight * 0.8;

    createCanvas(width, height);

    clearButton = createButton("Clear balls");
    clearButton.position(width - 100, height + 50);
    clearButton.mousePressed(clearBalls);

    bucketsButton = createButton("Toggle buckets");
    bucketsButton.position(width - 100, height + 100);
    bucketsButton.mousePressed(toggleBuckets);

    createP("Change these as you wish. Beware might cause low framerate.");
    createP("Ball Rate");
    ball_rate = createSlider(5, 120, 110);

    createP("Speed");
    speed = createSlider(1, 5, 1);


    setupWorld()
}

function setupWorld()
{
    boundaries = [];
    balls = [];
    pegs = [];
    engine = Engine.create({enableSleeping: true});
    world = engine.world;

    var left_ramp = new Boundary(width * 0.23, height * 0.079, width * 0.53, 5, 0.3);
    var right_ramp = new Boundary(width * 0.79, height * 0.079, width * 0.53, 5, - 0.3);

    var ground = new Boundary(width / 2, height, width, 10, 0);

    boundaries.push(left_ramp);
    boundaries.push(right_ramp);

    boundaries.push(ground);

    var cols = floor(width / 11);
    var rows = floor(height * 0.02);

    for(var j = 1; j < rows; j++)
    {
        var extra = 0;
        for(var i = 1; i < cols + extra; i++)
        {
            var x = i * spacing;

            if(j % 2 == 0)
            {
                extra = 1;
                x -= spacing / 2;
            }

            var y = height * 0.17 + j * spacing;

            if(x > width * 0.99)
                break;

            pegs.push(new Peg(x, y, peg_radius));
        }
        extra = 0;
    }


    for(var i = 0; i < cols - 3; i++)
    {
        var space = width / 11;
        var x = i * space;
        var y = height * 0.9;

        boundaries.push(new Boundary(x, y, 5, height * 0.2, 0));
    }
}

function toggleBuckets()
{
    if(buckets)
    {
        buckets = false;
        world.bodies.splice(2, 1);
        boundaries.splice(2, 1);
    }
    else
    {
        buckets = true;
        setupWorld();
    }
}

function clearBalls()
{
    balls = []; 
    world.bodies.splice(pegs.length + boundaries.length + 1, world.bodies.length - pegs.length + boundaries.length + 2);
}

function clearOffScreenBalls()
{
    for(var i = 0; i < balls.length; i++)
    {
        if(balls[i].body.position.y > height + 100)
        {
            world.bodies.splice(i, 1);
            balls.splice(i, 1);
        }
    }
}

function addBall()
{
    if(frameCount % map(ball_rate.value(), 5, 120, 120, 5) == 0)
    {
        var rand = 0;
        if(random(1) < 0.5)
            rand = 1;

        var ball = new Ball(random(20, width - 20), height * 0.01, ball_radius);
        balls.push(ball);
    }
}

function draw()
{
    for(var i = 0; i < speed.value(); i++)
    {
        background(0);

        clearOffScreenBalls();

        Engine.update(engine, 1000 / 60);

        addBall();

        for(b of boundaries)
            b.show();

        for(p of pegs)
            p.show();

        for(b of balls)
            b.show();
    }
}