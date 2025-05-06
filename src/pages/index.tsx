import { useState } from 'react';
import Grid from "../comps/Grid";
import Line from "../comps/Line";

export default function Home() {
    const [cellsGrid, setCellsGrid] = useState<boolean[][]>([
        [true, false, false, false, false],
        [false, true, false, false, false],
        [false, false, false, true, false],
        [false, false, false, true, false],
        [false, true, false, false, false]
    ]);
    
    const [cellsLine, setCellsLine] = useState<boolean[]>([
        true, false, false, false, true, true, false, false
    ]);

    function handleGridClick() {
        const size = cellsGrid.length;
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);

        const newGrid = cellsGrid.map(row => [...row]);

        newGrid[row][col] = !newGrid[row][col];

        setCellsGrid(newGrid);
    }

    function handleLineClick() {
        const size = cellsLine.length;
        const index = Math.floor(Math.random() * size);

        const newLine = [...cellsLine];

        newLine[index] = !newLine[index];

        setCellsLine(newLine);
    }

    return (
        <div className="flex flex-col gap-4 justify-center items-center w-screen h-screen">
            <Grid cells={cellsGrid} cellSize={50} />
            <Line cells={cellsLine} cellSize={50} />

            <button
                onClick={handleGridClick}
                className="px-6 py-2 bg-blue-400 text-white rounded-xl shadow-md hover:bg-blue-500 transition-all"
            >
                Change Grid State
            </button>

            <button
                onClick={handleLineClick}
                className="px-6 py-2 bg-green-400 text-white rounded-xl shadow-md hover:bg-green-500 transition-all"
            >
                Change Line State
            </button>
        </div>
    );
}
