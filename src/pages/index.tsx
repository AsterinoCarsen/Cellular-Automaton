import { useState, useRef, useEffect } from 'react';
import { GridEvolutionFactory } from '@/lib/factories/GridEvolutionFactory';

import { OverpopulationStrategy } from '@/lib/stratRules/OverpopulationStrategy';
import { UnderpopulationStrategy } from '@/lib/stratRules/UnderpopulationStrategy';
import { ReproductionStrategy } from '@/lib/stratRules/ReproductionStrategy';
import { SurvivalStrategy } from '@/lib/stratRules/SurvivalStrategy';

import Grid from "../comps/Grid";

import { Toggle } from '@/components/ui/toggle';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";

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

import { Plus } from 'lucide-react';

import { SortableStrategyItem } from '@/comps/SortableStrategyItem';
import { EvolutionStrategy } from '@/lib/stratRules/EvolutionStrategy';

export default function Home() {
    const [strategies, setStrategies] = useState<EvolutionStrategy[]>([
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
    const [speed, setSpeed] = useState<number>(1);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const allAvailableStrategies = [
        new UnderpopulationStrategy(),
        new SurvivalStrategy(),
        new OverpopulationStrategy(),
        new ReproductionStrategy()
    ];

    const handleTick = () => {
        evolutionRef.current.tick();
        const newState = evolutionRef.current.getState().map(row => [...row]);
        setCellsGrid(newState);
    }

    useEffect(() => {
        if (isRunning) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            intervalRef.current = setInterval(() => {
                handleTick();
            }, (150 / speed));
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, [speed, isRunning]);

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
            }, (150 / speed));
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

    const handleAddStrategy = (strategyTitle: string) => {
        const StrategyMap: Record<string, () => EvolutionStrategy> = {
            "Underpopulation": () => new UnderpopulationStrategy(),
            "Survival": () => new SurvivalStrategy(),
            "Overpopulation": () => new OverpopulationStrategy(),
            "Reproduction": () => new ReproductionStrategy()
        };

        const newStrategy = StrategyMap[strategyTitle]();
        const updatedStrategies = [...strategies, newStrategy];
        setStrategies(updatedStrategies);

        evolutionRef.current = GridEvolutionFactory.create(
            cellsGrid.length,
            updatedStrategies,
            false,
            cellsGrid
        );
    };

    return (
        <div className="flex flex-row gap-4 justify-center items-center w-screen h-screen">
            <Grid cells={cellsGrid} cellSize={40} onToggleCells={handleToggleCell} />

            <div className='flex flex-col w-128 h-160 border-1 rounded-lg p-8 select-none'>
                <div className='flex'>
                    <div className='flex flex-col w-2/3'>
                        <h1 className='font-semibold text-white'>Controls</h1>
                        <p className='my-1 text-sm text-white/50'>Change the settings of the simulation</p>
                    </div>

                    <div className='flex w-1/3 justify-end items-end'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    <Plus />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='bg-black text-white'>
                                {allAvailableStrategies
                                    .filter(s => !strategies.some(existing => existing.constructor.name === s.constructor.name))
                                    .map(strategy => (
                                        <DropdownMenuItem
                                            key={strategy.id}
                                            onClick={() => handleAddStrategy(strategy.title)}
                                        >
                                            {strategy.title}
                                        </DropdownMenuItem>
                                    ))
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <Separator className='bg-white/20 h-px my-2' />

                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={strategies.map(s => s.id)} strategy={verticalListSortingStrategy}>
                        <div className='flex flex-col gap-2 mt-4 overflow-auto h-auto scrollbar-thumb-white/30'>
                            {strategies.map(strategy => (
                                <SortableStrategyItem key={strategy.id} strategy={strategy} onDelete={handleDeleteStrategy} />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>

                <Slider 
                    onValueChange={(value) => setSpeed(value[0])} 
                    className='my-4 w-full' 
                    defaultValue={[1]} 
                    max={1.75} min={0.25} step={0.25}
                    
                />
                
                <p className='text-sm text-white text-center -mt-2'>
                    <b>Simulation Speed: </b>{speed.toFixed(2)}x
                </p>

                <Button className='my-4' variant="outline"
                    onClick={() => {
                        evolutionRef.current = GridEvolutionFactory.create(
                            cellsGrid.length,
                            strategies,
                            true
                        );
                        setCellsGrid(evolutionRef.current.getState());
                    }}
                >
                    Randomize Grid
                </Button>

                <Toggle
                    onClick={toggleIsRunning}
                    variant="outline"
                    className='my-4'
                >
                    {isRunning ? "Turn Off" : "Turn On"}
                </Toggle>

            </div>

        </div>
    );
}
