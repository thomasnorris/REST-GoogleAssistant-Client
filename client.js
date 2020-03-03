// REST-GoogleAssistant-Server must be operational
// see config_template.json for config structure
// install packages via 'npm install'
// this submodule does not require logging as the master program and the assistant server should handle it.
var _path = require('path');
var _logger = require(_path.resolve(__dirname, 'Node-Logger', 'app.js'));

var _request = require('request');

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
                if (err) {
                    _logger.Error.Async('Error sending request', err);
                    reject(err);
                }
                else if (body)
                    // this is logged server side
                    resolve(body);
            });
        });
    }
}

function readJson(filePath) {
    var fs = require('fs');
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}