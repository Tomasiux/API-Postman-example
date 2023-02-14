//npm run dev -> įėjus į tinklapį, cmd bus sugeneruotas deimantas. http://localhost:3000/
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  let output = '';

  function printStar(Star) {
    if (Star === 0) {
      return;
    }
    output += '* ';
    printStar(Star - 1);
  }

  function printSpace(space) {
    if (space === 0) {
      return;
    }
    output += '  ';
    printSpace(space - 1);
  }

  function patternUpper(n, num) {
    if (n === 0) {
      return;
    }
    printSpace(n);
    printStar(2 * (num - n) + 1);
    printSpace(n);
    output += '\n';
    patternUpper(n - 1, num);
  }
  
  function patternLower(n, num) {
    if (n === 0) {
      return;
    }
    printSpace(num - n + 1);
    printStar(2 * n - 1);
    output += '\n';
    patternLower(n - 1, num);
  }

  function pattern(n, num) {
    patternUpper(n, num);
    patternLower(n - 1, num);
  }
  let n = 5;
  pattern(n, n);

  res.send('Patikrinkite konsolę, kad pamatytumėte deimantą.');
  console.log(output)
});

app.listen(3000, () => {
  console.log('Diamond app listening on port 3000!');
});