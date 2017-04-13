<template>
    <section id="content">
        <div class="row text-center">
            <div class="col-xs-8 col-xs-offset-2">
                <Event v-for="e in events" :eventob="e" :eventname="e.id" @chooseEvent="handleChooseEvent" />
                <template v-if="this.eventob != null">
                        <Seat :eventob="this.eventob" @chooseSeat="handleChooseSeat" :selectSeats="selectSeats"/>
                </template>
            </div>
        </div>
    </section>
</template>

<script>
    import Event from 'Components/Event.vue'
    import Seat from 'Components/Seat.vue'
    export default {
        props: [
            'status'
        ],
        components: {
            Event,
            Seat
        },
        data() {
            return {
                events: [],
                eventob: null,
                selectSeats: []
            }
        },
        methods: {
            handleChooseEvent(eventob) {
                console.log('ok')
                this.selectedSeat = []
                this.eventob = eventob
                this.$emit('chooseEvent', eventob)
            },
            handleChooseSeat(seat) {
                const seatId = this.selectSeats.map(s => s.id)
                if (seatId.indexOf(seat.id) === -1) {
                    this.selectSeats.push(seat)
                } else {
                    this.selectSeats.splice(seatId.indexOf(seat.id), 1)
                }
                this.$emit('listSeat', this.selectSeats)
            },
            created() {
                this.$http.get('http://localhost:3000/api/events')
                    .then(function(response) {
                        this.events = response.data
                    })
            }
        },
        mounted() {
            this.created()
        }
    }
</script>

<style lang="css">
    #content {
        position: relative;
        margin-top: 80px;
    }
</style>