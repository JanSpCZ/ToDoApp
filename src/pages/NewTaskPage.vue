<template>
    <div>
        <h3 class="my-h3">{{ header }}</h3>
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
                    <option v-for="option in completedOptions" :key="option.completed" :value="option.value" class>{{ option.label }}</option>
                </select>
            </div>
            <div class="input-container select">
                <label for="priority">Priority:</label>
                <select id="priority" v-model="priority" class="my-input" required>
                    <option value=""></option>
                    <option v-for="option in priorityOptions" :key="option.priority" :value="option.value" class>{{ option.label }}</option>
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

        <div v-if="isEdit">
            <h4>Assigned people:</h4>
            <ul v-if="personsTasks.length">
                <li v-for="person in personsTasks" :key="person.id">
                    <div class="person-container">
                        <div class="assigned-personstasks">
                            {{ `${person.first} ${person.last}, ${person.position}` }}
                        </div>
                        <div class="trash-icon" @click="onDeletePersonClick(person.id)">
                            <font-awesome-icon :icon="['fas', 'trash']" />
                        </div>
                    </div>
                </li>
            </ul>
            <div v-else>Not a single soul</div>
            
            <h4>Assign a person</h4>
            <div class="assign-form">
                <div class="input-container select">
                    <label for="addPerson">Choose a person:</label>
                    <select id="addPerson" v-model="selectValue">
                        <option value=""></option>
                        <option v-for="person in personsToSelect" :value="person.id" :key="person.id">{{ `${person.first} ${person.last}` }}</option>
                    </select>
                </div>
                <div>
                    <button @click="onSaveClick" class="submit-button">Save</button>
                </div>
            </div>
        </div>
    </div>   
</template>

<script>
import { mapActions, mapState } from 'vuex';
import db from '@/utils/db.js';


export default {
    name: "NewTaskPage",
    data () {
        return {
            task: "",
            projectid: null,
            selectValue: "",
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
        ...mapState(["projects"]),
        header() {
            return this.$route.params.id ? "Edit task" : "New task"
        },
        personsTasks() {
            return this.$store.state.personsTasks
        },
        persons() {
            return this.$store.state.persons
        },
        personsToSelect() {
            const ids = this.personsTasks.map(obj => obj.personid)
            return this.persons.filter(person => ids.indexOf(person.id) < 0)
        },
        isEdit() {
            return this.$route.params.id
        }
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
            this.$store.dispatch("fetchPersonsTasks", { filter: "taskid", id: this.$route.params.id })
        }
        this.$store.dispatch("fetchPersons")



        if (this.$store.state.projectIdToTask) {
            this.projectid = this.$store.state.projectIdToTask
        }
    },
    unmounted () {
        this.$store.commit("setProjectIdToTask", null)
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
        },
        onSaveClick() {
            if (!this.selectValue) {
                return
            }
            db.get("js6personstasks?personid=" + this.selectValue + "&taskid=" + this.$route.params.id).then((data) => {
                if(!data.length) {
                    db.post("js6personstasks", {personid: this.selectValue, taskid: this.$route.params.id}).then(() =>{
                        this.selectValue = ""
                        this.$store.dispatch("fetchPersonsTasks", { filter: "taskid", id: this.$route.params.id })
                    })
                }
            })
        },
        onDeletePersonClick(id) {
            db.delete("js6personstasks", { id }).then(() => {
                this.$store.dispatch("fetchPersonsTasks", { filter: "taskid", id: this.$route.params.id })
            })
        }
    }
}

</script>

<style scoped>
ul {
    margin-bottom: 20px;
}

h4 {
    color: #00ADB5;
    font-size: large;
}

</style>