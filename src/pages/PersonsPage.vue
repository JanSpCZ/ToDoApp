<template>
    <div>
        <div class="add-person-header">
            <h3 class="my-h3">People</h3>
            <div class="plus-btn" @click="onClick">
                <font-awesome-icon :icon="['fas', 'user-plus']" />
            </div>
        </div>
        <TPersonsList :persons="persons"/>
    </div>
</template>

<script>

import { mapState, mapActions } from "vuex"
import TPersonsList from '@/components/TPersonsList.vue'

export default {
    name: "PersonsPage",
    computed: {
        ...mapState(["persons"])
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
.add-person-header {
  max-width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
}

</style>