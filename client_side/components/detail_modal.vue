<template>
    <div id="detail-modal">
        <p class="introduction">
            Corruption-Meter!
        </p>
        <div class="detail-modal-content" v-if="country_details">
            <div class="country-name">{{ country_details.properties.ADMIN }}</div>
            <div class="main-details">
                <div class="message" :style="'color:'+fill_color(country_details.properties.rank)">{{ modal_message(country_details.properties.rank) }}</div>
                <div class="rank" :style="'color:'+fill_color(country_details.properties.rank)">
                    #{{ country_details.properties.rank }}
                </div>
            </div>
            <div class="graph-details">
                <p>Corruption index change in last 10 years</p>
                <line-chart style="margin: 10px 0px;" height="200px" :years="graph_years" :ranks="graph_ranks"/>
            </div>
            <div class="close-button">
                <button @click="close_modal">Close</button>
            </div>
        </div> 
        <div class="select-country" v-else>
            <p>
                Go on and select a country!
            </p>
        </div>  
    </div>
</template>

<script>
import LineChart from "~/components/LineChart.vue";
import { modal_message, fill_color } from "@/utils/style";

export default {
    props:{
        country_details: {
            default: null,
            type: Object
        },
        position:{
            type: Array
        }
    },

    data(){
        return{

        }
    },

    components:{
        "line-chart": LineChart
    },

    methods:{
        close_modal(){
            this.$emit("close_modal");
        },

        modal_message(rank){
            return modal_message(rank);
        },

        fill_color(rank){
            return fill_color(rank);
        }
    },

    computed:{
        graph_years(){
            let years = [];
            this.country_details.properties.values.forEach(value => {
                years.push(value[1]);
            });
            return years;
        },

        graph_ranks(){
            let ranks = [];
            this.country_details.properties.values.forEach(value => {
                ranks.push(value[0]);
            });
            return ranks;
        },
    },

    watch:{
        "country_details"(){
            console.log("changed");
        }
    }
}
</script>

<style lang="scss" scoped>
div#detail-modal{
    p.introduction{
        font-size: $font3;
        @include flex_center_center();
        height: 10vh;
    }

    box-shadow: 1px 0px 5px rgba(0,0,0,0.1);

    & > div{
        width: 100%;
        height: 95vh;
        background-color: #141414;
        color: white;
    }
    div.select-country{
        p{
            font-size: $font1;
        }
    }

    div.detail-modal-content{
        @include flex_column_start_center();

        & > *{
            width: 80%;

            &.country-name{
                padding: 30px 0px 10px 0px;

                font-size: $font4;
                font-weight: bold;

                border-bottom: 1px solid rgba(255,255,255,0.1);
            }

            &.main-details{
                @include flex_row_between_center();
                padding: 20px 0px;

                div.rank{
                    font-size: $font1;
                    font-weight: bold;
                }

                div.message{
                    font-size: $font5;
                }
            }

            &.graph-details{
                p{
                    font-size: $font7;
                    padding: 10px 0px;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                }
             
            }

            &.close-button{
                @include flex_center_center();
                padding: 10px 0px 20px 0px;

                button{
                    border: none;
                    background-color: #F26D4A;
                    padding: 10px 20px;
                    color: white;
                    font-family: $font_name;

                    border-radius: 10px;
                }
            }
        }
    }
}
</style>
