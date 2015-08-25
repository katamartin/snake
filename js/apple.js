(function() {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }
  var Apple = SnakeGame.Apple = function(board) {
    this.board = board;
    this.place();
  };

  Apple.prototype.randomPosition = function() {
    return [ Math.floor(Math.random() * this.board.dim),
             Math.floor(Math.random() * this.board.dim)
           ];
  };

  Apple.prototype.place = function() {
    var pos = this.randomPosition();
    while (this.board.snake.occupies(pos)) {
      var pos = this.randomPosition();
    }
    this.position = new SnakeGame.Coord(pos[0], pos[1]);
  };
})();
