#include "Keyboard.h"

// set pin numbers for the five buttons:
const int leftButton = 6;
const int rightButton = 5;

long gracePeriodTimer = 0;
long gracePeriod1Amount = 1000;
long gracePeriod2Amount = 2500;

bool leftButtonState, rightButtonState;
bool lastLeftButtonState, lastRightButtonState;
bool bothButtonsPressed, noButtonsPressed;
bool timerStarted = false;

void setup() {
  pinMode(leftButton, INPUT_PULLUP);
  pinMode(rightButton, INPUT_PULLUP);

  Keyboard.begin();
}

void loop() {
  lastLeftButtonState = leftButtonState;
  lastRightButtonState = rightButtonState;

  leftButtonState = digitalRead(leftButton) == LOW;
  rightButtonState = digitalRead(rightButton) == LOW;

  bothButtonsPressed = leftButtonState && rightButtonState;
  noButtonsPressed = !(leftButtonState || rightButtonState);

  if (bothButtonsPressed) {
    if (!timerStarted) {
      gracePeriodTimer = millis();
      timerStarted = true;
    }
  }

  if (!timerStarted) {
    if (leftButtonState != lastLeftButtonState && !leftButtonState) {
      Keyboard.write('e');
    }
    if (rightButtonState != lastRightButtonState && !rightButtonState) {
      Keyboard.write('q');
    }
  }

   if (noButtonsPressed) {
    if (timerStarted && millis() < gracePeriod1Amount + gracePeriodTimer) {
      Keyboard.write(' ');
    }
    else if (timerStarted && millis() < gracePeriod2Amount + gracePeriodTimer) {
      Keyboard.press(KEY_F5);
      Keyboard.releaseAll();
    }
    timerStarted = false;
  }
}
