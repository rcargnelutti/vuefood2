<template>
    <header>
        <!-- Navigation -->
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-vuefood">
            <div class="container">
                <router-link :to="{name: 'home'}" class="navbar-brand">
                    <img src="@/assets/imgs/logo-vuefood.png" alt="VueFood" class="logo">
                </router-link>
                <div>
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item active">
                            <router-link :to="{name: 'cart'}" class="nav-link">
                                <i class="fas fa-shopping-cart"></i> ({{ productsCart.length }})
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{name: 'my.orders'}" v-if="me.name" class="nav-link">
                                 <i class="fas fa-user"></i> {{ me.name }}
                            </router-link>
                            <router-link v-else :to="{name: 'login'}" class="nav-link">
                                Entrar
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <a href="#" v-if="me.name" class="nav-link ">
                                <span class="fas fa-sign-out-alt" @click.prevent="logout"> Sair </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import {mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState({
            productsCart: state => state.cart.products,
            me: state => state.auth.me
        })
    },

    methods: {
        ...mapActions([
            'logout'
        ])
    }
}
</script>