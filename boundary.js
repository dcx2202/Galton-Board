class Boundary
{
    constructor(x, y, w, h, a)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.a = a;

        this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, {isStatic: true, angle: a, friction: 0});
        World.add(world, this.body);
    }

    show()
    {
        push();
        colorMode(RGB);
        translate(this.body.position.x, this.body.position.y);
        rotate(this.a);
        rectMode(CENTER);
        noStroke()
        fill(150, 150, 150);
        rect(0, 0, this.w, this.h);
        pop();
    }
}