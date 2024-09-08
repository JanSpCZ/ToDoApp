<template>
    <div>
        <h3 class="my-h3">{{ header }}</h3>
        <form @submit.prevent="onSubmit" class="my-form">
            <div class="input-container">
                <label for="first-name">First name:</label>
                <input id="second-name" v-model="first" class="my-input" required>
            </div>
            <div class="input-container">
                <label for="last-name">Second name:</label>
                <input id="last-name" v-model="last" class="my-input" required>
            </div>
            <div class="input-container select">
                <label for="position-id">Position:</label>
                <select id="position-id" v-model="positionid" required>
                    <option value=""></option>
                    <option v-for="option in positions" :value="option.id" :key="option.id">{{ option.position }}</option>
                </select>
            </div>
            <div class="btn-container">
                <button class="submit-button">Submit</button>
            </div>
        </form>

        <div v-if="isEdit">
            <h4>Assigned tasks:</h4>
            <ul v-if="personsTasks.length">
                <li v-for="task in personsTasks" :key="task.id">
                    <div class="person-container">
                        <div class="assigned-personstasks">
                            {{ `${task.task} ${task.date}` }}
                        </div>
                        <div class="trash-icon" @click="onDeleteTaskClick(task.id)">
                            <font-awesome-icon :icon="['fas', 'trash']" />
                        </div>
                    </div>
                </li>
            </ul>
            <div v-else>Not a single task</div>
            
            <h4>Assign a task</h4>
            <div class="assign-form">
                <div class="input-container select">
                    <label for="addTask">Choose a task:</label>
                    <select id="addTask" v-model="selectValue">
                        <option value=""></option>
                        <option v-for="task in tasksToSelect" :value="task.id" :key="task.id">
                            {{ task.task }}
                        </option>
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
import { mapState, mapActions } from "vuex"
import db from "@/utils/db.js"

export default {
    name: "NewPersonPage",
    data () {
        return {
            first: "",
            last: "",
            positionid: null,
            selectValue: ""
        }
    },
    computed: {
        ...mapState(["positions"]),
        header() {
            return this.$route.params.id ? "Edit Person" : "New Person"
        },
        personsTasks() {
            return this.$store.state.personsTasks
        },
        tasks() {
            return this.$store.state.tasks
        },
        tasksToSelect() {
            const ids = this.personsTasks.map(obj => obj.taskid)
            return this.tasks.filter(task => ids.indexOf(task.id) < 0)
        },
        isEdit() {
            return this.$route.params.id
        }
    },
    created () {
        this.fetchPositions()

        if(this.$route.params.id) {
            this.$store.dispatch("fetchPersonToEdit", this.$route.params.id).then(() => {
                this.first = this.$store.state.personToEdit.first
                this.last = this.$store.state.personToEdit.last
                this.positionid = this.$store.state.personToEdit.positionid
                this.id = this.$route.params.id
            })
            this.$store.dispatch("fetchPersonsTasks", { filter: "personid", id: this.$route.params.id })
        }
        this.$store.dispatch("fetchTasks")
        
    },     
    methods: {
        ...mapActions(["fetchPositions"]),
        onSubmit() {
            const body = {
                first: this.first,
                last: this.last,
                positionid: this.positionid
            }
            if (this.id) {
                body.id = this.id
            }
            const action = this.id ? "editPerson" : "addPerson"

            this.$store.dispatch(action, body).then(() => {
                this.$router.push("/people")
            })
        },
        onSaveClick() {
            if (!this.selectValue) {
                return
            }
            db.get("js6personstasks?taskid=" + this.selectValue + "&personid=" + this.$route.params.id).then((data) => {
                if(!data.length) {
                    db.post("js6personstasks", { taskid: this.selectValue, personid: this.$route.params.id }).then(() =>{
                        this.selectValue = ""
                        this.$store.dispatch("fetchPersonsTasks", { filter: "personid", id: this.$route.params.id })
                    })
                }
            })
        },
        onDeleteTaskClick(id) {
            db.delete("js6personstasks", { id }).then(() => {
                this.$store.dispatch("fetchPersonsTasks", { filter: "personid", id: this.$route.params.id })
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