class Particle {
  constructor(x, y, speedX, speedY, color) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
    this.size = random(3, 6); // Die Größe des Partikels
    this.lifetime = 255; // Partikel verblassen mit der Zeit
  }

  // Update der Partikelbewegung
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.lifetime -= 5; // Das Partikel verblasst
    this.speedY += 0.1; // Schwerkraft einfügen (leicht nach unten)
  }

  // Zeichnen des Partikels
  draw() {
    fill(makeColor(this.color.red, this.color.green, this.color.blue, this.lifetime));
    ellipse(this.x, this.y, this.size, this.size);
  }

  // Überprüfen, ob das Partikel seine Lebenszeit überschritten hat
  isDead() {
    return this.lifetime <= 0;
  }
}

class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.accelerationX = random([random(-5, -2), random(2, 5)]);
    this.accelerationY = random([random(-5, -2), random(2, 5)]);
    this.particleCount = 15;
    this.particles = []; // Partikel für die Explosion
    this.showParticles = false;
  }

  draw() {
    fill(this.color);
    circle(this.x, this.y, this.radius);

    // Zeichnen und Aktualisieren der Partikel
    for (let particle of this.particles) {
      particle.update();
      particle.draw();
    }

    // Entfernen von Partikeln, die ihre Lebensdauer überschritten haben
    this.particles = this.particles.filter(p => !p.isDead());
  }

  move() {
    this.accelerationY -= 0.2;

    this.x += this.accelerationX;
    this.y += this.accelerationY;
  }

  checkWallCollision() {
    if (this.x > width - this.radius) {
      this.accelerationX *= -1;
      this.x = width - this.radius;
    }

    if (this.x < this.radius) {
      this.accelerationX *= -1;
      this.x = this.radius;
    }

    if (this.y > height - this.radius) {
      this.accelerationY *= -1;
      this.y = height - this.radius;
    }

    if (this.y < this.radius) {
      this.accelerationY *= -1;
      this.y = this.radius;
    }
  }

  checkCircleCollision(other) {
    // Berechne den Abstand zwischen den Mittelpunkten der beiden Kreise
    const dist = Math.sqrt(Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2));

    // Berechne den minimalen Abstand, der den Rand der beiden Kreise berührt
    const minDist = this.radius + other.radius;
    
    // Überprüfe, ob die Kreise sich überlappen. Das passiert, wenn der Abstand zwischen den Mittelpunkten
    // kleiner ist als der kombinierte Radius beider Kreise.
    if (dist < minDist) {
      // Explosion auslösen
      if (this.showParticles) {
        this.explode();
      }

      // Berechne, wie viel die Kreise sich überschneiden (Überlappung)
      const overlap = minDist - dist;
      // Berechne die Richtung der Überlappung, indem wir den Winkel zwischen den beiden Kreismittelpunkten bestimmen
      const angle = Math.atan2(other.y - this.y, other.x - this.x);

      // Berechne, wie viel wir die Kreise entlang dieser Richtung bewegen müssen, um sie zu trennen
      const overlapX = Math.cos(angle) * overlap; // Verschiebung entlang der X-Achse
      const overlapY = Math.sin(angle) * overlap; // Verschiebung entlang der Y-Achse

      // Bewege die beiden Kreise, um den Überlappungsbereich zu beseitigen
      // Wir teilen die Verschiebung durch 2, damit beide Kreise gleichmäßig voneinander wegbewegt werden
      this.x -= overlapX / 2;
      this.y -= overlapY / 2;
      other.x += overlapX / 2;
      other.y += overlapY / 2;

      // Tausche die Geschwindigkeiten (Beschleunigungen) der beiden Kreise, um eine Abstoßung (Sprung) zu simulieren
      // Das bedeutet, dass der eine Kreis in die Richtung des anderen zurückgestoßen wird und umgekehrt
      const tmpAccelerationX = this.accelerationX;
      const tmpAccelerationY = this.accelerationY;

      // Setze die Beschleunigungen der Kreise aufeinander um, damit sie in verschiedene Richtungen fliegen
      this.accelerationX = other.accelerationX;
      this.accelerationY = other.accelerationY;

      // Die Beschleunigungen des zweiten Kreises werden ebenfalls umgedreht
      other.accelerationX = tmpAccelerationX;
      other.accelerationY = tmpAccelerationY;
    }
  }

  // Explosion auslösen: Partikel erzeugen
  explode() {
    for (let i = 0; i < this.particleCount; i++) {
      const speedX = random(-5, 5);
      const speedY = random(-5, 5);
      const particleColor = makeColor(random(0, 255), random(0, 255), random(0, 255));
      this.particles.push(new Particle(this.x, this.y, speedX, speedY, particleColor));
    }
  }
}


const circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 20; i++) {
    const radius = random(25, 50);
    const x = random(0, width - radius * 2);
    const y = random(0, height - radius * 2);
    const color = makeColor(random(0, 255), random(0, 255), random(0, 255));

    circles.push(new Circle(x, y, radius, color));
  }
}

function draw() {
  background(BLACK);

  for (let i = 0; i < circles.length; i++) {
    circles[i].move();
    circles[i].checkWallCollision();
    circles[i].draw();
  }


  for (let i = 0; i < circles.length; i++) {
    for (let j = 0; j < circles.length; j++) {
      if (i === j) {
        continue;
      }
      circles[i].checkCircleCollision(circles[j]);
    }
  }
}

function keyPressed(key) {
  if (key === 'p') {
    for (const ball of circles) {
      ball.showParticles = true;
    }
  }
}
