<template>
    <div id="app" class="maindiv">
        <img alt="Vue logo" src="./assets/logo.png"/>
        <div class="container">
            <textreader></textreader><br>   
            <a href="http://127.0.0.1:8080/readnstore/swagger-ui.html#/"><b>Go to swagger</b></a> 
        </div>
    </div>
</template>

<script>
    import textreader from '@/components/VueCsvImport.vue';
    export default {
        name: "app",
        data() {
            return {
                text: ""
            };
        },
        components: {
            textreader,
        }
    };
</script>

<style scoped>
    .container {
        text-align: left;
        padding-top: 110px;
    }
    .upload{
        color: cornflowerblue;
    }
    .maindiv{
        padding: 35px;
    }
</style>