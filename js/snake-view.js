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
  };

  View.DIRS = {
    38: "N",
    39: "E",
    40: "S",
    37: "W"
  };

  View.prototype.keyPressPrompt = function() {
    var $over = $("<div class='game-start'>Press any key to start</div>");
    this.$el.append($over);
  };

  View.prototype.startGame = function(event) {
    event.preventDefault();
    if (!this.intervalId) {
      this.$el.find(".game-start").remove();
      this.$el.find(".score").remove();
      this.$el.append("<div class='score'>0</div>");
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
    this.$el.find(".score").html(this.board.snake.score);
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
      var $over = $("<div class='game-over'>Game Over</div>");
      $over.append("<br><br>Final Score: " + this.board.snake.score);
      $over.append("<br><br><button class='new-game'>Play Again?</button>");
      this.$el.append($over);
      window.clearInterval(this.intervalId);
      $(".new-game").on("click", function(event) {
        event.preventDefault();
        this.intervalId = null;
        this.board = new SnakeGame.Board(20);
        this.makeGrid();
        this.keyPressPrompt();
      }.bind(this));
    }
  };
})();
