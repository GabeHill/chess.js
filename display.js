const { Chess } = require('./chess.js')
// const { Chessboard } = require('./chessboard')
// const { Chessboard } = require('@chrisoakman/chessboardjs/dist/chessboard-1.0.0')
// import * as Chessboard from "@chrisoakman/chessboardjs"

let board = null

let pieceString = () => {
  // the piece array
  let pieceOrder = [],
    // randomizer func
    d = function (num) { return Math.floor(Math.random() * ++num) },
    // func to find empty squares
    emptySquares = function () {
      let arr = []
      for (let i = 0; i < 8; i++) if (pieceOrder[i] == undefined) arr.push(i)
      return arr
    }
  // bishop on black
  pieceOrder[d(2) * 2] = "b"
  // bishop on white
  pieceOrder[d(2) * 2 + 1] = "b"
  // queen on empty
  pieceOrder[emptySquares()[d(5)]] = "q"
  // knight on empty
  pieceOrder[emptySquares()[d(4)]] = "n"
  // other knight
  pieceOrder[emptySquares()[d(3)]] = "n"
  // rooks and king between them
  for (let x = 1; x <= 3; x++) pieceOrder[emptySquares()[0]] = x == 2 ? "k" : "r"
  // compile the pieces into a string
  let pieces = pieceOrder.join('')
  //add pieces to string format for the chess library, uppercase the second set for the black pieces
  return pieces + "/pppppppp/8/8/8/8/PPPPPPPP/" + pieces.toUpperCase() + " w KQkq - 0 1"
}

let piecess = pieceString()
//init chess game with generated Fischer layout
let game = new Chess(piecess)

//randomize and automate the chess board (code taken from the chessboard library example)
function makeRandomMove() {
  let possibleMoves = game.moves()

  // exit if the game is over
  if (game.game_over()) return

  let randomIdx = Math.floor(Math.random() * possibleMoves.length)
  game.move(possibleMoves[randomIdx])
  board.position(game.fen())

  window.setTimeout(makeRandomMove, 500)
}
//init the board
board = Chessboard('myBoard', piecess)
// board = Chessboard('myBoard')

window.setTimeout(makeRandomMove, 500)
