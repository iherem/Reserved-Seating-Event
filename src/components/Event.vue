<template>
        <ul class="list-group" @click="chooseEvent(eventob)">
            <li class="list-group-item">{{eventname}}
            </li>
        </ul>
</template>

<script>
    export default {
        props: [
            'eventname','eventob'
        ],
        data() {
            return {
                
            }
        },
        methods: {
            chooseEvent(eventob) {
                this.$emit('chooseEvent', eventob)
            }
        }
    }
</script>

<style lang="css">
    ul.list-group {
        text-align: left;
        cursor: pointer;
    }
    
    li.list-group-item {
        border: none;
        border-left: solid 5px #000;
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