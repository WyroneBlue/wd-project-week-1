<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores'
    import Spinner from '$lib/components/Spinner.svelte';

    import { fade } from 'svelte/transition'
    import outin from "$lib/outin.js";
    const [fadeOut, fadeIn] = outin({ transition: fade });

    const slug = $page.params.slug;

    let project = null;
    let pageTitle = null;

    onMount(() => {
        fetchItem();
    });

    const fetchItem = async () => {
        try {
            const res = await fetch(`https://api.github.com/repos/WyroneBlue/${slug}`, {
                method: 'GET',
            });

            const data = await res.json();
            console.log(data);
            setTimeout(async() => {

                project = data;
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    }

    $: if (project) {
        pageTitle = project.name;
    }
</script>


<svelte:head>
    <title>Portfolio | Ymaro Blue | { pageTitle }</title>
</svelte:head>

<main class={ project ? 'show-project' : '' }>
    <section>

        {#if project}
            <section in:fadeIn>
                <a href="/">Go back</a>
                <h1>{ project.name }</h1>
            </section>
        {:else}
            <div in:fadeIn>
                <Spinner />
            </div>
        {/if}
    </section>
</main>

<style lang="scss">
    main{
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        &.show-project{

            section{
                width: auto;
            }
        }
    }

    section{
        width: 100%;
        max-width: 800px;
        padding: 0 1rem;
    }
</style>

