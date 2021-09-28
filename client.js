// REST-GoogleAssistant-Server must be operational and running
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
                else if (body) {
                    _logger.Info.Async('Request body received', body);
                    resolve(body);
                }
                else {
                    _logger.Error.Async('Request body not received');
                    reject('Error: Request body not received.');
                }
            });
        });
    }
}

function readJson(filePath) {
    var fs = require('fs');
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}