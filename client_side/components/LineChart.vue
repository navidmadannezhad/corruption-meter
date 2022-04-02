<script>
import { Line } from 'vue-chartjs'

export default {
    extends: Line,
    props: ['years', 'ranks'],

    mounted () {
        this.renderChart({
            labels: this.years,
            datasets: [{
                label: 'CPI',
                data: this.ranks,
                backgroundColor: false,
                borderColor: "#00A1B2",
                borderWidth: 1.5
            }]
        }, {
                maintainAspectRatio: false,
                responsive: true,
                plugins:{
                    legend: false
                },
                scales:{
                    yAxes:[
                        {
                            scaleLabel: {
                                display: true,
                                labelString: 'CPI'
                            }
                        }
                    ],
                    xAxes:[
                        {
                            scaleLabel: {
                                display: true,
                                labelString: 'Years'
                            }
                        }
                    ]
                }
            
            });
    }
}
</script>