<script lang="ts">
    import { AutoGrid } from "../objects/automaton_grid";
    import { Vector2 } from "../objects/Vector2";
    import Node from "../components/node.svelte";
    import Navbar from "../components/navbar.svelte";
    import "../lib/homePage.css";

    let grid = new AutoGrid(20, 20);
    let internalGrid: boolean[][] = grid.getGrid();

    let isPlaying: boolean = false;
    let intervalId: number | undefined;

    let inputSimulationSpeed = 0.5;

    function timeStep() {
        grid.timeStep();
        updateInternalGrid();
    }

    function togglePlayback() {
        isPlaying = !isPlaying;
        if (isPlaying) {
            // Call timeStep() every x seconds
            intervalId = setInterval(timeStep, inputSimulationSpeed * 1000);
        } else {
            clearInterval(intervalId);
        }
    }

    function updateSimulationSpeed() {
        if (isPlaying) {
            clearInterval(intervalId);
            intervalId = setInterval(timeStep, inputSimulationSpeed * 1000);
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

<Navbar />

<div class="parent">
    <div class="grid">
        {#each internalGrid as row, i}
            {#each row as node, j}
                <button class="cells" on:click={() => toggleNode(i, j)}>
                    <Node bind:isOn={internalGrid[i][j]} />
                </button>
            {/each}
        {/each}
    </div>

    <div class="userInput">
        <button class="playback{isPlaying}" on:click={togglePlayback}>Toggle Playback</button>
        <button class="buttons" on:click={clear}>Reset</button>
        <input class="slider" type="range" min="0.05" max="1" step="0.01" bind:value={inputSimulationSpeed} on:change={updateSimulationSpeed} >
        <p>
            {#if inputSimulationSpeed == 1}
                {inputSimulationSpeed} second / update
            {:else}
                {inputSimulationSpeed} seconds / update
            {/if}
        </p>
    </div>
</div>
