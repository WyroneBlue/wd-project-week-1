
<span></span>

<style lang="scss">

span{
    display: block;
    width: 50px;
    height: 50px;
    margin-inline: auto;
    // background-color: darkgray;
    border-radius: 50%;
    border: 4px dashed black;
    animation: spinner 2s ease-in-out -.6s infinite;
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