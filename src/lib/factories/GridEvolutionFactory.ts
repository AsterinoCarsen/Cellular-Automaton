import { EvolutionStrategy } from "../stratRules/EvolutionStrategy";
import { GridEvolution } from "../stratContexts/GridEvolution";

export class GridEvolutionFactory {
    public static create(
        size: number,
        strategies: EvolutionStrategy[],
        randomize: boolean = false,
        customInitialState?: boolean[][]
    ): GridEvolution {
        if (customInitialState) {
            return new GridEvolution(customInitialState, strategies);
        }

        const initialState: boolean[][] = [];

        for (let i = 0; i < size; i++) {
            const row: boolean[] = [];

            for (let j = 0; j < size; j++) {
                row.push(randomize? Math.random() < 0.5 : false);
            }

            initialState.push(row);
        }

        return new GridEvolution(initialState, strategies);
    }
}