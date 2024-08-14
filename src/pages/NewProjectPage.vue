<template>
    <h3 class="my-h3">New Project</h3>
    <form @submit.prevent="onSubmit" class="my-form">
        <div class="input-container">
            <label for="name">Project name:</label>
            <input id="name" v-model="project" class="my-input">
        </div>
        <div class="input-container">
            <label for="description">Project description:</label>
            <input id="description" v-model="description" class="my-input">
        </div>
        <div class="btn-container">
            <button class="submit-button">Add new project</button>
        </div>
    </form>
</template>

<script>


export default {
    name: "NewProjectPage",
    data () {
        return {
            project: "",
            description: ""
        }
    },
    methods: {
        onSubmit() {
            this.$store.dispatch("addProject", {
                project: this.project,
                description: this.description
            }).then(() => {
                this.$router.push("/projects")
            })
        }
    }
}

</script>

<style scoped>


</style>