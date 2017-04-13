<template>
    <nav id="navbar" class="nav-bar">
        <ul class="nav">
            <div class="col-xs-6 col-xs-offset-3">
                <li class="active">
                    <h3>{{title}}</h3>
                </li>
            </div>
            <div class="col-xs-3">
                <li class="cart">
                    <button @click="clickHandle" v-if="selectedSeat.length != 0" class="btn btn-sm btn-warning animated infinite pulse"><i class="fa fa-ticket" aria-hidden="true"></i> ฿{{status.price}}</button>
                </li>
            </div>
        </ul>
    </nav>
</template>

<script>
    import Cart from 'Components/Cart.vue'
    import swal from 'sweetalert2'
    import Vue from 'vue'
    export default {
        components: {
            Cart
        },
        props: [
            'selectedSeat', 'status', 'eventob'
        ],
        data() {
            return {
                title: 'Reserved Seating Event',
                name: ''
            }
        },
        methods: {
            clickHandle() {
                let price = this.status.price
                let eventobid = this.eventob._id
                let selectedSeat = this.selectedSeat
                swal({
                    title: 'Enter Your Name',
                    input: 'text',
                    showCancelButton: true,
                    inputValidator: function(value) {
                        return new Promise(function(resolve, reject) {
                            if (value) {
                                resolve()
                            } else {
                                reject('You need to write your name!')
                            }
                        })
                    }
                }).then(function(result) {
                    name = result
                    swal({
                        html: '<div class="row"><div class="col-xs-6"><strong>Total</strong></div><div class="col-xs-6"><strong>' + price + '</strong> Bath</div></div>',
                        confirmButtonText: 'Confirm'
                    }).then(function(result) {
                        swal(
                            'Thank you!',
                            'Your seat has been submited.',
                            'success'
                        )
                        const seatId = selectedSeat.map(s => s.id)
                        for (const s in seatId) {
                            console.log(eventobid)
                            Vue.http.get('http://localhost:3000/api/event/'+eventobid+"/"+seatId[s]+"/"+name)
                                .then(function(response) {
                                    console.log(response.data)
                                })
                        }
                        
                    })
    
                })
            }
    
        }
    }
</script>

<style lang="css">
    @import '../../node_modules/sweetalert2/dist/sweetalert2.min.css';
    .cart {}
    
    nav {
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 99;
        background-color: rgba(255, 255, 255, .98);
        box-shadow: 0 0 4px rgba(0, 0, 0, .2);
        -webkit-box-shadow: 0 0 4px rgba(0, 0, 0, .2);
        -moz-box-shadow: 0 0 4px rgba(0, 0, 0, .2);
        -ms-box-shadow: 0 0 4px rgba(0, 0, 0, .2);
        -o-box-shadow: 0 0 4px rgba(0, 0, 0, .2);
    }
    
    nav .nav {
        padding: 0;
        text-align: center;
    }
    
    nav .nav li {
        display: inline-block!important;
    }
    
    nav .nav .active h3 {
        color: #f6682f!important;
        font-style: bold;
    }
    
    nav .nav li h3 {
        color: #343434!important;
        display: block;
        padding: 22px 15px!important;
        position: relative;
        margin-top: 0;
        margin-bottom: 0;
    }
    
    nav .nav li button {
        display: block;
        margin: 22px 15px!important;
        position: relative;
        margin-top: 0;
        margin-bottom: 0;
    }
    
    nav .nav li h3:hover {
        color: #f33;
        background-color: transparent!important;
    }
</style>