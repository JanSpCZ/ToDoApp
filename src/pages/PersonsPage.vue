<template>
    <h3 class="myH3">Persons</h3>
    <TPersonsList :persons="persons"/>
</template>

<script>

import { mapState, mapActions } from "vuex"
import TPersonsList from '@/components/TPersonsList.vue'

export default {
    name: "PersonsPage",
    computed: {
        ...mapState(["persons", "errorMsg"])
    },
    created () {
        this.fetchPersons()
    },
    methods: {
        ...mapActions(["fetchPersons"])
    },
    components: { TPersonsList }
}

</script>