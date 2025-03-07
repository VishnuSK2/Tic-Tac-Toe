import { useState } from "react"
import GameBard from "./Components/GameBard"
import Player from "./Components/Player"
import Log from "./Components/Log"
import { WINNING_COMBINATIONS } from "./Winning-combination.js"
import GameOver from "./Components/GameOver.jsx"

const PLAYERS={
  X:'Player 1',
  O:'Player 2'
}

const INITIAL_GAME_BOARD=[
  [null,null,null],
  [null,null,null],
  [null,null,null]
];

function deriveActivePlayers(gameTurns){
  let currentPlayer='X'
  if(gameTurns.length>0 && gameTurns[0].player === 'X'){
    currentPlayer='O'
  }
  return currentPlayer
}

function deriveGameBoard(gameTurns){
  let gameBoard =[...INITIAL_GAME_BOARD.map(array => [...array])];

  for(const turn of gameTurns){
      const {square ,player}=turn;
      const {row , col}= square

      gameBoard[row][col]=player
  }
  return gameBoard
}

function deriveWinner(gameBoard, players ){
  let winner;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
    if(firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol && 
      firstSquareSymbol===thirdSquareSymbol
    ){
      winner=players[firstSquareSymbol];
    }
  }
 return winner
}

function App() {
  const [gameTurns, setGameTurns]=useState([])
  const [players, setPlayers]=useState(PLAYERS)

  const activePlayer =deriveActivePlayers(gameTurns);
  const gameBoard=deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex,colIndex){
    setGameTurns(prevTurns =>{
      const currentPlayer =deriveActivePlayers(prevTurns)
      const upadatedTurns =[
        {square: {row: rowIndex, col:colIndex},player: currentPlayer},
        ...prevTurns,
      ];
      return upadatedTurns
    });
  }

  function handleRestart(){
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol,newName){
     setPlayers(prePlayers => {
      return{
        ...prePlayers,
        [symbol]:newName
      }
     })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
          intialName={PLAYERS.X} 
          symbol='X' 
          isActive={activePlayer ==='X'} 
          onChangeName={handlePlayerNameChange}
          />
          <Player 
          intialName={PLAYERS.O}
          symbol='O' 
          isActive={activePlayer ==='O'} 
          onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && 
        <GameOver winner={winner} 
        onRestart={handleRestart} />}
        <GameBard 
        onSelectSquare={handleSelectSquare} 
        activePlayerSymbol={activePlayer}
        board={gameBoard} 
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
