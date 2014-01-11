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
  var levelup = require('levelup')
  return levelup(name, { db: require('level-js') });
}

function levelgraph(name) {
  var levelgraph = require('levelgraph')
  return levelgraph(name);
}
