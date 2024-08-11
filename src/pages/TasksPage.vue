<template>
    <h3 class="myH3">Tasks</h3>
    <TTasksList projectId="All" />
</template>

<script>
import { mapState, mapActions } from "vuex"
import TTasksList from '@/components/TTasksList.vue'

export default {
    name: "TasksPage",
    computed: {
        ...mapState(["tasks", "errorMsg"])
    },
    methods: {
        ...mapActions(["fetchTasks"]),
    },
    components: { TTasksList }
}

</script>

<style scoped>
div {
    
}
</style>