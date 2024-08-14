<template>
    <div class="add-header">
        <h3 class="my-h3">Projects</h3>
        <div class="plus-btn" @click="onClick">
            +
        </div>
    </div>
    <TProjectsList/>
</template>

<script>
import TProjectsList from '@/components/TProjectsList.vue'
import TTasksList from '@/components/TTasksList.vue'

export default {
    name: "ProjectsPage",
    methods: {
        onClick() {
            this.$router.push("/newproject")
        }
    },
    components: { TProjectsList, TTasksList }
}

</script>

<style scoped>

</style>