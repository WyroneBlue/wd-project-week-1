<script>
// import { env } from "$lib/env";
import { onMount } from "svelte";
import ProjectCard from "./ProjectCard.svelte";
import Carousel from "./Carousel.svelte";
import Spinner from "./Spinner.svelte";

import outin from "$lib/outin.js";
import { fade } from 'svelte/transition'

const [fadeOut, fadeIn] = outin({ transition: fade });

let projects = [];
const fetchItems = async () => {
    try {
        const res = await fetch('https://api.github.com/users/WyroneBlue/repos', {
            method: 'GET',
        });

        setTimeout(async() => {
            projects = await res.json();
        }, 1000);
    } catch (error) {
        console.log(error);
    }
}

onMount(() => {
    fetchItems();
});
</script>


{#if projects && projects.length > 0}
    <section in:fadeIn out:fadeOut>
        <Carousel items={projects} component={ProjectCard}/>
    </section>
{:else}
    <div in:fadeIn>
        <Spinner />
    </div>
{/if}
