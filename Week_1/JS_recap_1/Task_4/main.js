const score = prompt('Enter course assessment score (0-100): ');

function determineTheGrade(score) {
  score = parseFloat(score);
  let grade;

  if (score >= 0 && score <= 39) {
    grade = 0;
  } else if (score >= 40 && score <= 51) {
    grade = 1;
  } else if (score >= 52 && score <= 63) {
    grade = 2;
  } else if (score >= 64 && score <= 75) {
    grade = 3;
  } else if (score >= 76 && score <= 87) {
    grade = 4;
  } else {
    grade = 5;
  }

  document.querySelector('p').innerText = 'Grade: ' + grade;
}
determineTheGrade(score);
