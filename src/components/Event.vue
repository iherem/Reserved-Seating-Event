<template>
    <ul class="list-group" @click="chooseEvent(eventob)">
        <li :class="active()">{{eventname}}
        </li>
    </ul>
</template>

<script>
    export default {
        props: [
            'eventname', 'eventob'
        ],
        data() {
            return {
                
            }
        },
        methods: {
            chooseEvent(eventob) {
                this.$emit('chooseEvent', eventob)
            },
            active(){
                return [
                    'list-group-item'
                ]
            }
        }
    }
</script>

<style lang="css">
    ul.list-group {
        text-align: left;
        cursor: pointer;
    }
    .actives{
        background-color: antiquewhite;
    }
    li.list-group-item {
        border: none;
        border-left: solid 5px #000;
    }
    
    li.list-group-item:hover {
        background-color: antiquewhite;
        transition: .5s;
    }
    
    li.list-group-item:first-child {
        border-top-left-radius: 0px;
        border-top-right-radius: 0px
    }
    
    li.list-group-item:last-child {
        border-bottom-right-radius: 0px;
        border-bottom-left-radius: 0px;
    }
</style>