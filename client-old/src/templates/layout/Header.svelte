<!-- Header.svelte -->
<script>
    // console.log('Hello Basis from Header.svelte');
</script>

<header>
    <div class="entreprise">
        <img src="./assets/media/maze-logo.png" alt="logo entreprise" class="entreprise-img">
        <div>
            <p class="entreprise-name txt_caption">Maze</p>
            <p class="entreprise-plan txt_caption">Entreprise plan</p>
        </div>
    </div>

    <div class="user">
        <div class="user-infos">
            <img src="./assets/media/user-img.png" alt="logo user" class="user-infos-img">
            <p class="user-infos-name txt_body">Sabrina Nedjah</p>
        </div>
        <a class="user-settings">
            <img src="./assets/media/settings.svg" alt="settings" class="item">
        </a>
    </div>
</header>

<style lang="scss">
    @import './../utils';

    header {
        background: $white;
        box-shadow: $shadowheader;
        padding: 16px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .entreprise {
        display: flex;

        &-img {
            width: 32px;
            height: 32px;
            margin-right: 12px;
        }

        &-name {
            font-family: $bold;
            color: $black;
        }

        &-plan {
            color: $grey;
        }
    }

    .user {
        display: flex;
        align-items: center;

        &-infos {
            display: flex;
            align-items: center;

            &-name {
                margin-left: 8px;
            }
        }

        &-settings {
            width: 20px;
            height: 20px;
            margin-left: 10px;

            .item {
                width: 20px;
                height: 20px;
            }
        }
    }


</style>
