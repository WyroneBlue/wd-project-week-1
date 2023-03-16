<script>

    export let item;
    export let active = false;
</script>

<li class={active ? 'active' : ''}>
    <a href={`/project/${item.name}`}>
        <h1>{item.name}</h1>
        <div>{item.description ?? 'n/a'}</div>
    </a>
</li>


<style lang="scss">
    li{
        flex: 1 0 clamp(300px, calc(100vw / 2), 500px);
        background-color: rgb(0 0 0 / .8);
        padding: 5px 10px;
        color: white;
        transition: transform .3s ease-out;

        a{
            appearance: none;
            color: white;
            text-decoration: none;
        }

        &.active{
            transform: scale(1.1);
            z-index: 1;
        }

        &:not(.active){
            transform: scale(.9) translateZ(-378px) rotateX(45deg);
        }
    }
</style>