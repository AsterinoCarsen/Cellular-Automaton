import { EvolutionStrategy } from "../stratRules/EvolutionStrategy";

export class GridEvolution {
    private state: boolean[][];
    private strategies: EvolutionStrategy[];

    constructor(initialState: boolean[][], strategies: EvolutionStrategy[]) {
        this.state = initialState;
        this.strategies = strategies;
    }

    public tick(): void {
        let workingState = this.state.map(row => [...row]);
    
        for (const strat of this.strategies) {
            const updatedState: boolean[][] = [];
    
            for (let i = 0; i < workingState.length; i++) {
                const newRow: boolean[] = [];
    
                for (let j = 0; j < workingState[0].length; j++) {
                    const newCellState = strat.apply(i, j, workingState);
                    newRow.push(newCellState);
                }
    
                updatedState.push(newRow);
            }
    
            workingState = updatedState;
        }
    
        this.state = workingState;
    }
    

    public getState(): boolean[][] {
        return this.state;
    }

}