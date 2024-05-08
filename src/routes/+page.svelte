<script lang="ts">
    import { AutoGrid } from "../objects/automaton_grid";
    import { Vector2 } from "../objects/Vector2";
    import Node from "../components/node.svelte";

    const gridObj = new AutoGrid(5, 5);
    const grid = gridObj.getGrid();
    let neighbors: Vector2[] = gridObj.getNeighbors(new Vector2(3, 3));
    neighbors.forEach(neighbor => {
        console.log(neighbor.toString());
    });
</script>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(50, 1fr);
        grid-template-rows: repeat(50, 1fr);
        gap: 1px;
    }
</style>


<div class="grid">
    {#each grid as row}
        {#each row as node}
            <Node isOn={node} />
        {/each}
    {/each}
</div>
