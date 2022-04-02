<script>
    import { Line } from 'vue-chartjs'

    export default {
        extends: Line,
        props: ['chartdata', 'options'],
        mounted () {
            console.log(this.chartdata);
            this.renderChart(this.chartdata, this.options);
        }
    }
</script>