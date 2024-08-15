<template>
    <div class="add-header">
        <h3 class="my-h3">People</h3>
        <div class="plus-btn" @click="onClick">
            <font-awesome-icon :icon="['fas', 'user-plus']" />
        </div>
    </div>
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
        ...mapActions(["fetchPersons"]),
        onClick() {
            this.$router.push("/newperson")
        }
    },
    components: { TPersonsList }
}

</script>

<style scoped>


</style>