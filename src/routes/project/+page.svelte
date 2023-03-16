<script>
    import Projects from '$lib/components/Projects.svelte';
    import PageTransition from '$lib/components/PageTransition.svelte';
</script>

<svelte:head>
    <title>About</title>
</svelte:head>

<PageTransition>

    <section>

        <Projects />
    </section>
</PageTransition>

<style lang="scss">
    :global(){
        @import 'src/sass/animations';
    }
    section{
        display: flex;
        width: 100%;
        // background-color: red;
    }
</style>