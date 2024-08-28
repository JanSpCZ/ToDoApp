<template>
    <div>
        <h3 class="my-h3">{{ header }}</h3>
        <form @submit.prevent="onSubmit" class="my-form">
            <div class="input-container">
                <label for="name">Project name:</label>
                <input id="name" v-model="project" class="my-input">
            </div>
            <div class="input-container">
                <label for="description">Project description:</label>
                <textarea id="description" v-model="description" class="my-input my-textarea" rows="5"></textarea>
            </div>
            <div class="btn-container">
                <button class="submit-button">Submit</button>
            </div>
        </form>
    </div>
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
    computed: {
        header() {
            return this.$route.params.id ? "Edit project" : "New project"
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
        }
    }
}

</script>

<style scoped>


</style>