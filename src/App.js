import './App.css';
import { useState } from 'react';

function Square({ value, onSquareClick, color }) {
  return (
    <button className="square" onClick={onSquareClick} style={{color:{color}}}>
      {value} 
    </button>
  );
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    console.log(squares)
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return ['X', [a,b,c]];
    }
  }
  return null;
}
function Board({isNext, squares, onPlay}) {
  // const [isNext, setIsNext] = useState(true);
  // const [squares, setSquares] = useState(Array(9).fill(null));
  // const [posisi, setPosisi] = useState(0);

  function handleClick(i) {
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    const nextSquares = squares.slice();
    if(isNext){
      nextSquares[i] = 'X';
    }else{
      nextSquares[i] = 'O';
    }
    
    // setSquares(nextSquares);
    // setIsNext(!isNext);
    onPlay(nextSquares);
  }
  let color = 'black';
  function isRed(x, arr){
    let c='black';
    if(x == arr[0] || x == arr[1] || x == arr[2]){
      c ='red';
      return c;
    }
  }
  const winner = calculateWinner(squares);
  let status;
  if(winner){
    status = 'Winner: '+winner[0];
  }else{
    status = 'Next Player: '+ (isNext? 'X' : 'O');
  }
  // let rows = [];

  // for(let i=0 ;i<3;i++){
  //   let insides = [];
  //   for(let j = 0;j<3;j++){
  //     let x = posisi;
  //     insides.push(<Square value={squares[{x}]} onSquareClick={() => handleClick({x})} />)
  //     setPosisi(posisi + 1);
  //   }
  //   rows.push(<div className="board-row">{insides}</div>)
  // }
  return (
    <>
      <div className='status'>{status}</div>
      {/* {rows} */}
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} color={winner ? isRed(0, winner[1]) : 'black'} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} color={winner ? isRed(1, winner[1]) : 'black'} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} color={winner ? isRed(2, winner[1]) : 'black'} />
      </div>  
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} color={winner ? isRed(3, winner[1]) : 'black'} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} color={winner ? isRed(4, winner[1]) : 'black'} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} color={winner ? isRed(5, winner[1]) : 'black'} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} color={winner ? isRed(6, winner[1]) : 'black'} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} color={winner ? isRed(7, winner[1]) : 'black'} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} color={winner ? isRed(8, winner[1]) : 'black'} />
      </div>
    </>
  );
}

function Game(){
  // const [isNext, setIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const isNext = (currentMove % 2 === 0)
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0,currentMove+1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1)
    // setHistory([...history, snextSquares]);
    // setIsNext(!isNext);
  }
  function jumpTo(nextMove){
    setCurrentMove(nextMove);
    // setIsNext(nextMove % 2 === 0)
  }
  const moves = history.map((squares, move) =>{
    let description;
    if(move > 0){
      description='Go to move #'+move;
    }else{
      description='Go to game start';
    }
    if(move === currentMove){
      return (
        <li key={move}>You are at move #{move}</li>
      );
      
    }else{
      return(
        <li key={move}>
          <button onClick={()=> jumpTo(move)}>{description}</button>
        </li>
      );
    }
    
  })
  return (
    <div className='game'>
      <div className='game-board'>
        <Board isNext={isNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
