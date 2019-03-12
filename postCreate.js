'use strict';

/* eslint "no-use-before-define": 0 */

// This script is executed after a project is created with this boilerplate.
// After execution, the script will be deleted.

const path = require('path');
const fs = require('fs-extra');
const _ = require('lodash');

const prjPath = __dirname;


function postCreate(args) {
  // Empty readme
  fs.writeFileSync(path.join(prjPath, 'README.md'), '# README\n');

  // Remove unnecessary files
  ['.travis.yml', 'yarn.lock', 'LICENSE']
    .map(f => path.join(prjPath, f))
    .forEach(file => fs.existsSync(file) && fs.unlinkSync(file));

  const name = args.name.replace(/^rekit-plugin-/, '');
  // Clean package.json
  const pkgJsonPath = path.join(prjPath, 'src/features/pluginnameplaceholder/package.json');
  const pkgJson = require(pkgJsonPath); // eslint-disable-line
  pkgJson.name = _.kebabCase(`rekit-plugin-${name}`);
  fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, '  '));

  const dashedName = _.kebabCase(name);
  // Rename pluginnameplaceholder to real plugin name.
  ['route.js', 'entry.js', `ui/menu.js`].forEach(file => {
    const absPath = path.join(prjPath, 'src/features/pluginnameplaceholder', file);
    const text = fs
      .readFileSync(absPath)
      .toString()
      .replace(/pluginnameplaceholder/g, dashedName);
    fs.writeFileSync(absPath, text);
  });

  // Remove build folder
  fs.removeSync(path.join(prjPath, 'src/features/pluginnameplaceholder/build'));

  // Rename pluginnameplaceholder in source files
  fs.renameSync(
    path.join(prjPath, 'src/features/pluginnameplaceholder'),
    path.join(prjPath, `src/features/${dashedName}`),
  );
}

module.exports = postCreate;
