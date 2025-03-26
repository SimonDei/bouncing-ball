class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
}

// Die "setup" Funktion wird durch das 2d.js Skript einmal aufgerufen.
// Hier werden alle Vorkehrungen für das Zeichnen getroffen.
function setup() {
  // Erstelle eine Zeichenfläche mit der Größe 800 Pixel in der Breite und
  // 600 Pixel in der Länge.
  createCanvas(800, 600);

  // Zeichne keinen Rahmen um die Formen.
  noStroke();
}

// Die "draw" Funktion wird durch 2d.js immer wieder aufgerufen und zeichnet
// das aktuelle Frame.
function draw() {
  // Setze den Hintergrund auf eine hellblaue Farbe.
  background(SKYBLUE);

  // Setze die Füllfarbe auf rot. Alle nachfolgenden Formen werden in dieser
  // Farbe gezeichnet.
  fill(RED);
  // Zeichne einen Kreis an der Position (100, 100) mit einem Radius von 20.
  circle(100, 100, 20);

  // Setze die Füllfarbe auf magenta.
  fill(MAGENTA);
  // Setzt die Rotation für alle nachfolgenden Formen auf den aktuellen
  // Frame-Count. Dividiere den Frame-Count durch 20, um eine langsame
  // Rotation zu erreichen.
  rotate(frameCount / 20);
  // Zeichne ein Rechteck an der Position (200, 200) mit einer Breite von 200
  rect(200, 200, 200, 100);
}
