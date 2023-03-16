<script>

    export let item;
    export let active = false;
</script>

<li class={active ? 'active' : ''}>
    <h1>{item.name}</h1>
    <div>{item.description ?? 'n/a'}</div>
</li>


<style lang="scss">
    li{
        flex: 1 0 calc(100vw / 3);
        background-color: rgb(0 0 0 / .8);
        padding: 5px 10px;
        color: white;
        transition: transform .3s ease-out;

        &.active{
            transform: scale(1.1);
        }

        &:not(.active){
            transform: scale(.9) translateZ(-378px) rotateX(45deg);
        }
    }
</style>