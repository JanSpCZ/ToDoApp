<template>
    <div class="project-header">
        <h3 class="myH3">Projects</h3>
        <div class="new-project" @click="goToNewProjectPage">
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
        goToNewProjectPage() {
            this.$router.push("/newproject")
        }
    },
    components: { TProjectsList, TTasksList }
}

</script>

<style scoped>
.project-header {
    max-width: 400px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.new-project {
    cursor: pointer;
    font-size: xx-large;
    padding: 0 .5rem;
    transition: color .2s linear;
}

.new-project:hover {
    color: #00ADB5;
}

</style>