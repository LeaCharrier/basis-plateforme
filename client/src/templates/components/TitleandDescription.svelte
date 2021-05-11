<!-- TitleAndDescription.svelte -->
<script>
    // console.log('Hello Basis from Header.svelte');
</script>

<div class="block">
    <h1 class="txt_title title">Dashboard</h1>
    <p class="txt_body description">Welcome back, Sabrina! You have <span>1 design token</span> <br> and <span>3 components</span> to check out for today.</p>
</div>

<style lang="scss">
    @import './../utils';

    .block {
        margin-bottom: 40px;

        .title {
            margin-bottom: 8px;
        }

        .description {
            color: $grey;
            line-height: 22px;

            span {
                font-family: $bold;
                color: $black;
            }
        }
    }

</style>
