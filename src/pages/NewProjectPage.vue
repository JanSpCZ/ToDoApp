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
            <button class="submit-button">Submit</button>
        </div>
    </form>
</template>

<script>


export default {
    name: "NewProjectPage",
    data () {
        return {
            project: "",
            description: "",
            id: null
        }
    },
    created () {
        if (this.$route.params.id) {
            this.$store.dispatch("fetchProjectToEdit", this.$route.params.id).then(() => {
                this.project = this.$store.state.projectToEdit.project
                this.description = this.$store.state.projectToEdit.description
                this.id = this.$route.params.id
            })
        }
    },
    methods: {
        onSubmit() {
            const body = {
                project: this.project,
                description: this.description
            }
            if(this.id) {
                body.id = this.id
            }
            const action = this.id ? "editProject" : "addProject"
            this.$store.dispatch(action, body).then(() => {
                this.$router.push("/projects")
            })
            console.log(body)
        }
    }
}

</script>

<style scoped>


</style>