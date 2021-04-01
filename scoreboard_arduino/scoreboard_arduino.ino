#include "Keyboard.h"

// set pin numbers for the five buttons:
const int leftButton = 4;
const int rightButton = 5;

void setup() {
  pinMode(leftButton, INPUT);
  pinMode(rightButton, INPUT);

  Keyboard.begin();
}

void loop() {
  if (digitalRead(leftButton) == HIGH) {
    Keyboard.write('e');
  }
  if (digitalRead(rightButton) == HIGH) {
    Keyboard.write('q');
  }
}
