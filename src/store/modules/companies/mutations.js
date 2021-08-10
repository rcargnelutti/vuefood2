const mutations = {
    SET_COMPANIES (state, companies) {
        state.items = companies
        //console.log(companies)
    },

    SET_COMPANY_SELECTED (state, company) {
        state.companySelected = Object.assign(state.companySelected, company)
    },

    SET_CATEGORIES_COMPANY (state, categories) {
        state.categoriesCompanySelected = categories
    },

    SET_PRODUCTS_COMPANY (state, products) {
        state.companySelected.products = products
    },

    SET_TABLE_COMPANY (state, table) {
        state.companySelected.table = table
    },

    REMOVE_TABLE_COMPANY (state) {
        state.companySelected.table = {
            identify: '',
            description: '',
            name: ''
        }
    },
}

export default mutations
