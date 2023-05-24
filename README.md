# 25-5-Clock
## Made for the FCC challenge "25+5 Clock"
https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-25--5-clock

Note: The test suite reports that 27 of 29 tests are passing. However, as far as I can tell, the remaining two tests should pass as well as the user stories are met.
- The time-left label is in the correct mm:ss format for all relevant numbers. The error reported as `25 should equal 60` does not seem accurate as 60 can be represented on the timers.
- The audio that should pause and rewind to the beginning when you hit the reset button does do so. The error `the audio does not stop when reset is pressed` does not seem accurate as the audio is stopped when you hit reset.

Built with React and Vite
