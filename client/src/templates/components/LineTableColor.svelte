<!-- LineTableColor.svelte -->
<script>
    // console.log('Hello Basis from Header.svelte');
    import Status from '../atoms/Status.svelte';
    import Source from '../atoms/Source.svelte';
    import Preview from '../atoms/Preview.svelte';
</script>

<div class="lineTablet">
    <div class="grow1 input">
        <input type="checkbox" id="scales" name="scales">
    </div>
    <div class="grow2">
        <p class="txt_body"> Blue / Blue-500</p>
    </div>
    <div class="grow1">
        <Preview />
    </div>
    <div class="grow1">
        <p class="txt_body">#2345678</p>
    </div>
    <div class="grow2">
        <p class="txt_body">14/06/2021 by sabnjdh</p>
    </div>
    <div class="grow1">
        <Status />
    </div>
    <div class="grow2">
        <Source />
    </div>
</div>

<style lang="scss">
    @import './../utils';

    .lineTablet {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        border-top: 1px solid $greyLight;

        div {
            flex: 1 1;

            p {
                color: $grey;
            }

            &.grow1 {
                flex-grow: 1;
            }
            &.grow2 {
                flex-grow: 2;
            }
            &.input {
                max-width: 30px;
            }
        }
    }
</style>
