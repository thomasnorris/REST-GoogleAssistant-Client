// REST-GoogleAssistant-Server must be operational
// see config_template.json for config structure
// install packages via 'npm install'
// this submodule does not require logging as the master program and the assistant server should handle it.

var _request = require('request');
var _path = require('path');

const CFG_FILE = _path.resolve(__dirname, 'config', 'config.json');
var _cfg = readJson(CFG_FILE);

module.exports = {
    Send: function(command) {
        return new Promise((resolve, reject) => {
            var reqOps = {
                url: _cfg.address + '/' + _cfg.endpoint + '/' + encodeURI(command),
                headers: {
                    [_cfg.auth.key]: _cfg.auth.value
                }
            }

            _request(reqOps, (err, res, body) => {
                if (err)
                    reject('Error: ' + err);

                else if (body)
                    resolve('Response: ' + body);
            });
        });
    }
}

function readJson(filePath) {
    var fs = require('fs');
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}