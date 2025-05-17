import { useEffect, useState, useRef } from 'react';

interface GridProps {
    cellSize: number;
    cells: boolean[][];
    onToggleCells: (row: number, col: number) => void;
}

export default function Grid({ cellSize, cells, onToggleCells }: GridProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [hoveredCell, setHoveredCell] = useState<[number, number] | null>(null);

    const numRows = cells.length;
    const numCols = cells[0]?.length ?? 0;

    if (numRows === 0 || numCols === 0) {
        throw new Error("[Grid] Input array must not be empty.");
    }

    if (numRows !== numCols) {
        throw new Error("[Grid] Input array must be square.");
    }

    if (cellSize < 10) {
        throw new Error("[Grid] Parameter 'cellSize' is too small.");
    }

    const dimension = numRows * cellSize;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            throw new Error("[Grid] Cannot find Canvas reference.")
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error("[Grid] Cannot find Canvas reference.")
        }

        ctx.clearRect(0, 0, dimension, dimension);
        ctx.strokeStyle = '#ccc';
        for (let x = 0; x <= dimension; x += cellSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, dimension);
            ctx.stroke();
        }

        for (let y = 0; y <= dimension; y += cellSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(dimension, y);
            ctx.stroke();
        }  

        const offset = 1;
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numRows; col++) {
                if (cells[row]?.[col]) {
                    ctx.fillStyle = '#fff';
                    ctx.fillRect(
                        col * cellSize + offset,
                        row * cellSize + offset,
                        cellSize - offset * 2,
                        cellSize - offset * 2
                    );
                }
            }
        }

        if (hoveredCell) {
            const [row, col] = hoveredCell;

            if (cells[row][col]) {
                ctx.fillStyle = 'rgb(245, 245, 245)';
            } else {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            }

            ctx.fillRect(
                col * cellSize + offset,
                row * cellSize + offset,
                cellSize - offset * 2,
                cellSize - offset * 2
            );
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const col = Math.floor(x / cellSize);
            const row = Math.floor(y / cellSize);

            if (row >= 0 && row < numRows && col >= 0 && col < numCols) {
                setHoveredCell([row, col]);
            } else {
                setHoveredCell(null);
            }
        }
        
        const handleClick = (e: MouseEvent) => {
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const col = Math.floor(x / cellSize);
            const row = Math.floor(y / cellSize);

            if (row >= 0 && row < numRows && col >= 0 && col < numCols) {
                onToggleCells(row, col);
            }
        };

        canvas.addEventListener('click', handleClick);
        canvas.addEventListener('mousemove', handleMouseMove);

        return () => {
            canvas.removeEventListener('click', handleClick);
            canvas.removeEventListener('mousemove', handleMouseMove);
        }

    }, [cells, cellSize, dimension, numRows, numCols, onToggleCells, hoveredCell]);

    return (
        <canvas ref={canvasRef} width={dimension} height={dimension} style={{ cursor: 'pointer' }} />
    )
}