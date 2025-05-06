import { useEffect, useRef } from 'react';

interface LineProps {
    cellSize: number;
    cells: boolean[];
}

export default function Line({ cellSize, cells }: LineProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const width = cells.length * cellSize;
    const height = cellSize;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            throw new Error("[Grid] Cannot find Canvas reference.")
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error("[Grid] Cannot find Canvas reference.")
        }

        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = '#ccc';

        for (let x = 0; x <= width; x += cellSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(width, 0);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(width, height);
        ctx.stroke();

        const offset = 1;
        for (let i = 0; i < cells.length; i++) {
            if (cells[i]) {
                ctx.fillStyle = '#fff';
                ctx.fillRect(
                    i * cellSize + offset,
                    offset,
                    cellSize - offset * 2,
                    cellSize - offset * 2
                );
            }
        }

    }, [cellSize, cells, width, height]);

    return (
        <canvas ref={canvasRef} width={width} height={height} />
    )
}