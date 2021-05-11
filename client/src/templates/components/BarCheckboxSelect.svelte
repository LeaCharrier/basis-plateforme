<!-- BarCheckboxSelect.svelte -->
<script>
    let active = false;
</script>

<div class="barCheckox is-hidden" class:is-hidden={active}>
    <div class="flex">
        <img src="./assets/media/cross.svg" alt="cross" class="cross" on:click="{() => active = !active}">
        <p class='txt_body text'>1 token selected</p>
    </div>
    <a href="/" class="button">See analytics</a>
</div>

<style lang="scss">
    @import './../utils';

    .barCheckox {
        position: absolute;
        background: $blue2;
        width: 97%;
        left: 50%;
        right: 0;
        transform: translateX(-50%);
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        bottom: 30px;

        img {
            cursor: pointer;
        }

        .flex {
            display: flex;
            align-items: center;
        }

        .text {
            color: $white;
            font-family: $bold;
            margin-left: 5px;
        }
    }
</style>
