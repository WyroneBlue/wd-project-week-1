<script>
    import { onMount } from "svelte";
    export let items;
    export let component;
    const DisplayItem = component;

    let itemsCount;
    let currentItem = 0;

    // $: if (items > 0) {
    //     itemsCount = items.length;
    //     currentItem = Math.round(itemsCount / 2);
    //     scrollToItem();
    //     // console.log(itemsCount);
	// }

    function prevImage() {
        if (currentItem === 0) {
            currentItem = items.length - 1;
        } else {
            currentItem--;
        }

        scrollToItem();
    }

    function nextImage() {
        if (currentItem === items.length - 1) {
            currentItem = 0;
        } else {
            currentItem++;
        }

        scrollToItem();
    }

    function scrollToItem() {
        const carousel = document.querySelector(".carousel");
        const itemWidth = carousel.children[0].offsetWidth;
        carousel.scrollTo({
            left: itemWidth * currentItem,
            behavior: "smooth",
        });
    }

    function handleKeydown(e){
        if (e.key === "ArrowLeft") {
            prevImage();
        } else if (e.key === "ArrowRight") {
            nextImage();
        }
    };

</script>

<svelte:window on:keydown={handleKeydown}/>


    <ul class="carousel">
        {#each items as item, i }
        <DisplayItem item={item} active={ currentItem === i } />
        {/each}
    </ul>

    <menu>
        <button on:click={prevImage}>Prev</button>
        <button on:click={nextImage}>Next</button>
    </menu>

<style lang="scss">
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;

        button {
            height: 50px;
        }
    }

    .carousel {
        display: flex;
        gap: 5px;
        padding: 10px 40px;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
        list-style-type: none;
        transform-style: preserve-3d;
        perspective: 350px;

        &::-webkit-scrollbar {
            display: none;
        }
    }
</style>


