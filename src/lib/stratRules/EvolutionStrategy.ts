export interface EvolutionStrategy {
    apply(x: number, y: number, state: boolean[][] | boolean[]): boolean;
}