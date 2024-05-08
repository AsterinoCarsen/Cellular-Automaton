export class AutoGrid {
    private grid: boolean[][];

    constructor(width: number, height: number) {
        this.grid = new Array<boolean[]>(width);

        for (let i = 0; i < width; i++) {
            this.grid[i] = new Array<boolean>(height);
        }

        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                this.grid[i][j] = true;
            }
        }
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