(function() {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function($el) {
    this.$el = $el;
    this.board = new SnakeGame.Board(20);
    $(window).on("keydown", this.handleKeyEvent.bind(this));

    this.intervalId = setInterval(
      this.step.bind(this),
      100
    );
  };

  View.DIRS = {
    38: "N",
    39: "E",
    40: "S",
    37: "W"
  };

  View.prototype.handleKeyEvent = function(event) {
    event.preventDefault();
    if (View.DIRS[event.keyCode]) {
      this.board.snake.turn(View.DIRS[event.keyCode]);
      debugger
    }
  };

  View.prototype.step = function() {
    this.board.snake.move();
    this.$el.html("<pre>" + this.board.render() + "</pre>");
  };
})();
