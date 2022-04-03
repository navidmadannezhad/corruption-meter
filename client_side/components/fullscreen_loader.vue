<template>
    <div class="fullscreen-loader">
        <div class="introduction">
            <p>
                Corruption-Meter!
            </p>
            <PacmanLoader :color="spinner_color" />
        </div>
    </div>
</template>

<script>
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'

export default{
    components: {
        PacmanLoader
    },
    data(){
        return{
            spinner_color: "#009dad"
        }
    }
}
</script>


<style lang="scss" scoped>
    div.fullscreen-loader{
        position: absolute;
        top: 0;
        left: 0;

        width: 100vw;
        height: 100vh;

        z-index: 99999999;

        background-color: #0e0e0e;
        @include flex_center_center();

        div.introduction{
            @include flex_column_start_center();

            p{
                font-size: $font2;
                color: white;
                text-align: center;

                letter-spacing: 8px;
                padding: 10px 0px;
                margin: 50px;

                border-bottom: 1px solid rgba(255,255,255,0.1);
                border-top: 1px solid rgba(255,255,255,0.1);
            }
        }
    }
</style>