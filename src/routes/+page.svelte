<script>
    import { fade } from 'svelte/transition'
    import Projects from '$lib/components/Projects.svelte';
    import outin from "$lib/outin.js";
    const [fadeOut, fadeIn] = outin({ transition: fade });

    let showProjectsCards = true;
    function showProjects(){
        showProjectsCards = true;
    }

</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<main class={ showProjectsCards ? 'show-projects' : '' }>

    <section>

        {#if showProjectsCards}

            <div in:fadeIn out:fadeOut>
                <Projects />
            </div>

        {:else}

            <div in:fadeIn>

                <h1>Welcome</h1>
                <button on:click={showProjects}>
                    Let's get started
                </button>
            </div>
        {/if}
    </section>
</main>

<style lang="scss">

    main{
        position: absolute;
        inset: 0;
        // inset-inline: 5px;
        // inset-block: 0;
        display: grid;
        place-content: center;
        overflow: hidden;
        // max-width: 500px;

        &.show-projects{

            section{
                width: 100vw;
                align-items: unset;
            }
        }

        section{
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            // background-color: red;

            div{
                display: block;
                width: 100%;
            }

            button {
                padding: 10px 20px;
                width: 200px;
            }
        }
    }
</style>