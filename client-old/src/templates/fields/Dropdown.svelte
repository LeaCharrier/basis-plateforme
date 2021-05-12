<!-- Dropdown.svelte -->
<script>
    // console.log('Hello Basis from Header.svelte');
</script>

<div class="dropdown">
    <p class="title txt_body">Color mode : </p>

    <div class="select" tabindex="1">
        <input class="selectopt" name="test" type="radio" id="HEXA" checked>
        <label for="HEXA" class="option txt_body">HEXA</label>
        <input class="selectopt" name="test" type="radio" id="RGB">
        <label for="RGB" class="option txt_body">RGB</label>
    </div>
</div>

<style lang="scss">
    @import './../utils';

    .dropdown {
        display:flex;
        align-items: center;

        .title {
            font-family: $bold;
            color: $grey2;
            margin-right: 10px;
        }

        .select {
            display:flex;
            flex-direction: column;
            position: relative;
            // width: auto;
            // width:250px;
            // height:40px;
            border: 1px solid $bgGrey;
            box-shadow: $shadowheader;
        }

        .option {
            padding: 5px 24px 5px 10px;
            height: 40px;
            display:flex;
            align-items:center;
            background: $white;
            position:absolute;
            top:0;
            width: 100%;
            pointer-events:none;
            order:2;
            z-index:1;
            // transition:background .4s ease-in-out;
            box-sizing:border-box;
            overflow:hidden;
            white-space:nowrap;
        }

        .option:hover {
            // background: $greyLight;
        }

        .select:focus .option {
            position:relative;
            pointer-events:all;
        }

        input {
            opacity:0;
            position:absolute;
            left: -99999px;
        }

        input:checked + label {
            order: 1;
            z-index:2;
            background:$white;
            border-top:none;
            position:relative;
            font-family: $bold;
        }

        input:checked + label:after {
        content:'';
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 5px solid white;
            position:absolute;
            right: 10px;
            top:calc(50% - 2.5px);
            pointer-events:none;
            z-index:3;
        }

        input:checked + label:before {
            position:absolute;
            right: 4px;
            height: 20px;
            width: 20px;
            z-index: 10;
            content: '';
            background-image: url('./assets/media/keyboard_arrow_down.svg');
            background-size: cover;
        }
    }

</style>
