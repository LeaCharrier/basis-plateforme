<!-- Navigation.svelte -->
<script>
    // console.log('Hello Basis from Header.svelte');
</script>

<div class="tabs">
    <div class="tabs-item is-active">
        <p class="txt_body">Global</p>
    </div>
    <div class="tabs-item">
        <p class="txt_body">Design</p>
    </div>
</div>

<style lang="scss">
    @import './../utils';

    .tabs {
        display: flex;
        width: 100%;
        border-bottom: 1px solid $greyLight;

        &-item {
            padding: 12px 16px;
            position: relative;

            p {
                font-family: $bold;
                color: $grey2;
            }

            &.is-active {
                &:before {
                    content: '';
                    position: absolute;
                    bottom: -1px;
                    left: 0;
                    right: 0;
                    width: 100%;
                    background: $black;
                    height: 1px;
                }

                p {
                    color: $black;
                }
            }
        }
    }
</style>
