(function() {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }
  var Coord = SnakeGame.Coord = function(x, y) {
    this.x = x;
    this.y = y;
  };

  Coord.prototype.plus = function(other) {
    return new Coord(this.x + other.x, this.y + other.y);
  };

  Coord.prototype.equals = function(other) {
    return this.x === other.x && this.y === other.y;
  };

  Coord.prototype.isOpposite = function(other) {
    return this.x === other.x * -1 && this.y === other.y * -1;
  };
})();
