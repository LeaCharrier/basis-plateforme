<!-- Status.svelte -->
<script>
    // console.log('Hello Basis from Header.svelte');
</script>

<div>
    <div class="is-green tag">
        <p class='txt_caption'>Published</p>
    </div>

    <!-- <div class="is-orange tag">
        <p class='txt_caption'>Updated</p>
    </div> -->
</div>

<style lang="scss">
    @import './../utils';

    .tag {
        padding: 4px;
        border-radius: 4px;
        display: inline-block;

        p {
            font-family: $bold;
        }
    }

    .is-green {
        background: $bgGreen;

        p {
            color: $green;
        }
    }

    .is-orange {
        background: $bgOrange;

        p {
            color: $orange;
        }
    }
</style>
