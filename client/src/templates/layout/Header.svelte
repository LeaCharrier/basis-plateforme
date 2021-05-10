<!-- Header.svelte -->
<script>
    console.log('Hello Basis from Header.svelte');
</script>

<header>
    <div>
        <p>Hello Basis</p>
    </div>
</header>

<style lang="scss">
    @import './../utils';

    p {
        color: color(status, error);
    }

</style>
