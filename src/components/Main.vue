<template>
    <div id="main">
        <NavHead :selectedSeat="selectedSeat" :status="status" :eventob="eventob"/>
        <Contents @listSeat="handleListSeat" @chooseEvent="handleChooseEvent" :status="status"/>
    </div>
</template>

<script>
    import NavHead from 'Components/NavHead.vue'
    import Contents from 'Components/Contents.vue'
    export default {
        components: {
            NavHead,
            Contents
        },
        data() {
            return {
                selectedSeat: [],
                status: {
                    count:0,
                    price:0
                },
                eventob: null
            }
        },
        methods: {
            handleListSeat(selectSeats){
                this.selectedSeat = selectSeats
                this.status = this.selectedSeat.reduce((summary, s) => {
                    summary.count++
                    summary.price += s.price
                    return summary
                }, { count: 0, price: 0 })
            },
            handleChooseEvent(eventob){
                this.selectedSeat = []
                this.eventob = eventob
            }
        }
    }
</script>

<style lang="css">
    body,
    html,
    ol,
    ul {
        margin: 0;
        padding: 0;
        font-family: 'Kanit', sans-serif;
        color: #5f5f5f;
        
    }
    body{
        background-color: #f7f7f7;
    }
</style>