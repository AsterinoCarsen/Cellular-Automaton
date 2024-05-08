// Any ON cell with fewer than two ON neighbors dies.
// Any ON cell with two or three ON neighbors stays ON.
// Any ON cell with more than three neighbors goes OFF.
// Any OFF cells with exactly three ON neighbors turns ON.

import { Vector2 } from "./Vector2";

export class AutoGrid {
    private grid: boolean[][];
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

        this.grid = new Array<boolean[]>(width);

        for (let i = 0; i < width; i++) {
            this.grid[i] = new Array<boolean>(height);
        }

        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                this.grid[i][j] = false;
            }
        }
    }

    getNeighbors(node: Vector2): Vector2[] {
        let initVectors: Vector2[] = [];
        let finalVectors: Vector2[] = [];
        let x: number = node.getX();
        let y: number = node.getY();

        initVectors.push(new Vector2(x - 1, y));
        initVectors.push(new Vector2(x + 1, y));
        initVectors.push(new Vector2(x, y - 1));
        initVectors.push(new Vector2(x, y + 1));
        initVectors.push(new Vector2(x - 1, y - 1));
        initVectors.push(new Vector2(x + 1, y + 1));
        initVectors.push(new Vector2(x - 1, y + 1));
        initVectors.push(new Vector2(x + 1, y - 1));

        initVectors.forEach(vector => {
            if (this.isWithinBounds(vector)) {
                finalVectors.push(vector);
            }
        });

        return finalVectors;
    }

    isWithinBounds(position: Vector2): boolean {
        let x: number = position.getX();
        let y: number = position.getY();

        if (x != -1 && y != -1 && x != this.width + 1 && y != this.height + 1) {
            return true;
        }

        return false;
    }

    getGrid(): boolean[][] {
        return this.grid;
    }

    toString(): string {
        let out: string = "";

        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                out += this.grid[i][j] + " ";
            }
            out += '\n';
        }

        return out;
    }
}