const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

function getModuleInfo (file) {
  // 读取文件
  const body = fs.readFileSync(file, 'utf-8');
  
  // 转化AST语法树
  const ast = parser.parse(body, {
    sourceType: 'module' // 标识解析ES模块
  });

  // 依赖收集
  const deps = {};
  traverse(ast, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(file);
      const abspath = './' + path.join(dirname, node.source.value);
      deps[node.source.value] = abspath;
    },
  });

  // ES6转ES5
  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  });
  const moduleInfo = { file, deps, code};
  return moduleInfo;
}

// const info = getModuleInfo('./webpack/index.js');
// console.log(info);

/**
 * 获取依赖
 * @param {*} temp
 * @param {*} param1 
 */
function getDeps(temp, { deps }) {
  Object.keys(deps).forEach((key) => {
    const child = getModuleInfo(deps[key]);
    temp.push(child);
    getDeps(temp, child)
  })
}

/**
 * 模块解析
 * @param {*} file
 * @returns
 */
function parseModules (file) {
  const entry = getModuleInfo(file);
  const temp = [ entry ];
  const depsGraph = {};

  getDeps(temp, entry);

  temp.forEach((moduleInfo) => {
    depsGraph[moduleInfo.file] = {
      deps: moduleInfo.deps,
      code: moduleInfo.code,
    };
  });
  return depsGraph;
}

function bundle(file) {
  const depsGraph = JSON.stringify(parseModules(file));
  return `(function (graph) {
    function require(file) {
      function absRequire(relPath) {
        return require(graph[file].deps[relPath])
      }
      var exports = {};
      (function (require, exports, code) {
        eval(code)
      })(absRequire, exports, graph[file].code)
      return exports
    }
    require('${file}')
  })(${depsGraph})`;
}

const content = bundle('./webpack/index.js');

!fs.existsSync('./dist') && fs.mkdirSync('./dist');
fs.writeFileSync('./dist/bundle.js', content);
