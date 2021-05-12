<!-- Source.svelte -->
<script>
    // console.log('Hello Basis from Header.svelte');
</script>

<div class="source">
    <div class="content">
        <img src="./assets/media/figma-logo.svg" alt="logo">
        <p class="txt_caption">Ariane Design System</p>
    </div>
</div>

<style lang="scss">
    @import './../utils';

    .source {
        padding: 4px;
        border-radius: 4px;
        border: 1px solid $bgGrey;
        display: inline-block;

        .content {
            display: flex;
            align-items: center;
        }

        p {
            font-family: $bold;
            margin-left: 8px;
        }
    }
</style>
