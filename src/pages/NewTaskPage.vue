<template>
    <h3 class="my-h3">New Task</h3>
    <form @submit.prevent="onSubmit" class="my-form">
        <div class="input-container">
            <label for="task-name">Task name:</label>
            <input id="task-name" v-model="task" class="my-input" required>
        </div>
        <div class="input-container select">
            <label for="project-id">Project:</label>
            <select id="project-id" v-model="projectid" required>
                <option value=""></option>
                <option v-for="option in projects" :value="option.id" :key="option.id">{{ option.project }}</option>
            </select>
        </div>
        <div class="input-container select">
            <label for="completed">Completed:</label>
            <select id="completed" v-model="completed" class="my-input" required>
                <option value=""></option>
                <option v-for="option in completedOptions" :value="option.value" class>{{ option.label }}</option>
            </select>
        </div>
        <div class="input-container select">
            <label for="priority">Priority:</label>
            <select id="priority" v-model="priority" class="my-input" required>
                <option value=""></option>
                <option v-for="option in priorityOptions" :value="option.value" class>{{ option.label }}</option>
            </select>
        </div>
        <div class="input-container">
            <label for="date">Date:</label>
            <input id="date" type="date" v-model="date" required>
        </div>
        <div class="btn-container">
            <button class="submit-button">Submit</button>
        </div>
    </form>

</template>

<script>
import { mapActions, mapState } from 'vuex';


export default {
    name: "NewTaskPage",
    data () {
        return {
            task: "",
            projectid: null,
            completed: null,
            completedOptions: [
                { label: "Yes", value: 1},
                { label: "No", value: 0}
            ],
            priority: null,
            priorityOptions: [
                { label: "Low", value: 1},
                { label: "Medium", value: 2},
                { label: "High", value: 3}
            ],
            date: "",
            id: null
        }
    },
    computed: {
        ...mapState(["projects"])
    },
    created () {
        this.fetchProjects()

        if (this.$route.params.id) {
            this.$store.dispatch("fetchTaskToEdit", this.$route.params.id).then(() => {
                this.task = this.$store.state.taskToEdit.task
                this.projectid = this.$store.state.taskToEdit.projectid
                this.completed = this.$store.state.taskToEdit.completed
                this.priority = this.$store.state.taskToEdit.priority
                this.date = this.$store.state.taskToEdit.date
                this.id = this.$route.params.id
            })
        }
    },
    methods: {
        ...mapActions(["fetchProjects"]),
        onSubmit() {
            const body = {
                task: this.task,
                projectid: this.projectid,
                completed: this.completed,
                date: this.date,
                priority: this.priority
            }
            if (this.id) {
                body.id = this.id
            }
            const action = this.id ? "editTask" : "addTask"

            this.$store.dispatch(action, body).then(() => {
                this.$router.push("/tasks")
            })
            console.log(body.id)
        }
    }
}

</script>