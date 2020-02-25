// REST-GoogleAssistant-Server must be operational
// see config_template.json for config structure
// request must be installed via 'npm install'

var _request = require('request');
var _path = require('path');

const CFG = readJson(_path.resolve(__dirname, 'config', 'config.json'));

module.exports = {
    Send: function(commands) {
        // if a single command is passed, convert to array
        if (!Array.isArray(commands))
            commands = [commands];

        // build promises to send each command
        var promiseArr = commands.map((command) => {
            return new Promise((resolve, reject) => {
                var reqOptions = {
                    url:CFG.ADDRESS + '/' + CFG.ENDPOINT + '/' + encodeURI(command),
                    headers: {
                        [CFG.AUTH.KEY]: CFG.AUTH.VALUE
                    }
                }

                console.log('Sending command: ', command);

                _request(reqOptions, (err, res, body) => {
                    if (err) {
                        console.log('Error:', err);
                        reject(err);
                    }
                    else if (body) {
                        console.log('Response:', body);
                        resolve(body);
                    }
                });
            });
        });

        return new Promise((resolve, reject) => {
            // run requests sequentially
            // see: https://decembersoft.com/posts/promises-in-serial-with-array-reduce/
            promiseArr.reduce((promiseChain, currentTask) => {
                return promiseChain.then(chainResults =>
                    currentTask.then(currentResult =>
                        [...chainResults, currentResult]
                    )
                );
            }, Promise.resolve([])).then((results) => {
                resolve('Success');
            }).catch((err) => {
                reject('Failure');
            });
        });
    }
}

function readJson(filePath) {
    var fs = require('fs');
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}