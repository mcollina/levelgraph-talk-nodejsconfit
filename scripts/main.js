bespoke.from('article', {
  keys: true,
  touch: true,
  scale: true,
  hash: true,
  progress: true,
  state: true,
  forms: true,
  run: true,
  bullets: true
});

var dbs = {};

function level(name) {
  if (dbs[name] && dbs[name].isOpen()) {
    return dbs[name];
  }
  var levelup = require('levelup');
  var db = levelup(name, { db: require('level-js') });
  dbs[name] = db;
  return db;
}

function levelgraph(name) {
  var levelgraph = require('levelgraph');
  return levelgraph(level(name));
}

n3 = require('levelgraph-n3');
