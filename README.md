## Installation
- Include this project as a submodule in the desired parent project by following [these](https://git-scm.com/book/en/v2/Git-Tools-Submodules) instructions.
- Once added:
    - Rename `config_template.json` to `config.json` and configure to match the server.
        - Server project found [here](https://github.com/thomasnorris/REST-GoogleAssistant-Server).
    - Run `npm install request`.
    - Access with `var _assistant = require('path/to/client.js');`.
