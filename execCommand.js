const cp = require('child_process');

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

module.exports = executeCommand;
