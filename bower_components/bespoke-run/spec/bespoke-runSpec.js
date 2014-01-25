
var lastCalledValue = null;

function dummyCall(value) {
  lastCalledValue = value;
}

(function() {
  'use strict';

  describe("bespoke-run", function() {

    var deck;

    var createDeck = function() {
      var parent = document.createElement("article");

      var section = document.createElement("section");
      section.innerHTML =
        "<code>dummyCall(true);</code>" +
        "<a data-bespoke-run>Run!</a>";

      var section2 = document.createElement("section");
      section2.innerHTML =
        "<code>dummyCall(<b>true</b>);</code>" +
        "<a data-bespoke-run>Run!</a>";

      var section3 = document.createElement("section");
      section3.innerHTML =
        "<code data-bespoke-autorun>dummyCall(<b>true</b>);</code>";

      var section4 = document.createElement("section");
      section4.innerHTML =
        "<b>Hello world</b>";

      parent.appendChild(section);
      parent.appendChild(section2);
      parent.appendChild(section3);
      parent.appendChild(section4);
      document.body.appendChild(parent);

      deck = bespoke.from(parent, {
        run: true
      });
    };

    var click = function(el){
      var ev = document.createEvent("MouseEvent");
      ev.initMouseEvent( "click", true /* bubble */, true /* cancelable */, window, null, 0, 0, 0, 0, /* coordinates */ false, false, false, false, /* modifier keys */ 0 /*left*/, null);
      el.dispatchEvent(ev);
    };

    beforeEach(createDeck);

    afterEach(function() {
      lastCalledValue = null;
    });

    describe("deck.slide", function() {

      beforeEach(function() {
        deck.slide(0);
      });

      it("should add a href to the run link", function() {
        expect(document.querySelector("a[data-bespoke-run]").getAttribute("href")).toEqual("#");
      });

      it("should execute the current code", function() {
        click(document.querySelectorAll("a[data-bespoke-run]")[0]);
        expect(lastCalledValue).toBe(true);
      });

      it("should execute the code even if it contains markup", function() {
        click(document.querySelectorAll("a[data-bespoke-run]")[1]);
        expect(lastCalledValue).toBe(true);
      });

      it("should execute the code automatically before next if there is autorun", function() {
        deck.slide(2);
        deck.next();
        expect(deck.slide()).toBe(2);
        expect(lastCalledValue).toBe(true);
      });

      it("should move to the following slide after autorun", function() {
        deck.slide(2);
        deck.next();
        deck.next();
        expect(deck.slide()).toBe(3);
      });
    });

  });

}());
