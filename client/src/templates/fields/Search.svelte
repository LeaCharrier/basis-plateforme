<!-- Search.svelte -->
<script>
    // console.log('Hello Basis from Header.svelte');
</script>
    <div class="searchBar">
        <form class="searchBar-form">
            <button class="searchBar-button" type="submit" />
            <input type="search" placeholder="Search color design token" class="searchBar-input" />
        </form>
    </div>

<style lang="scss">
    @import './../utils';

    .searchBar {

        &-form {
            display: flex;
            align-items: center;
            background: $bgGrey2;
            border-radius: 8px;
            width: 620px;
        }

        &-button {
            position: relative;
            width: 40px;
            height: 40px;
            border-radius: 6px 0;
            border: none;

            &:after {
                content: '';
                position: absolute;
                width: 25px;
                height: 25px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-image: url('./assets/media/search.svg');
                background-repeat: no-repeat;
                background-size: cover;
            }
        }

        &-input {
            width: 100%;
            border: none;
            padding: 13px;
            border-radius: 0 6px;
            font-size: 12px;
            color: $black;
            background: $bgGrey2;
            border-radius: 6px;

            &::placeholder {
                color: $grey;
            }
        }
    }
</style>
