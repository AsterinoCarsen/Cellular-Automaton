import { EvolutionStrategy, StrategyType } from "./EvolutionStrategy";
import { v4 as uuidv4 } from 'uuid';

// Any live cell with more than three live neighbors dies.
export class OverpopulationStrategy implements EvolutionStrategy {
    readonly type = StrategyType.Death;
    readonly id = uuidv4();
    readonly title = "Overpopulation";
    readonly description = "Any live cell with more than three neighbors dies.";

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

        if (isAlive && aliveNeighbors > 3) {
            return false;
        }

        return isAlive;
    }
}