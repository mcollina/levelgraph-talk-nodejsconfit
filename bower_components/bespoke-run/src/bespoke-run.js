bespoke.plugins.run = function(deck) {

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

  deck.on("activate", function(slide) {
    slide.autoRunned = false;
  });

  deck.on("next", function(event) {
    var slide = event.slide;
    var code = slide.querySelector('code[data-bespoke-autorun]')


    if (code && !slide.autoRunned) {
      console.log('running');
      slide.autoRunned = true;

      deck.fire("runCurrentCode");

      return false;
    }

    return true;
  });
};
