import { EvolutionStrategy, StrategyType } from "./EvolutionStrategy";
import { v4 as uuidv4 } from 'uuid'; 

// Any live cell with two or three live neighbors lives on to the next generation.
export class SurvivalStrategy implements EvolutionStrategy {
    readonly type = StrategyType.Life;
    readonly id = uuidv4();

    apply(x: number, y: number, state: boolean[][]): boolean {
        const rows = state.length;
        const cols = state[0].length;
        const isAlive = state[x][y];
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

        if (isAlive && (aliveNeighbors === 2 || aliveNeighbors === 3)) {
            return true;
        }
        
        return false;
    }
}