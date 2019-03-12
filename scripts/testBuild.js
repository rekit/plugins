const path = require('path');
const rekitJson = require('../rekit.json');

const prjDir = rekitJson.prjDir || path.join(__dirname, '..');
const start = require('rekit-studio/lib/start');
start({
  port: rekitJson.devStudioPort,
  pluginsDir: path.join(path.join(__dirname, '../src/features')),
  projectRoot: prjDir,
});
