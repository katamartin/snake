(function() {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function($el) {
    this.$el = $el;
    this.board = new SnakeGame.Board(20);
    this.makeGrid();
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
    }
  };

  View.prototype.makeGrid = function() {
    var html = "";
    for (var i = 0; i < this.board.dim; i++) {
      html += "<ul>";
      for (var j = 0; j < this.board.dim; j++) {
        html += "<li></li>";
      }
      html += "</ul>";
    }
    this.$el.html(html);
    this.$li = this.$el.find("li");
  };

  View.prototype.render = function() {
    this.updateClasses(this.board.snake.segments, "snake");
    this.updateClasses([this.board.apple.position], "apple");
  };

  View.prototype.updateClasses = function(items, className) {
    this.$li.filter("." + className).removeClass(className);
    items.forEach(function(item) {
      var liCount = item.x * this.board.dim + item.y;
      this.$li.eq(liCount).addClass(className);
    }.bind(this))
  };

  View.prototype.step = function() {
    this.board.snake.move();
    this.render();
    if (!this.board.snake.alive) {
      this.$el.append("<div class='game-over'><h1>Game Over</h1></div>");
      window.clearInterval(this.intervalId);
    }
  };
})();
