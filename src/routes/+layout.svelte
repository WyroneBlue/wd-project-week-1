
<!-- <Nav /> -->
<!-- <h1>Svelte's space</h1> -->
<slot />

<svelte:head>
    <title>Portfolio | Ymaro Blue</title>
</svelte:head>

<style lang="scss" global>
    @import 'src/sass/main';

    :global(body) {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        position: absolute;
        inset: 0;
        background-color: teal;

        font-family: 'Roboto', sans-serif;
    }
</style>