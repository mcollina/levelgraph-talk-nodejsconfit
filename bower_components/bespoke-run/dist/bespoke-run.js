/*!
 * bespoke-run v0.0.4
 * https://github.com/mcollina/bespoke-run
 *
 * Copyright 2014, Matteo Collina
 * This content is released under the MIT license
 */

bespoke.plugins.run = function(deck) {

  var lastSlide = -1;

  [].forEach.call(document.querySelectorAll("[data-bespoke-run]"), function(runner) {

    runner.setAttribute("href", "#");

    runner.addEventListener("click", function(e) {
      deck.fire("runCurrentCode");
      e.preventDefault();
    });

  });

  deck.on("runCurrentCode", function() {
    var script = document.querySelector(".bespoke-active code").innerText;

    new Function(script)();
  });

  deck.on("prev", function() {
    lastSlide = deck.slide();
  });

  deck.on("next", function(event) {
    var slide = event.slide;
    var code = slide.querySelector('code[data-bespoke-autorun]')
    var hasMoved = lastSlide !== deck.slide();

    lastSlide = deck.slide();

    if (code && hasMoved) {
      deck.fire("runCurrentCode");

      return false;
    }

    return true;
  });
};
