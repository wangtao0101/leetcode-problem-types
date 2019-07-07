const path = require('path');
const fs = require('fs');
const executeCommand = require('./execCommand');

const max = 1106;
const min = 1;

const leetcode = path.join(process.cwd(), 'node_modules/.bin/leetcode.cmd');
const testCaseRegex = /\* Testcase Example:\s+\'([\s\S]+?)\'/;

function mkDir(templatePath) {
  if (!fs.existsSync(templatePath)) {
    fs.mkdirSync(templatePath);
  }
}

(async () => {
  const templatePath = path.join(process.cwd(), 'template');
  mkDir(templatePath);
  for (let i = min; i <= max; i++) {
    try {
      const problemPath = path.join(templatePath, `${i}.js`);
      if (!fs.existsSync(problemPath)) {
        let codeTemplate = await executeCommand(leetcode, ['show', i, '-c', '-l', 'javascript']);
        // for get testcase
        const codeTemplateDetail = await executeCommand(leetcode, ['show', i, '-x', '-l', 'javascript']);
        const testCaseMatch = testCaseRegex.exec(codeTemplateDetail);

        if (testCaseMatch != null) {
          codeTemplate += `//* Testcase Example: '${testCaseMatch[1]}'`;
        }

        fs.writeFileSync(problemPath, codeTemplate);
      }
    } catch (error) {
      console.log(error);
    }
  }
})();
