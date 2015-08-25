(function() {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }
  var Snake = SnakeGame.Snake = function(board) {
    this.board = board;
    this.direction = "N";
    this.turning = false;
    this.growTurns = 0;
    this.alive = true;
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

    if (!this.isValid(newCoord)) {
      this.alive = false;
    } else {
      this.segments.push(newCoord);
    }

    this.turning = false;

    if (this.eatApple()) {
      this.board.apple.place();
    }

    if (this.growTurns > 0) {
      this.growTurns -= 1;
    } else {
      this.segments.shift();
    }
  };

  Snake.prototype.turn = function(direction) {
    if (!this.turning &&
        !Snake.DIRS[this.direction].isOpposite(Snake.DIRS[direction])) {
      this.direction = direction;
      this.turning = true;
    }
  };

  Snake.prototype.occupies = function(pos) {
    var occupying = false;
    this.segments.forEach(function(segment) {
      if (segment.x === pos[0] && segment.y === pos[1]) {
        occupying = true;
        return true;
      }
    });
    return occupying;
  };

  Snake.prototype.eatApple = function() {
    if (this.head().equals(this.board.apple.position)) {
      this.growTurns += 3;
      return true;
    } else {
      return false;
    }
  };

  Snake.prototype.isValid = function(coord) {
    if (!this.board.onBoard(coord)) {
      return false;
    } else {
      var overlapping = false;
      this.segments.forEach(function(segment) {
        if (segment.equals(coord)) {
          overlapping = true;
          return true;
        }
      });
      return !overlapping;
    }
  };
})();
