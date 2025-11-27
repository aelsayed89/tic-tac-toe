"use client"
import { Dispatch, SetStateAction } from "react";



type cellProps = {
    id: number;
    go :  string;
    setGo: Dispatch<SetStateAction<string>>;
    cells?: string[];
    setCells?: Dispatch<SetStateAction<string[]>>;
    cell?: string;
    winningMessage? : string;
    winningCombo?: number[];
}
function Cell({id , go , setGo, cells, setCells , cell, winningMessage, winningCombo} : cellProps) {

    
    const isWinningCell = winningCombo?.includes(id);


    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const notTaken = !cells![id];
        
        console.log(notTaken);

        if(notTaken) {
            if(winningMessage)
                return;
            if(go=="circle"){
                console.log("circle turn");
                handleChangeCell("circle");
                setGo("cross");
            }
            else if(go=="cross") {
                handleChangeCell("cross");
                setGo("circle");
            }
        }

    
};
 const handleChangeCell=(cellToChange: string) => {
    
    let copyCells=[...cells!];
    copyCells[id]=cellToChange;
    setCells!(copyCells);
}


    return  <div 
            className={`square ${cell ? 'filled' : ''} ${isWinningCell ? 'winning' : ''}`} 
            onClick={handleClick}
        >
         <div className={`mark ${cell}`}>
                {cell ? (cell === "circle" ? "O" : "X") : ""}
        </div>
    </div>;    
}

export default Cell;