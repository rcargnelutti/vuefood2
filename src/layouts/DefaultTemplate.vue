<template>
    <div>

        <preloader-component />

        <header-component />
        
        <div class="contanier container-body">
            <router-view></router-view>
        </div>

        <footer-component />
    </div>
</template>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import HeaderComponent from './_partials/header.vue'
import FooterComponent from './_partials/footer.vue'

export default {
    components: {
        HeaderComponent,
        FooterComponent
    }
    
}
</script>

<style scoped>
    @import url('../assets/css/reset.css');
    @import url('../assets/css/vuefood.css');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
</style>