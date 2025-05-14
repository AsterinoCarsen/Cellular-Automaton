import { EvolutionStrategy, StrategyType } from "../stratRules/EvolutionStrategy";

export class GridEvolution {
    private state: boolean[][];
    private strategies: EvolutionStrategy[];

    constructor(initialState: boolean[][], strategies: EvolutionStrategy[]) {
        this.state = initialState.map(r => [...r]);
        this.strategies = strategies;
    }

    public tick(): void {
        const oldState = this.state;
        const N = oldState.length;
        const next: boolean[][] = [];

        const deathRules = this.strategies.filter(s => s.type === StrategyType.Death);
        const lifeRules = this.strategies.filter(s => s.type === StrategyType.Life);

        for (let x = 0; x < N; x++) {
            const newRow: boolean[] = [];
            
            for (let y = 0; y < N; y++) {
                const isAlive = oldState[x][y];

                if (isAlive) {
                    const dies = deathRules.some(strat => strat.apply(x, y, oldState) === false);
                    if (dies) {
                        newRow.push(false);
                        continue;
                    }
                }

                const lives = lifeRules.some(strat => strat.apply(x, y, oldState));
                newRow.push(lives);
            }

            next.push(newRow);
        }

        this.state = next;
    }
    

    public getState(): boolean[][] {
        return this.state.map(r => [...r]);
    }

}