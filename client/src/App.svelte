<!-- App.svelte -->
<script>
    import { onMount } from 'svelte';
    import { Router, Route } from 'svelte-routing';
    import Accordions from './modules/accordions';
    import Header from './templates/layout/Header.svelte';

    export let url = '';

    onMount(() => {
        window.accordions = new Accordions();
        window.accordions.init();
    });

</script>

<Router primary={false} url={url}>
    <main>
        <Header/>
    </main>
</Router>

<style lang="scss">
    @import './templates/utils';

    main {
        background: color(neutral, grayscale, 300);
        display: flex;
        justify-content: center;
        min-height: 100vh;
    }
</style>