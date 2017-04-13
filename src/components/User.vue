<template>
    <div class="user-box">
        <form v-on:submit.prevent="onSubmit">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" v-model="name" class="form-control" id="name" placeholder="Enter Name">
            </div>
            <div class="text-center">
                <input type="submit" class="btn btn-success" value="Submit">
            </div>
        </form>
    </div>
</template>
<script>
    export default {
        methods:{
            onSubmit(){
                let payload = {name: this.name}
                //console.log(payload.name)
                this.$emit('username', payload.name)
            }
        }
    }
</script>