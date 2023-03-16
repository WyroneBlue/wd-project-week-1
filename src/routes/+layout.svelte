
<!-- <Nav /> -->
<!-- <h1>Svelte's space</h1> -->
<slot />

<style lang="scss" global>
    @import 'src/sass/main';

    :global(body) {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        position: absolute;
        inset: 0;
    }
</style>