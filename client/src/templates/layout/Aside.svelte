<!-- Aside.svelte -->
<script>
    // console.log('Hello Basis from Header.svelte');
</script>

<aside>
    <h2 class="design-title txt_body">Ariane Design System</h2>
    <p class="design-subtitle txt_note">maze/design-system</p>

    <div class="groupes">
        <h3 class="groupes-title txt_caption">Overview</h3>
        <div class="groupes-items">
            <p class="item txt_body icon-dash is-active">Dashboard</p>
            <p class="item icon-issue txt_body">Issues</p>
        </div>

        <h3 class="groupes-title txt_caption">Design tokens</h3>
        <div class="groupes-items">
            <p class="item txt_body icon-color">Color</p>
            <p class="item icon-spacing txt_body">Spacings</p>
            <p class="item icon-shadow txt_body">Shadows</p>
        </div>
    </div>
</aside>

<style lang="scss">
    @import './../utils';

    aside {
        background: $bgBlack;
        width: 260px;
        padding: 24px;
        height: 100%;
        min-height: calc(100vh - 64px);

        .design {
            &-title {
                color: $white;
                font-family: $bold;
                margin-bottom: 5px;
            }

            &-subtitle {
                color: $grey2;
                text-decoration: underline;
            }
        }

        .groupes {
            &-title {
                color: $grey2;
                text-transform: uppercase;
                font-family: $bold;
                margin-bottom: 8px;
                margin-top: 32px;
            }

            &-items {
                .item {
                    color: $white;
                    font-family: $bold;
                    padding: 8px;
                    position: relative;
                    padding-left: 40px;
                    margin-bottom: 5px;

                    &:before {
                        content: "";
                        position: absolute;
                        background-image: url('./assets/media/picto-aside/dashboard.png');
                        background-size: contain;
                        width: 24px;
                        height: 24px;
                        left: 8px;
                        top: 5px;
                    }

                    &.is-active {
                        background: rgba(39, 39, 41, 1);
                        border-radius: 8px;
                    }

                    &.icon-issue {
                        &:before {
                            background-image: url('./assets/media/picto-aside/bug_report.png');
                        }
                    }

                    &.icon-color {
                        &:before {
                            background-image: url('./assets/media/picto-aside/color.png');
                        }
                    }

                    &.icon-spacing {
                        &:before {
                            background-image: url('./assets/media/picto-aside/spacings.png');
                        }
                    }

                    &.icon-shadow {
                        &:before {
                            background-image: url('./assets/media/picto-aside/shadow.png');
                        }
                    }
                }
            }
        }
    }

</style>
