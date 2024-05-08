<script lang="ts">
    export let isOn: boolean = false;
    console.log("Init node as: " + isOn);
</script>

<style>
    .parent {
        width: 20px;
        height: 20px;
    }

    .isOff {
        width: 100%;
        height: 100%;
        background-color: white;
    }

    .isOn {
        width: 100%;
        height: 100%;
        background-color: black;
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