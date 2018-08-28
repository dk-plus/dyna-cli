const readline = require('readline');
const process = require('process');
const path = require('path');
const fs = require('fs');
require('shelljs/global');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const curPath = process.cwd();

const questions = {
  "请输入项目名称：": "",
  "请输入项目描述：": "",
  "请输入作者：": "" ,
};

const answers = {
  name: "",
  description: "",
  author: "",
}

exports.init = function() {
  let q = Object.keys(questions);
  let a = Object.keys(answers);
  handleInput(q, a);
}

function handleInput(q, a) {
  if (q.length > 0) {
    let q1 = q.shift();
    let a1 = a.shift();
    rl.question(q1, answer => {
      questions[q1] = answer;
      answers[a1] = answer;
      handleInput(q, a);
    })
  } else {
    rl.close();
    console.log(JSON.stringify(questions, null, 4));
    modifyFile();
  }
}

function modifyFile() {
  exec(`git clone https://github.com/dk-plus/dyna-webpack-template.git`);
  exec(`rm -rf ./dyna-webpack-template/.git`);

  let pkgJson = JSON.parse(fs.readFileSync('./dyna-webpack-template/package.json').toString());
  pkgJson.name = answers.name;
  pkgJson.description = answers.description;
  pkgJson.author = answers.author;
  fs.writeFileSync('./dyna-webpack-template/package.json', JSON.stringify(pkgJson, null, 4));

  exec(`rename dyna-webpack-template ${answers.name}`);
}