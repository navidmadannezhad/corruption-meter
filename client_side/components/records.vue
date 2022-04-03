<template>
    <div class="records">
        <div class="highest-cpi">
            <p>
                Highest CPI Countries
            </p>
            <div class="country" v-for="country in countries" :key="country.properties.ADMIN">
                1
            </div>
        </div>
        <div class="lowest-cpi">
            <p>
                Lowest CPI Countries
            </p>
        </div>
    </div>
</template>

<script>
export default{
    props:[
        "countries"
    ],

    computed:{
        high_cpi_countries(){
            let countries = this.countries;

            countries.forEach(country => {
                countries.forEach(next_country => {
                    if(country.properties.rank > next_country.properties.rank){
                        [countries[countries.indexOf(country)], countries[countries.indexOf(next_country)]] = [countries[countries.indexOf(next_country)], countries[countries.indexOf(country)]];
                    }
                })
            })
            console.log(countries);
            return "";
        },
        
        low_cpi_countries(){
            return "";
        }
    },

    mounted(){
        
    }
}
</script>

<style>
    div.records{
        color: white;
    }
</style>