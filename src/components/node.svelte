<script lang="ts">
    export let isOn: boolean = false;
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
            isOff
        </div>
    {/if}


    {#if isOn == true}
        <div class="isOn">
            isOn
        </div>
    {/if}
</div>