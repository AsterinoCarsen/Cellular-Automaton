<script lang="ts">
    import { AutoGrid } from "../objects/automaton_grid";
    import { Vector2 } from "../objects/Vector2";
    import Node from "../components/node.svelte";

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

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(20, 1fr);
        grid-template-rows: repeat(20, 1fr);
        width: max-content;
        gap: 0px;
    }

    .parent {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: black;
        height: 100vh;
    }

    .buttons {
        border: none;
        background-color: rgb(32, 32, 32);
        color: white;
        width: 200px;
        height: 50px;
        margin: 5px;
        border-radius: 5px;
    }

    .playbacktrue {
        border: none;
        background-color: rgb(116, 116, 116);
        color: white;
        width: 200px;
        height: 50px;
        margin: 5px;
        border-radius: 5px;
    }

    .playbackfalse {
        border: none;
        background-color: rgb(32, 32, 32);
        color: white;
        width: 200px;
        height: 50px;
        margin: 5px;
        border-radius: 5px;
    }

    .buttons:hover {
        background-color: rgb(53, 53, 53);
    }

    .cells {
        border: none;
        padding: 0;
    }
    
    .userInput {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .slider {
        -webkit-appearance: none;
        background-color: rgb(32, 32, 32);
        width: 200px;
        height: 50px;
        margin: 5px;
        border-radius: 5px;
    }

    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        cursor: pointer;
        background: white;
        height: 50px;
    }
</style>

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
    </div>
</div>
