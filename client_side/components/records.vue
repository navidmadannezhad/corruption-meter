<template>
    <div class="records">
        <div class="highest-cpi">
            <p>
                Highest CPI Countries
            </p>
            <div class="country" v-for="country in high_cpi_countries" :key="country.name">
                <img :src="country.flag" alt="">
                <a :href="country.link" target="_blank">{{ country.name }}</a>
                <span>#{{ country.rank }}</span>
            </div>
        </div>
        <div class="lowest-cpi">
            <p>
                Lowest CPI Countries
            </p>
            <div class="country" v-for="country in low_cpi_countries" :key="country.name">
                <img :src="country.flag" alt="">
                <a :href="country.link" target="_blank">{{ country.name }}</a>
                <span>#{{ country.rank }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { fill_color } from "~/utils/style.js";

export default{
    props:[
        "countries"
    ],

    methods:{
        fill_color(rank){
            return fill_color(rank);
        }
    },

    computed:{
        high_cpi_countries(){
            return this.countries.slice(0, 10);
        },
        
        low_cpi_countries(){
            return this.countries.slice(this.countries.length - 10, this.countries.length).reverse();
        }
    },

    mounted(){
        
    }
}
</script>

<style lang="scss" scoped>
    div.records{
        color: white;
        width: 80%;
        @include flex_row_between_start();

        position: absolute;
        bottom: 60px;

        div.country{
            margin: 10px 0px;
            @include flex_row_start_center();
            font-size: $font6;

            & > *{
                padding: 0px 3px;
            }

            a{
                text-decoration: none;
                color: white;
                transition: all 0.25s;

                &:hover{
                    color: rgb(218, 218, 218);
                }
            }
        }
    }
</style>