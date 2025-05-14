import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EvolutionStrategy } from "@/lib/stratRules/EvolutionStrategy";

export function SortableStrategyItem({ strategy, onDelete }: { strategy: EvolutionStrategy; onDelete: (id: string) => void}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: strategy.id
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center justify-between gap-2 p-2 border border-white/20 rounded-md bg-white/5"
            >
            <div className="flex items-center gap-2">
                <button {...attributes} {...listeners}>
                <GripVertical className="text-white opacity-60 cursor-grab" />
                </button>
                <div className="flex flex-col">
                <span className="font-semibold text-white">{strategy.constructor.name}</span>
                <span className="text-xs text-white/50">{strategy.type}</span>
                </div>
            </div>

            <button onClick={() => onDelete(strategy.id)} title="Delete Strategy">
                <Trash2 className="text-red-400 hover:text-red-500" size={18} />
            </button>
        </div>
    );
}