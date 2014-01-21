bespoke.from('article', {
  keys: true,
  touch: true,
  bullets: 'li, .bullet',
  scale: true,
  hash: true,
  progress: true,
  state: true,
  forms: true,
  run: true
});

function level(name) {
  var levelup = require('levelup');
  return levelup(name, { db: require('level-js') });
}

levelgraph = require('levelgraph');
n3 = require('levelgraph-n3');
