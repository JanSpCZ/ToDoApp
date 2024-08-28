<template>
    <div>
        <h2 class="my-h2">WELCOME</h2>
    </div>
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