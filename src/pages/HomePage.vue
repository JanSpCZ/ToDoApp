<template>
    <h2 class="myH2">WELCOME</h2>
</template>

<script>

import { mapState, mapActions } from "vuex"

export default {
    name: "HomePage",
    computed: {
        ...mapState(["projects", "errorMsg"])
    },
    created () {
        this.fetchProjects()
    },
    methods: {
        ...mapActions(["fetchProjects"]),
    }
}
</script>

<style scoped>

</style>