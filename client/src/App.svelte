<!-- App.svelte -->
<script>
    import { onMount } from 'svelte';
    import { Router, Route } from 'svelte-routing';
    import Accordions from './modules/accordions';
    import Header from './templates/layout/Header.svelte';
    import Aside from './templates/layout/Aside.svelte';
    import TitleandDescription from './templates/components/TitleandDescription.svelte';
    import Navigation from './templates/components/Navigation.svelte';

    export let url = '';

    onMount(() => {
        window.accordions = new Accordions();
        window.accordions.init();
    });

</script>

<Router primary={false} url={url}>
    <main>
        <Header/>
        <div class="container">
            <Aside />
            <div class="content">
               <TitleandDescription />
               <Navigation />
            </div>
        </div>
    </main>
</Router>

<style lang="scss">
    @import './templates/utils';

    main {
        background: $bgGrey;
        min-height: 100vh;

        .container {
            display: flex;

            .content {
                padding: 48px;
                width: calc(100% - 260px);
            }
        }
    }
</style>
