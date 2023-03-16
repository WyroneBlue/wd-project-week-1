<script>
// import { env } from "$lib/env";
import { onMount } from "svelte";
import ProjectCard from "./ProjectCard.svelte";
import Carousel from "./Carousel.svelte";

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
    <span in:fadeIn></span>
{/if}

<style lang="scss">

span{
    display: block;
    width: 50px;
    height: 50px;
    margin-inline: auto;
    background-color: darkgray;
    border-radius: 50%;
    border: 2px dashed black;
    animation: spinner 2s ease-in-out infinite;
}

@keyframes spinner{
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
}
</style>