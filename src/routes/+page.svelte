<script>
    import { onMount } from "svelte";
    import Projects from '$lib/components/Projects.svelte';
    import { fade } from 'svelte/transition'
    import outin from "$lib/outin.js";
    const [fadeOut, fadeIn] = outin({ transition: fade });

    let showProjectsCards = false;
    let loaded = false;

    onMount(() => {

        if(sessionStorage.getItem('showProjectsCards')){
            showProjectsCards = true;
        }

        loaded = true;
    });

    function showProjects(){
        showProjectsCards = true;

        sessionStorage.setItem('showProjectsCards', true);
    }

</script>

<main class={ showProjectsCards ? 'show-projects' : '' }>

    <section class={ loaded ? '' : 'hide'}>

        {#if showProjectsCards}

            <div in:fadeIn out:fadeOut>
                <Projects />
            </div>

        {:else}

            <div in:fadeIn>

                <h1>Welcome!</h1>
                <p>
                    I'm a software developer with a passion for creating
                    beautiful and functional web applications.
                </p>
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
            transition: opacity .3s ease-out;

            &.hide{
                opacity: 0;
                pointer-events: none;
            }

            div{
                display: block;
                width: 100%;
            }

            h1{
                color: white;
                font-size: 2.5rem;
            }

            p{
                font-size: 1.3rem;
                max-width: 400px;
            }

            button {
                padding: 10px 20px;
                width: 200px;
                font-size: 1rem;
                font-weight: 700;
                border-radius: 20px;
            }
        }
    }
</style>