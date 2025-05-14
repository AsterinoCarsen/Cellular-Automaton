export enum StrategyType {
    Death = 'death',
    Life = 'life'
}

export interface EvolutionStrategy {
    readonly type: StrategyType;
    apply(x: number, y: number, state: boolean[][] | boolean[]): boolean;
}