checkCircleCollision(other) {
    // Berechne den Abstand zwischen den Mittelpunkten der beiden Kreise
    const dist = Math.sqrt(Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2));

    // Berechne den minimalen Abstand, der den Rand der beiden Kreise berührt
    const minDist = this.radius + other.radius;
    
    // Überprüfe, ob die Kreise sich überlappen. Das passiert, wenn der Abstand zwischen den Mittelpunkten
    // kleiner ist als der kombinierte Radius beider Kreise.
    if (dist < minDist) {
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
