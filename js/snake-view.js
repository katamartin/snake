(function() {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function($el) {
    this.$el = $el;
    this.board = new SnakeGame.Board(20);
    this.makeGrid();
    this.keyPressPrompt();
    $(window).on("keydown", this.handleKeyEvent.bind(this));
    $(window).on("keydown", this.startGame.bind(this));
    $(window).on("keydown", this.pauseGame.bind(this));
  };

  View.DIRS = {
    38: "N",
    39: "E",
    40: "S",
    37: "W"
  };

  View.prototype.pauseGame = function(event) {
    event.preventDefault();
    if (this.intervalId && event.keyCode === 80) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
      var $pause = $("<div class='message'>Press space to resume</div>");
      this.$el.append($pause);
    }
  };

  View.prototype.keyPressPrompt = function() {
    var $over = $("<div class='message'>Press space to start</div>");
    this.$el.append($over);
  };

  View.prototype.startGame = function(event) {
    event.preventDefault();
    if (!this.intervalId && event.keyCode === 32) {
      this.$el.find(".message").remove();
      this.$el.find(".score").remove();
      if (!this.board.snake.alive) {
        this.board = new SnakeGame.Board(20);
        this.makeGrid();
      }
      this.$el.append("<div class='score'>" + this.board.snake.score + "</div>");
      this.intervalId = setInterval(
        this.step.bind(this),
        100
      );
    }
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
    this.removeRotations();
    this.updateHeadAndTail();
    this.$el.find(".score").html("Score: " + this.board.snake.score);
  };

  View.prototype.updateClasses = function(items, className) {
    this.$li.filter("." + className).removeClass(className);
    items.forEach(function(item) {
      var liCount = item.x * this.board.dim + item.y;
      this.$li.eq(liCount).addClass(className);
    }.bind(this))
  };

  View.prototype.removeRotations = function() {
    var dirs = ["N", "S", "E", "W"];
    dirs.forEach(function(dir) {
      this.$li.filter("." + dir).removeClass(dir);
    }.bind(this));
  };

  View.prototype.updateHeadAndTail = function() {
    var dir = this.board.snake.direction;
    this.updateClasses([this.board.snake.head()], dir);
    this.updateClasses([this.board.snake.head()], "head");
    if (this.board.snake.segments.length > 1) {
      var tail = this.board.snake.segments[0];
      this.updateClasses([tail], "tail");
      var tailDir = this.board.snake.tailDir();
      this.$li.eq(tail.x * this.board.dim + tail.y).addClass(tailDir);
    }
  };

  View.prototype.step = function() {
    this.board.snake.move();
    if (!this.board.snake.alive) {
      var $over = $("<div class='message'>Game Over</div>");
      $over.append("<br><br>Final Score: " + this.board.snake.score);
      $over.append("<br><br>Press space to play again");
      this.$el.append($over);
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    } else {
      this.render();
    }
  };
})();
