import { useState, useRef } from 'react';
import { GridEvolutionFactory } from '@/lib/factories/GridEvolutionFactory';

import { OverpopulationStrategy } from '@/lib/stratRules/OverpopulationStrategy';
import { UnderpopulationStrategy } from '@/lib/stratRules/UnderpopulationStrategy';
import { ReproductionStrategy } from '@/lib/stratRules/ReproductionStrategy';
import { SurvivalStrategy } from '@/lib/stratRules/SurvivalStrategy';

import Grid from "../comps/Grid";

export default function Home() {
    const evolutionRef = useRef(
        GridEvolutionFactory.create(
            5,
            [new UnderpopulationStrategy(), new SurvivalStrategy(), new OverpopulationStrategy(), new ReproductionStrategy()],
            true
        )
    );

    const [cellsGrid, setCellsGrid] = useState<boolean[][]>(
        evolutionRef.current.getState()  
    );

    const [isRunning, setIsRunning] = useState<boolean>(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleTick = () => {
        evolutionRef.current.tick();
        const newState = evolutionRef.current.getState().map(row => [...row]);
        setCellsGrid(newState);
    }

    const toggleIsRunning = () => {
        if (isRunning) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            setIsRunning(false);
        } else {
            intervalRef.current = setInterval(() => {
                handleTick();
            }, 150);
            setIsRunning(true);
        }
    }

    return (
        <div className="flex flex-col gap-4 justify-center items-center w-screen h-screen">
            <Grid cells={cellsGrid} cellSize={40} />

            <button
                onClick={toggleIsRunning}
                className={`px-6 py-2 rounded-xl shadow-md transition-all text-white ${
                    isRunning ? "bg-green-500 hover:bg-green-600" : "bg-blue-400 hover:bg-blue-500"
                }`}
                
            >
                Toggle Runtime
            </button>

        </div>
    );
}
