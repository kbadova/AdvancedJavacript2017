const fs = require('fs');

readData = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error(err));
        return;
      }

      resolve(data.split('\n'));
      return;
    });
  });
};

function solution() {
  var studentsData = readData('./students.txt');
  var scoresData = readData('./scores.txt');

  Promise.all([studentsData, scoresData]).then(values => {
    var allStudents = values[0];
    var allScores = values[1];

    var studentsWithFn = allStudents.map(student => {
      var fn = student.split(' ', 1)[0];
      var name = student
        .split(' ')
        .slice(1)
        .join(' ');
      return Object.assign({}, {name: name, fn: Number(fn)});
    });

    var fnWithScores = allScores.map(studentLine => {
      var fn = studentLine.split(' ', 1)[0];
      var scoresPerFn = studentLine.split(' ').slice(1);
      var average = scoresPerFn.reduce(
        (acc, number) => Number(acc) + Number(number),
        0
      );
      return Object.assign({}, {fn: fn, average: average / 3});
    });

    studentsWithFn.map(studentLine => {
      var fn = studentLine.fn;
      var name = studentLine.name;
      var average = fnWithScores.filter(el => el.fn == fn)[0].average;

      var line = `${fn} ${name} ${average} \n`;
      fs.appendFile('avg-scores.txt', line, err => {
        if (err) console.error(err);
      });
    });
  });
}

solution();
