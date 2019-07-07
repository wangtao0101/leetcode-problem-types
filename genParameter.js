const { parse } = require('babylon');
const path = require('path');
const fs = require('fs');
const jsonFormat = require('json-format');
const executeCommand = require('./execCommand');

const templatePath = path.join(process.cwd(), 'template');

const paramRegex = /@param\s{(\S+)}/g;
const returnRegex = /@return\s{(\S+)}/g;
const testCaseRegex = /\* Testcase Example:\s+\'([\s\S]+?)\'/;

const max = 1106;
const min = 1;

(async () => {
  try {
    const types = {};
    for (let i = min; i <= max; i++) {
      try {
        const problemPath = path.join(templatePath, `${i}.js`);
        if (fs.existsSync(problemPath)) {
          const content = fs.readFileSync(problemPath);

          const ast = parse(content.toString(), {
            sourceType: 'module',
            plugins: [
              'jsx',
              'flow',
              'classConstructorCall',
              'doExpressions',
              'objectRestSpread',
              'decorators',
              'classProperties',
              'exportExtensions',
              'asyncGenerators',
              'functionBind',
              'functionSent',
              'dynamicImport',
            ],
          });

          let beginTokenIndex = 0;
          let find = false;
          while (!find) {
            if (ast.tokens[beginTokenIndex + 1].type !== 'CommentBlock') {
              find = true;
            } else {
              beginTokenIndex++;
            }
          }

          const comment = ast.tokens[beginTokenIndex].value;
          const funName = ast.tokens[beginTokenIndex + 2].value;

          let match = true;
          paramRegex.lastIndex = 0;
          const paramTypes = [];
          while (match != null) {
            match = paramRegex.exec(comment);
            if (match != null) {
              paramTypes.push(match[1]);
            }
          }

          returnRegex.lastIndex = 0;
          const returnMatch = returnRegex.exec(comment);

          const testCaseString = ast.tokens[ast.tokens.length - 2].value;
          const testCaseMatch = testCaseRegex.exec(testCaseString);

          types[i] = {
            funName,
            paramTypes,
            returnType: returnMatch == null ? 'void' : returnMatch[1],
            testCase: testCaseMatch == null ? '' : testCaseMatch[1],
          };
        }
      } catch (error) {
        console.error(`problem error: ${i}`);
        console.log(error);
      }
    }

    console.log(Object.keys(types).length);

    fs.writeFileSync(path.join(process.cwd(), 'types.js'), 'module.exports = ' +  jsonFormat(types));
  } catch (err) {
    console.log(err);
  }
})();
