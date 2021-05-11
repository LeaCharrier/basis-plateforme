<!-- Table.svelte -->
<script>
    import Dropdown from '../fields/Dropdown.svelte';
    import Search from '../fields/Search.svelte';
    import LineTableColor from '../components/LineTableColor.svelte';
    import BarCheckboxSelect from '../components/BarCheckboxSelect.svelte'
</script>

<div class=table>
    <div class="table-search">
        <Search />
        <Dropdown />
    </div>

    <div class="table-title">
        <div class="grow1 input">
            <input type="checkbox">
        </div>
        <div class="grow2">
            <p class="txt_caption">Token name</p>
        </div>
        <div class="grow1">
            <p class="txt_caption">Preview</p>
        </div>
        <div class="grow1">
            <p class="txt_caption">Value</p>
        </div>
        <div class="grow2">
            <p class="txt_caption">Last update</p>
        </div>
        <div class="grow1">
            <p class="txt_caption">Status</p>
        </div>
        <div class="grow2">
            <p class="txt_caption">Source</p>
        </div>
    </div>

    <div>
        <LineTableColor />
        <LineTableColor />
        <LineTableColor />
    </div>

    <BarCheckboxSelect />
</div>

<style lang="scss">
    @import './../utils';

    .table {
        background: $white;
        border-radius: 8px;
        box-shadow: $shadowheader;

        &-search {
            padding: 16px;
            display: flex;
            justify-content: space-between;
        }

        &-title {
            display: flex;
            align-items: center;
            padding: 8px 16px;
            border-top: 1px solid $greyLight;
            background: $bgGrey;

            div {
                flex: 1 1;

                p {
                    color: $grey;
                    text-transform: uppercase;
                    font-family: $bold;
                    color: $grey2;
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
    }
</style>
