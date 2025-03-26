class Circle {
  #x;
  #y;
  #accelerationX;
  #accelerationY;
  #radius;
  #color;

  constructor(x, y, radius, color) {
    this.#x = x;
    this.#y = y;
    this.#radius = radius;
    this.#color = color;
    this.#accelerationX = random([random(-5, -2), random(2, 5)]);
    this.#accelerationY = random([random(-5, -2), random(2, 5)]);
  }

  draw() {
    fill(this.#color);
    circle(this.#x, this.#y, this.#radius);
  }

  move() {
    this.#x += this.#accelerationX;
    this.#y += this.#accelerationY;
  }

  checkCollision() {
    if (this.#x > width - this.#radius || this.#x < this.#radius) {
      this.#accelerationX *= -1;
    }

    if ((this.#y > height - this.#radius) || this.#y < this.#radius) {
      this.#accelerationY *= -1;
    }
  }
}

const ball = new Circle(400, 300, 25, RED);

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(BLACK);

  ball.draw();
  ball.move();
  ball.checkCollision();
}
