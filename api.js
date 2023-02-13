const express = require('express');
const app = express();

app.get('/', (req, res) => {
  let output = '';

  function printAsterisk(asterisk) {
    if (asterisk === 0) {
      return;
    }
    output += '* ';
    printAsterisk(asterisk - 1);
  }

  function printSpace(space) {
    if (space === 0) {
      return;
    }
    output += '&nbsp;&nbsp;&nbsp;';
    printSpace(space - 1);
  }

  function patternUpper(n, num) {
    if (n === 0) {
      return;
    }
    printSpace(n);
    printAsterisk(2 * (num - n) + 1);
    printSpace(n);
    output += '<br>';
    patternUpper(n - 1, num);
  }
  
  function patternLower(n, num) {
    if (n === 0) {
      return;
    }
    printSpace(num - n + 1);
    printAsterisk(2 * n - 1);
    output += '<br>';
    patternLower(n - 1, num);
  }

  function pattern(n, num) {
    patternUpper(n, num);
    patternLower(n - 1, num);
  }
  let n = 5;
  pattern(n, n);

  res.send(`${output}`);
});

app.listen(3000, () => {
  console.log('Diamond app listening on port 3000!');
});