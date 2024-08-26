<template>
    <div class="add-header">
        <h3 class="my-h3">Tasks</h3>
        <div class="plus-btn" @click="onClick">
            <font-awesome-icon :icon="['fas', 'plus']" />
        </div>
    </div>    
    <TTasksList projectId="All" />
</template>

<script>
import { mapState, mapActions } from "vuex"
import TTasksList from '@/components/TTasksList.vue'

export default {
    name: "TasksPage",
    computed: {
        ...mapState(["tasks"])
    },
    methods: {
        ...mapActions(["fetchTasks"]),
        onClick() {
            this.$router.push("/newtask")
        }
    },
    components: { TTasksList }
}

</script>

<style scoped>
.add-header {
    margin-bottom: 3rem;
}
</style>