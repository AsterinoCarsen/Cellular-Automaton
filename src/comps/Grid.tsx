import { useEffect, useRef } from 'react';

interface GridProps {
    size: number;
    cellSize: number;
    cells: boolean[][];
}

export default function Grid({ size, cellSize, cells }: GridProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const dimension = size * cellSize;

    useEffect(() => {
        if (cells.length != cells[0].length) {
            throw new Error("[Grid] Input cells are not square.");
        }

        if (cells.length != size) {
            throw new Error("[Grid] Parameter 'size' needs to match the dimension of input cells array.");
        }

        if (size < 1) {
            throw new Error("[Grid] Parameter 'size' is not large enough.");
        }

        if (cellSize < 10) {
            throw new Error("[Grid] Parameter 'cellSize' is not large enough.");
        }

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
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if (cells[row]?.[col]) {
                    ctx.fillStyle = '#fff';
                    ctx.fillRect(col * cellSize + offset, row * cellSize + offset, cellSize - offset * 2, cellSize - offset * 2);
                }
            }
        }      

    }, [size, cellSize, dimension, cells]);

    return (
        <canvas ref={canvasRef} width={dimension} height={dimension} />
    )
}