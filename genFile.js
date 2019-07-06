const path = require('path');
const fs = require('fs');
const cp = require('child_process');

const max = 1106;
const min = 156;

const leetcode = path.join(process.cwd(), 'node_modules/.bin/leetcode.cmd');

async function executeCommand(command, args, options) {
  return new Promise((resolve, reject) => {
    let result = '';

    const childProc = cp.spawn(command, args, { ...options });

    childProc.stdout.on('data', data => {
      data = data.toString();
      result = result.concat(data);
    });

    childProc.on('error', reject);

    childProc.on('close', code => {
      if (code !== 0 || result.indexOf('ERROR') > -1) {
        const error = new Error(`Command "${command} ${args.toString()}" failed with exit code "${code}".`);
        if (result) {
          error.result = result;
        }
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

function deleteFolder(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function(file, index) {
      let curPath = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) {
        deleteFolder(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

function clearDir(templatePath) {
  if (fs.existsSync(templatePath)) {
    deleteFolder(templatePath);
  }
  fs.mkdirSync(templatePath);
}

(async () => {
  const templatePath = path.join(process.cwd(), 'template');
  // clearDir(templatePath);
  for (let i = min; i <= max; i++) {
    try {
      const codeTemplate = await executeCommand(leetcode, ['show', i, '-cx', '-l', 'javascript']);
      fs.writeFileSync(path.join(templatePath, `${i}.js`), codeTemplate);
    } catch (error) {
      console.log(error);
    }
  }
})();