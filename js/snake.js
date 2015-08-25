(function() {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }
  var Snake = SnakeGame.Snake = function(board) {
    this.board = board;
    this.direction = "N";
    this.turning = false;
    var center = Math.floor(board.dim / 2);
    this.segments = [new SnakeGame.Coord(center, center)];
  };

  Snake.DIRS = {
    "N": new SnakeGame.Coord(-1, 0),
    "S": new SnakeGame.Coord(1, 0),
    "E": new SnakeGame.Coord(0, 1),
    "W": new SnakeGame.Coord(0, -1)
  };

  Snake.prototype.head = function() {
    return this.segments[this.segments.length - 1];
  };

  Snake.prototype.move = function() {
    var newCoord = this.head().plus(Snake.DIRS[this.direction]);
    this.segments.push(newCoord);
    this.segments.shift();
  };

  Snake.prototype.turn = function(direction) {
    this.direction = direction;
  }
})();
