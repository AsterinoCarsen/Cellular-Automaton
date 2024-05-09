// Any ON cell with fewer than two ON neighbors dies.
// Any ON cell with two or three ON neighbors stays ON.
// Any ON cell with more than three ON neighbors goes OFF.
// Any OFF cells with exactly three ON neighbors turns ON.

import { Vector2 } from "./Vector2";

// A grid representation of a cellular automaton simulation, including time stepping.
export class AutoGrid {
    private grid: boolean[][];
    private width: number;
    private height: number;

    // Initalize a 2D boolean array where every element is false.
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

    // Advance the time by one step according to cellular automaton rules.
    timeStep() {
        let needsOn: Vector2[] = [];
        let needsOff: Vector2[] = [];

        for (let i = 0; i < this.width - 1; i++) {
            for (let j = 0; j < this.height - 1; j++) {
                let currNode: boolean = this.grid[i][j];
                let onNeighbors: number = this.getOnNeighborCount(new Vector2(i, j));
                if (currNode == true) {
                    if (onNeighbors < 2 || onNeighbors > 3) {
                        needsOff.push(new Vector2(i, j))
                    }
                } else {
                    if (onNeighbors == 3) {
                        needsOn.push(new Vector2(i, j))
                    }
                }
            }
        }

        needsOn.forEach(vector => {
            this.setValue(vector, true);
        });

        needsOff.forEach(vector => {
            this.setValue(vector, false);
        });

    }

    // Count the number of neighbors of a node that are set to true.
    getOnNeighborCount(node: Vector2): number {
        let count: number = 0;
        let neighbors: Vector2[] = this.getNeighbors(node);
        neighbors.forEach(neighbor => {
            if (this.getValue(neighbor) == true) {
                count++;
            }
        });

        return count;
    }

    // Get a list of positions that are neighboring to a specific node.
    // A neighbor is a position that's one away on X and Y, including diagonals.
    getNeighbors(node: Vector2): Vector2[] {
        let x: number = node.getX();
        let y: number = node.getY();

        let initVectors: Vector2[] = [
            new Vector2(x - 1, y),
            new Vector2(x + 1, y),
            new Vector2(x, y - 1),
            new Vector2(x, y + 1),
            new Vector2(x - 1, y - 1),
            new Vector2(x + 1, y + 1),
            new Vector2(x - 1, y + 1),
            new Vector2(x + 1, y - 1)
        ];

        let finalVectors: Vector2[] = [];

        initVectors.forEach(vector => {
            if (this.isWithinBounds(vector)) {
                finalVectors.push(vector);
            }
        });

        return finalVectors;
    }

    // Chcek if a given position is within the bounds of the 2D boolean array.
    isWithinBounds(position: Vector2): boolean {
        let x: number = position.getX();
        let y: number = position.getY();

        if (x != -1 && y != -1 && x != this.width + 1 && y != this.height + 1) {
            return true;
        }

        return false;
    }

    // Set all elements of the 2D boolean array to false.
    clear() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                this.grid[i][j] = false;
            }
        }
    }

    // Change the value of a element at a position.
    setValue(node: Vector2, value: boolean) {
        this.grid[node.getX()][node.getY()] = value;
    }

    // Get the value of a element at a position.
    getValue(node: Vector2) : boolean {
        return this.grid[node.getX()][node.getY()];
    }

    // Get the current 2D boolean array.
    getGrid(): boolean[][] {
        return this.grid;
    }

    // Get a string representation of the 2D boolean array.
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

    // Print into the console the current toString representation.
    print() {
        console.log(this.toString());
    }
}