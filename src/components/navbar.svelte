<script lang="ts">
    export let currPage : String = "about";
</script>

<style>
    ::selection {
        background-color: white;
        color: black;
    }

    .navbar {
        position: absolute;
        display: flex;
        width: 100vw;
        height: 50px;
        background-color: black;
        border-bottom: solid 2px white;
        justify-content: start;
        align-items: center;
        padding-left: 100px;
    }

    a {
        color: white;
        font-size: 1.2rem;
        padding-right: 5vw;
        text-decoration: none;
    }

    a:hover {
        color: lightgray;
    }

    .currPage {
        text-decoration: underline;
    }
</style>

<div class="navbar">
    {#if currPage == "about"}
        <a class="currPage" href="/">About</a>
    {:else}
        <a href="/">About</a>
    {/if}

    {#if currPage == "simulation"}
        <a class="currPage" href="/simulation">Simulation</a>
    {:else}
        <a href="/simulation">Simulation</a>
    {/if}
    
    <a target="_blank" href="https://github.com/AsterinoCarsen/Cellular-Automaton">GitHub</a>
</div>