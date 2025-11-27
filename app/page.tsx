"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import Cell from "./components/cell";
import { Combo } from "next/font/google";

export default function Home() {
  const [cells, setCells] = useState(["","","","","","","","","" ]);
  const[go, setGo] = useState("circle");
  const [winningCombo, setWinningCombo] = useState<number[]>([]);
  const winingCombo=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  useEffect(()=>{
      winingCombo.forEach((combo) => {
        const circleWins=combo.every((cell)=>cells[cell]==="circle");
        const crossWins=combo.every((cell)=>cells[cell]==="cross");
        if (circleWins){
          setWinningMessage("Circle Wins!")
        }
        if (crossWins){
          setWinningMessage("Cross Wins!")
        }

      });
  },[cells]);
   const resetGame = () => {
    setCells(["","","","","","","","",""]);
    setGo("circle");
    setWinningMessage("");
    setWinningCombo([]);
  };

  const [winningMessage, setWinningMessage] = useState("");



  console.log(cells);
  
  return (
      <main className="container">
        <div className="game-wrapper">
          <h1 className="title">Tic Tac Toe</h1>
          <div className={`status-bar ${winningMessage ? 'game-over' : ''}`}>
            {!winningMessage ? (
              <>
                <span className="label">Current Turn:</span>
                <span className={`player ${go}`}>
                  {go === "circle" ? "O" : "X"}
                </span>
              </>
            ) : (
              <span className="winner-text">{winningMessage}</span>
            )}
          </div>
          <div className="gameboard">


            {cells.map((cell, index) => (
              <Cell 
                  id={index} 
                  go={go} 
                  setGo={setGo} 
                  key={index} 
                  cells={cells} 
                  setCells={setCells} 
                  cell={cell} 
                  winningMessage={winningMessage} 
                  winningCombo={winningCombo}/>
            ))}
          </div>   
              {winningMessage && (
          <button className="reset-btn" onClick={resetGame}>
            Play Again
          </button>
        )}
        </div>
        {/* {!winningMessage && <div>Current Turn: {go === "circle" ? "O" : "X"}</div> }
        <div>{winningMessage} </div> */}
      </main>
  );
}
