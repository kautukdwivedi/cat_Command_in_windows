#!/usr/bin/env node

let fs = require("fs");
let cmd = process.argv.slice(2);
let options = [];
let files = [];
for (let x in cmd) {
  if (cmd[x].startsWith("-") && cmd[x].length == 2) {
    options.push(cmd[x]);
  } else {
    files.push(cmd[x]);
  }
  for (x in files) {
    if (!fs.existsSync(files[x])) {
      console.log("File " + files[x] + " doesn't exist");
      process.exit(1);
    }
  }
}

let str = [];

for (let x in files) {
  str += fs.readFileSync(files[x]).toString();
}

str = str.split("\n");

if (options.includes("-s")) {
  str = removeLargeSpaces(str);
}

if (options.includes("-n") && options.includes("-b")) {
  if (options.indexOf("-b") > options.indexOf("-n")) {
    str = numberAll(str);
  } else {
    str = numberNonEmpty(str);
  }
} else {
  if (options.includes("-b")) {
    str = numberNonEmpty(str);
  } else if (options.includes("-n")) {
    str = numberAll(str);
  }
}

str = str.join("\n");
console.log(str);

function numberNonEmpty(arr) {
  let ans = [];
  let number = 1;
  for (x in arr) {
    if (arr[x] ==="" || arr[x] === "\r") {
      ans[x] = arr[x];
    } else {
      ans[x] = number + " " + arr[x];
      number++;
    }
  }
  return ans;
}
function numberAll(arr) {
  let ans = [];
  for (x in arr) {
    let t = Number(x) + 1;
    ans[x] = t + " " + arr[x];
  }
  return ans;
}
function removeLargeSpaces(arr) {
  let ans = [];
  if (arr[0] === "\r") {
    ans.push("\r");
  }
  for (let x in arr) {
    if (
      (arr[x] === "\r" && ans[ans.length - 1] === "\r") ||
      (arr[x] === "" && ans[ans.length - 1] === "")
    ) {
    } else {
      ans.push(arr[x]);
    }
  }
  return ans;
}
