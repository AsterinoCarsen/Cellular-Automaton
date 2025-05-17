import { EvolutionStrategy, StrategyType } from "./EvolutionStrategy";
import { v4 as uuidv4 } from 'uuid';

// Any dead cell with exactly three live neighbors becomes a live cell, by reproduction.
export class ReproductionStrategy implements EvolutionStrategy {
    readonly type = StrategyType.Life;
    readonly id = uuidv4();
    readonly title = "Reproduction";
    readonly description = "Any dead cell with three live neighbors becomes a live cell, by reproduction.";
    
    apply(x: number, y: number, state: boolean[][]): boolean {
        if (state[x][y] === true) return true;

        const rows = state.length;
        const cols = state[0].length;
        let aliveNeighbors = 0;

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                const nx = x + dx;
                const ny = y + dy;

                if (
                    nx >= 0 && nx < rows &&
                    ny >= 0 && ny < cols &&
                    state[nx][ny]
                ) {
                    aliveNeighbors++;
                }
            }
        }

        if (aliveNeighbors === 3) {
            return true;
        }

        return false;
    }
}