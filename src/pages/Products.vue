<template>
    <div class="row">

      <div class="col-lg-3">

        <h1 class="my-4 title-tenant">
          {{ company.name }} (<a href="#" @click.prevent="removeCompanySelected">x</a>)
        </h1>
        <h2 v-if="company.table.identify">
          Mesa: {{ company.table.name }}
          (<a href="#" @click.prevent="removeTableCompany">x</a>)
        </h2>
        <div class="list-group">
          <a href="#"
            :class="['list-group-item', categoryInFilter('')]"
            @click.prevent="filterByCategory('')"> 
            Todas
          </a>
          <a href="#" 
            v-for="(category, index) in categories.data" :key="index"
            :class="['list-group-item', categoryInFilter(category.identify)]" 
            @click.prevent="filterByCategory(category.identify)">
            {{ category.name }}
          </a>
        </div>

      </div>
      <!-- /.col-lg-3 -->

      <div class="col-lg-9">

        <div class="row my-4">

          <div v-if="company.products.data.lenght === 0">
            Nenhum Produto
          </div>

          <div class="col-lg-4 col-md-6 mb-4" v-for="(product, index) in company.products.data" :key="index">
            <div :class="['card', 'h-100', {'disabled' : productInCart(product)}]">
              <a href="#"><img class="card-img-top" width="100" height="200" :src="product.image" alt=""></a>
              <div class="card-body">
                <h4 class="card-title">
                  <a href="#">{{ product.title }}</a>
                </h4>
                <h5>R$ {{ product.price | formatprice }}</h5>
                <p class="card-text">{{ product.description }}</p>
              </div>
              <div class="card-footer card-footer-custom">
                <!-- <router-link :to="{name: 'cart'}">
                    Adicionar no Carrinho <i class="fas fa-cart-plus"></i>
                </router-link> -->
                <a href="#" @click.prevent="addProdCart(product)">
                  Adicionar no Carrinho <i class="fas fa-cart-plus"></i>
                </a>
              </div>
            </div>
          </div>

        </div>
        <!-- /.row -->

      </div>
      <!-- /.col-lg-9 -->

    </div>
    <!-- /.row -->
</template>

<script>

import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  props: ['companyFlag'],

  created() {
    // console.log(this.companyFlag)
    if (this.company.name === '') {
      return this.$router.push({name: 'home'})
    }

    this.getCategoriesByCompany(this.company.id)
      .catch(() => {this.$vToastify.error('Falha ao carregar as categorias.', 'Erro');})

    //this.getProductsByCompany(this.company.id)
      //.catch(() => {this.$vToastify.error('Falha ao carregar os produtos.', 'Erro');})
    this.loadProducts()

      //console.log(this.company.products);
  },

  computed: {
    ...mapState({
      company: state => state.companies.companySelected,
      categories: state => state.companies.categoriesCompanySelected,
      productsCart: state => state.cart.products
    })
  },

  data() {
    return {
      filters: {
        category: '',
      },
    }
  },

  methods: {
    ...mapActions([
      'getCategoriesByCompany',
      'getProductsByCompany',
    ]),

    ...mapMutations({
      addProdCart: 'ADD_PRODUCT_CART',
      removeTableCompany: 'REMOVE_TABLE_COMPANY',
      removeCompany: 'REMOVE_COMPANY_SELECTED',
    }),

    loadProducts () {

      const params = {
        token_company: this.company.id,
      }

      if (this.filters.category) {
        params.categories = [
          this.filters.category  
        ]
      }

      this.getProductsByCompany(params)
          .catch(() => {this.$vToastify.error('Falha ao carregar os produtos.', 'Erro');})
    },

    filterByCategory(identify) {
      this.filters.category = identify

      this.loadProducts()
    },

    categoryInFilter(identify){
      return identify === this.filters.category ? 'active' : ''
    },

    productInCart(product){
      let inCart = false

      this.productsCart.map((prodCart) => {
        if (prodCart.identify === product.identify)
          inCart = true
      })

      return inCart
    },

    removeCompanySelected () {
      this.removeCompany()

      this.$router.push({name: 'home'})
    },
  },
}
</script>