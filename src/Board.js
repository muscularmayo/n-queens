// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },

    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //create a variable to store the array on the board.
      var rowArray = this.get(rowIndex);

      //counter, > 1 is true, < 1 false.
      var ifFound = 0;
      //loop through the specific rowIndex
      for (var i = 0; i < rowArray.length; i++) {
        //ifFound accumulates everytime it finds a piece
        if (rowArray[i] === 1) {
          ifFound++;
        }
      }
      return ifFound > 1;
      //returning true or false depending on how many pieces are in the row
    },


    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //board variable
      var board = this.rows();
      //search through the board and use previous helper function to check for conflicts
      for ( var i = 0; i < board.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
          //return true on the first conflict it sees
        }
      }
      //otherwise no row conflicts, return false
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {

      //Create column variable
      // var col = [];

      //create counter
      var ifFound = 0;

      var board = this.rows();
      //Loop through the length of the matrix (columns)
      for (var i = 0; i < board.length; i++) {
      //While looping through each row, adding column index to each column array
        if (board[i][colIndex]) {
          ifFound++;
        }

      }

      return ifFound > 1; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {

      //create board variable
      var board = this.rows();
      //Loop through the first array
      for (var i = 0; i < board.length; i++) {

        //while on each index of array, run function and check column
        //If there is any conflict in a column
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {

      var size = this.get('n'); // 4
      var ifFound = 0; //counter to check piece conflict
      var rowIndex = 0;

      var colIndex = majorDiagonalColumnIndexAtFirstRow;
      for (;rowIndex < size && colIndex < size; rowIndex++, colIndex++) {


        if (colIndex >= 0) {
          var rowArray = this.get(rowIndex);
          ifFound += rowArray[colIndex];
        }

      }
      return ifFound > 1;

    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {

      var size = this.get('n');


      for (var i = 1 - size; i < size; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }

      return false;

    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {

      var rowIndex = 0;

      var ifFound = 0;

      var colIndex = minorDiagonalColumnIndexAtFirstRow;

      var size = this.get('n');

      for (; rowIndex < size && colIndex >= 0; rowIndex++, colIndex--) {

        if (colIndex < size) {
          var rowArray = this.get(rowIndex);
          ifFound += rowArray[colIndex];
        }
      }

      return ifFound > 1; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {

      var size = this.get('n');


      for (var i = 2 * (size) - 1; i >= 0; i--) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }

      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
/*
var board2 = new Board({n: 5});
console.log(board2);
console.log(JSON.stringify(board2));*/