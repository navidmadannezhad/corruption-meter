<template>
    <div id="detail-modal">
        <div class="tool-tip-arrow"></div>

        <div class="detail-modal-content">
            <div class="country-name">{{ country_details.properties.ADMIN }}</div>
            <div class="main-details">
                <div class="message">Country is Corrupt!</div>
                <div class="rank">
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
     
    </div>
</template>

<script>
import LineChart from "~/components/LineChart.vue";

export default {

    props:{
        country_details: {
            default: null,
            type: Object
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

    div.detail-modal-content{
        position: absolute;
        color: white;

        width: 400px;
        border-radius: 35px;
        background-color: #2c2e2e;

        z-index: 9999;
        left: 50%;
        top: 200px;

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
