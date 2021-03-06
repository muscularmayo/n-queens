/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) { //o(n!)

  var board = new Board({n: n});

  var solution; //gonna be our solution



  for (var i = 0; i < n; i++) {
    board.get(i)[i] = 1;
  }

  solution = board.rows();


  //Once n = 8. Accumulate solution and return

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) { //O(n!)


  //Number of solutions
  var solutionCount = 0;

  //Initialize board
  var board = new Board({n: n});

  //Create inner helper function that places pieces, sets and counts board. Parameters will be board and row.
  var solveRooks = function(rookBoard, row) {

    //Example sample data, n = 8.
    //If row is at 8, and there are no conflicts on the board
    if (row === n) {
      //That means that we reached the criteria for a solution
      //if (!rookBoard.hasAnyRooksConflicts()) {
      //Increment to count
      solutionCount++;
      //}
      //Return the solution count
      return;

    }


    //Iterate through the columns starting from first column
    for (var col = 0; col < n; col++) {

      //Place piece on the board starting at FIRST column
      rookBoard.togglePiece(row, col);

      //If there are no conflicts after placing a piece on the column at the current row
      if (!rookBoard.hasAnyRooksConflicts()) {

        //Recursively move to the next row over while at the next column and place next piece -- while there are no conflicts
        solveRooks(rookBoard, row + 1);
        //Otherwise if there are conflicts, remove the piece
      }
      rookBoard.togglePiece(row, col);

    } //End of for loop
    // return;

  }; //End of helper function

  //call the helper function
  solveRooks(board, 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  //return the solution count
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) { //O(n!)

  //Initialize board
  var solution = []; //Solution defaults to an empty board in the first place - esp n is 0, 2, 3
  var board = new Board({n: n});

  if (n === 2 || n === 3) {
    solution = board.rows();
  }


  //Create inner helper function that places pieces, sets and counts board. Parameters will be board and row.
  var solveQueens = function(queenBoard, row) {
    //Example sample data, n = 8.
    //If row is at 8, and there are no conflicts on the board
    if (row === n) {
      //Reassign the solution to the queenBoard -- which should be transformed by the helper function
      solution = queenBoard.rows();
      //Return solution
      return solution;
    }

    //Iterate through the columns starting from first column
    for (var col = 0; col < n; col++) {

      //Place piece on the board starting at FIRST column
      queenBoard.togglePiece(row, col);

      // console.log('toggle', queenBoard.rows());

      //If there are no conflicts after placing a piece on the column at the current row
      if (!queenBoard.hasAnyQueensConflicts()) {

        //Recursively move to the next row over while at the next column and place next piece -- while there are no conflicts
        var result = solveQueens(queenBoard, row + 1);
        //Otherwise if there are conflicts, remove the piece
        if (result) {
          return result;
        }
      }
      queenBoard.togglePiece(row, col);
      // console.log('untoggle', queenBoard.rows());

      //console.log('solution', solution);

    } //End of for loop

  }; //End of helper function

  //call the helper function
  solveQueens(board, 0);
  //solution = solution.rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));

  return solution;
};








// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) { //O(n!)
  /*var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;*/


  //Number of solutions
  var solutionCount = 0;

  //Initialize board
  var board = new Board({n: n});

  //Create inner helper function that places pieces, sets and counts board. Parameters will be board and row.
  var solveQueens = function(queenBoard, row) {

    //Example sample data, n = 8.
    //If row is at 8, and there are no conflicts on the board
    if (row === n) {
      //That means that we reached the criteria for a solution
      //if (!rookBoard.hasAnyRooksConflicts()) {
      //Increment to count
      solutionCount++;
      //}
      //Return the solution count
      return;

    }


    //Iterate through the columns starting from first column
    for (var col = 0; col < n; col++) {

      //Place piece on the board starting at FIRST column
      queenBoard.togglePiece(row, col);

      //If there are no conflicts after placing a piece on the column at the current row
      if (!queenBoard.hasAnyQueensConflicts()) {

        //Recursively move to the next row over while at the next column and place next piece -- while there are no conflicts
        solveQueens(queenBoard, row + 1);
        //Otherwise if there are conflicts, remove the piece
      }
      queenBoard.togglePiece(row, col);

    } //End of for loop
    // return;

  }; //End of helper function

  //call the helper function
  solveQueens(board, 0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  //return the solution count
  return solutionCount;

};
