class Peg
{
    constructor(x, y, r)
    {
        this.x = x;
        this.y = y;
        this.r = r;

        this.body = Bodies.circle(this.x, this.y, this.r, {isStatic: true, friction: 0.8});
        World.add(world, this.body);
    }

    show()
    {
        push();
        colorMode(RGB);
        noStroke()
        fill(100, 100, 100);
        translate(this.body.position.x, this.body.position.y);
        ellipse(0, 0, this.r * 2);
        pop();
    }
}