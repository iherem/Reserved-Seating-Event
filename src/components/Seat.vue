<template>
    <div class="col-xs-8 col-xs-offset-2">
        <h5>Choose Seat</h5>
        <div class="well">Front</div>
        <template v-for="(index, s) in seats">
                <button :class="className(index)" :disabled="index.isconfirm" @click="chooseSeat(index)">{{index.id}}</button>
                <template v-if="modNumber(s+1)">
                    <br/><br/>
                </template>
        </template>
        <div class="well">Back</div>
    </div>
</template>

<script>
    export default {
        props: [
            'eventob','selectSeats'
        ],
        data() {
            return {
                seatsz: []
            }
        },
        methods: {
            modNumber(index) {
                return index % 6 == 0
            },
            className(seat) {
                const seatId = this.selectSeats.map(s => s.id)

                return [
                    'btn', 'btn-sm', 'btn-default',
                    { 
                        'btn-danger': seat.isconfirm,
                        'btn-success': seatId.indexOf(seat.id) != -1
                    }
                ]
            },
            chooseSeat(seat){
                this.$emit('chooseSeat', seat)
            }
        },
        computed: {
            seats() {
                this.$http.get('http://localhost:3000/api/event/'+this.eventob._id)
                .then(function(response){
                    this.seatsz = response.data.seat
                })
                return this.seatsz
            }
        }
    }
</script>



