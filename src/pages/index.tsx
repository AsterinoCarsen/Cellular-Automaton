import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GridEvolutionFactory } from '@/lib/factories/GridEvolutionFactory';

import { EvolutionStrategy } from '@/lib/stratRules/EvolutionStrategy';

import { OverpopulationStrategy } from '@/lib/stratRules/OverpopulationStrategy';
import { UnderpopulationStrategy } from '@/lib/stratRules/UnderpopulationStrategy';
import { ReproductionStrategy } from '@/lib/stratRules/ReproductionStrategy';
import { SurvivalStrategy } from '@/lib/stratRules/SurvivalStrategy';

import Grid from "../comps/Grid";

import { Toggle } from '@/components/ui/toggle';

import {
    DndContext,
    closestCenter,
    DragEndEvent
} from '@dnd-kit/core';

import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';

import { SortableStrategyItem } from '@/comps/SortableStrategyItem';

export default function Home() {
    const [strategies, setStrategies] = useState([
        new UnderpopulationStrategy(),
        new SurvivalStrategy(),
        new OverpopulationStrategy(),
        new ReproductionStrategy()
    ]);

    const evolutionRef = useRef(
        GridEvolutionFactory.create(20, strategies, true)
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

    const handleToggleCell = (row: number, col: number) => {
        const newGrid = cellsGrid.map((rowArr, i) => 
            rowArr.map((cell, j) => (i === row && j === col ? !cell : cell))
        );

        evolutionRef.current = GridEvolutionFactory.create(
            newGrid.length,
            [new UnderpopulationStrategy(), new SurvivalStrategy(), new OverpopulationStrategy(), new ReproductionStrategy()],
            false,
            newGrid
        );

        setCellsGrid(newGrid);
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = strategies.findIndex(s => s.id === active.id);
            const newIndex = strategies.findIndex(s => s.id === over?.id);
            const newOrder = arrayMove(strategies, oldIndex, newIndex);
            setStrategies(newOrder);

            evolutionRef.current = GridEvolutionFactory.create(
                cellsGrid.length,
                newOrder,
                false,
                cellsGrid
            );
        }
    };

    const handleDeleteStrategy = (id: string) => {
        const updated = strategies.filter((s) => s.id !== id);
        setStrategies(updated);
        
        evolutionRef.current = GridEvolutionFactory.create(
            cellsGrid.length,
            updated,
            false,
            cellsGrid
        );
    }

    return (
        <div className="flex flex-row gap-4 justify-center items-center w-screen h-screen">
            <Grid cells={cellsGrid} cellSize={40} onToggleCells={handleToggleCell} />

            <div className='flex flex-col w-96 h-96 border-1 rounded-lg p-8'>
                <Toggle
                    onClick={toggleIsRunning}
                    variant="outline"
                >
                    {isRunning ? "Turn Off" : "Turn On"}
                </Toggle>

                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={strategies.map(s => s.id)} strategy={verticalListSortingStrategy}>
                        <div className='flex flex-col gap-2 mt-4 overflow-auto max-h-72'>
                            {strategies.map(strategy => (
                                <SortableStrategyItem key={strategy.id} strategy={strategy} onDelete={handleDeleteStrategy} />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>

            </div>

        </div>
    );
}
