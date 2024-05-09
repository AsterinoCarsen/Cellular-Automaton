<script lang="ts">
    import { AutoGrid } from "../objects/automaton_grid";
    import { Vector2 } from "../objects/Vector2";
    import Node from "../components/node.svelte";

    let grid = new AutoGrid(20, 20);
    let internalGrid: boolean[][] = grid.getGrid();
    let isPlaying: boolean = false;
    let intervalId: number | undefined;

    function timeStep() {
        grid.timeStep();
        updateInternalGrid();
    }

    function togglePlayback() {
        isPlaying = !isPlaying;
        if (isPlaying) {
            // Call timeStep() every x seconds
            intervalId = setInterval(timeStep, 0.1 * 1000);
        } else {
            clearInterval(intervalId);
        }
    }

    function clear() {
        grid.clear();
        updateInternalGrid();
    }

    function toggleNode(x: number, y: number) {
        let vector: Vector2 = new Vector2(x, y);
        grid.setValue(vector, !grid.getValue(vector));
        updateInternalGrid();
    }

    function updateInternalGrid() {
        internalGrid = grid.getGrid();
    }
</script>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(20, 1fr);
        grid-template-rows: repeat(20, 1fr);
        width: max-content;
        gap: 0px;
    }

    button {
        border: none;
        padding: 0;
    }
</style>

<button on:click={togglePlayback}>Toggle Playback</button>
<button on:click={clear}>Reset</button>
<div class="grid">
    {#each internalGrid as row, i}
        {#each row as node, j}
            <button on:click={() => toggleNode(i, j)}>
                <Node bind:isOn={internalGrid[i][j]} />
            </button>
        {/each}
    {/each}
</div>
