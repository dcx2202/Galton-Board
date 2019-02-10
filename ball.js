class Ball
{
    constructor(x, y, r)
    {
        this.x = x;
        this.y = y;
        this.r = r;
        this.hue = random(360);

        this.body = Bodies.circle(this.x, this.y, this.r, {friction: 0, density: 0.6, restitution: 0.3});
        World.add(world, this.body);

        this.lastCollision = 0;
    }

    show()
    {
        push();
        colorMode(HSB);
        noStroke()
        fill(this.hue, 255, 255);
        translate(this.body.position.x, this.body.position.y);
        ellipse(0, 0, this.r * 2);
        pop();
    }
}