<script lang="ts">
    import { AutoGrid } from "../objects/automaton_grid";
    import Node from "../components/node.svelte";

    const grid = new AutoGrid(50, 50).getGrid();
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
