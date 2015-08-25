(function() {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Board = SnakeGame.Board = function(dim) {
    this.dim = dim;
    this.snake = new SnakeGame.Snake(this);
    this.apple = new SnakeGame.Apple(this);
  };

  Board.prototype.blankGrid = function (dim) {
    var rows = [];
    for (var i = 0; i < dim; i++) {
      var row = [];
      rows.push(row);
      for (var j = 0; j < dim; j++) {
        row.push(".");
      }
    }
    return rows;
  };

  Board.prototype.render = function () {
    var grid = this.blankGrid(this.dim);
    this.snake.segments.forEach(function(segment) {
      grid[segment.x][segment.y] = "S";
    });
    var result = grid.map(function (row) {
      return row.join("");
    }).join("\n");
    return result;
  };

  Board.prototype.onBoard = function(coord) {
    if (coord.x < 0 || coord.x >= this.dim ||
        coord.y < 0 || coord.y >= this.dim) {
      return false;
    } else {
      return true;
    }
  };
})();
