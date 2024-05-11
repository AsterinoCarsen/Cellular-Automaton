<script lang="ts">
    export let isOn: boolean = false;
</script>

<style>
    .parent {
        width: 35px;
        height: 35px;
        border: 2px solid whitesmoke;
    }

    .isOff {
        width: 100%;
        height: 100%;
        background-color: black;
    }

    .isOff:hover {
        background-color: rgb(60, 60, 60);
    }

    .isOn {
        width: 100%;
        height: 100%;
        background-color: rgba(153, 255, 0, 0.5);
    }

    .isOn:hover {
        background-color: #d1ff8d80;
    }
</style>

<div class="parent">
    {#if isOn == false}
        <div class="isOff">
        </div>
    {/if}


    {#if isOn == true}
        <div class="isOn">
        </div>
    {/if}
</div>