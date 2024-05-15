<script lang="ts">
    import Navbar from "../components/navbar.svelte";
    import "./home.css";
</script>

<Navbar />
<div class="parent">
    <div class="text-content">
        <h1>About</h1>
        <p>
            This web application simulates Conway's Game of Life, which is a discrete simulation of cells, arranged in a grid, that evolve over time, according to a small set of rules.
            <br><br>
            Conway's Game of Life was created by John Horton Conway in 1970, a British mathematician.  It is a specific type of Cellular Automaton simulation, which is a broader concept in computational study known as automata theory.  The concept anthropomorphizes the individual cells as living beings that live due to reproduction or die due to overpopulation.
            <br><br>
            The simulation starts with some initial conditions, which is a certain set of cells that are alive.  Once the simulation begins, each time step calculates which cells die from overpopulation or underpopulation, which are born from reproduction, and which cells stay alive into the next time-step.
            <br><br>
            The rules are as follows:
        </p>

        <ul>
            <li>Any alive cell with fewer than two alive neighbors dies by underpopulation.</li>
            <li>Any alive cell with two or three alive neighbors stays alive.</li>
            <li>Any alive cell with more than three alive neighbors dies by overpopulation.</li>
            <li>And dead cell with exactly three neighbors becomes alive due to reproduction.</li>
        </ul>
    </div>
</div>