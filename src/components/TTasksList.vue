<template>
    <div v-if="!loading">
        <div v-if="tasks.length" class="tasks-container">
            <ul>
                <li v-for="(task, index) in tasks" :key="task.id">
                    <div class="tasks-name-container">
                        <input type="checkbox" class="checkbox" v-model="tasksModel[index]" :checked="task.completed" @change="toggleCheckbox(task, index)">
                        <div class="tasks-name" @click="$router.push('/newtask/' + task.id)">{{ task.task }}</div>
                    </div>
                    <div class="tasks-description">
                        <div :class="task.completed ? 'completed' : 'uncompleted'" class="tasks-status">
                            {{ task.completed ? "Completed" : "Uncompleted" }}
                        </div>
                        <div class="tasks-priority">
                            <font-awesome-icon :icon="['fas', 'triangle-exclamation']" />
                            {{ getTaskPriority(task.priority) }}
                        </div>
                        <div class="tasks-date">
                            {{ task.date }}
                        </div>
                        <div class="project-icon" @click.stop="onDeleteClick(task.id)">
                            <font-awesome-icon :icon="['fas', 'trash']" />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    
        <div v-else>
            <p>No tasks to show</p>
        </div>
    </div>
    <TModal 
        v-if="showModal"
        :msg="modalMsg"
        cancelBtn
        :confirmBtn="modalConfirmBtn"
        :cancelLabel="cancelBtnLabel"
        @close-me="closeModal"
        @cancel="closeModal"
        @confirm="deleteTask"
    />
</template>

<script>
//TODO: zobrazení modálu pro mazání tasks, pokud jsou k nim přiřazení lidé
import db from "@/utils/db"
import TModal from "./TModal.vue"

export default {
    name: "TTasksList",
    props: {
        projectId: {
            validator: (v) => v === "All" || typeof v === "number",
            required: true,
        }
    },
    data () {
        return {
            loading: true,
            showModal: false,
            modalMsg: "",
            modalCancelBtn: false,
            taskIdToDelete: null,
            cancelBtnLabel: "",
            tasksModel: []
        }
    },
    created () {
        const action = this.projectId === "All" ? "fetchTasks" : "fetchProjectsTasks"
        this.$store.dispatch(action, this.projectId).then(() => {
            this.tasks.forEach(task => {
                this.tasksModel.push(!!task.completed)
            })
            this.loading = false
            console.log(this.tasksModel)
        })
    },
    computed: {
        tasks() {
            return this.$store.state.tasks.map(task => ({
                ...task,
                completed: task.completed === 1
            }))
        },
    },
    methods: {
        getTaskPriority(priority) {
            if (priority === 3) {
                return "High"
            } else if (priority === 2) {
                return "Medium"
            } else {
                return "Low"
            }
        },
        onDeleteClick(taskId) {
            this.taskIdToDelete = taskId
            db.get("js6personstasks?taskid=" + taskId).then(data => {
                if(data.length) {
                    this.modalMsg = "This task has people assigned. Can not delete"
                    this.modalConfirmBtn = false
                    this.cancelBtnLabel = "OK"
                } else {
                    const task = this.tasks.find(task => task.id === taskId)
                    this.modalMsg = `Are you sure you want to delete ${task.task}?`
                    this.modalConfirmBtn = true
                    this.cancelBtnLabel = "Cancel"
                }
                this.showModal = true
            })
        },
        closeModal() {
            this.showModal = false
            this.modalMsg = ""
            this.taskIdToDelete = null
        },
        deleteTask() {
            db.delete("js6tasks", {id: this.taskIdToDelete}).then(() => {
                this.closeModal()
                this.loading = true
                const action = this.projectId === "All" ? "fetchTasks" : "fetchProjectsTasks"
                this.$store.dispatch(action, this.projectId).then(() => {
                    this.loading = false
                })
            })
        },
        toggleCheckbox(task, index) {
            const updatedTask = {
                    completed: this.tasksModel[index] ? 1 : 0,
                    id: task.id
            }
            console.log(updatedTask)
            this.$store.dispatch("updateTask", updatedTask)
        }
    },
    components: { TModal }
}
</script>

<style scoped>
.tasks-container {
    cursor: default;
    width: 50vw;
}

.tasks-name-container {
    display: flex;
    align-items: center;
    gap: 10px;
}

.tasks-description {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: small;
}

.tasks-status,
.tasks-priority {
    width: 8rem;
    text-align: start;
}

.tasks-date {
    width: 5rem;
    text-align: end;
    margin-right: 10px;
}

.tasks-name {
    cursor: pointer;
    transition: color .2s linear;
}

ul {
    list-style-type: none;
}

li {
    display: flex;
    justify-content: space-between;
    margin: .8rem 0;
    transition: color .2s linear;
}

.tasks-container:hover {
    color: #fff;
}

.tasks-name:hover {
    color: #00ADB5;
}

.completed {
    color: #30cf30;
}

.uncompleted {
    color: #CC0000;
}

.task-name-container {
    display: flex;
    gap: 10px;
}

.project-icon {
    cursor: pointer;
    padding: .3rem;
    transition: color .2s linear;
}

.project-icon:hover {
    color: #00ADB5;
}

input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  display: flex;
  align-content: center;
  justify-content: center;
  font-size: 1rem;
  padding: 0.1rem;
  border: 0.15rem solid #00ADB5;
  border-radius: 0.5rem;
  cursor: pointer;
}

input[type="checkbox"]::before {
  content: "";
  width: .8rem;
  height: .8rem;
  clip-path: polygon(31% 70%, 31% 48%, 4% 39%, 18% 95%, 36% 95%, 96% 28%, 80% 0%);
  transform: scale(0);
  background-color: #00ADB5;
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
}

input[type="checkbox"]:hover {
  color: black;
}



@media (max-width: 1000px) {
    .tasks-container {
        width: 50vw;
        justify-content: flex-start;
    }

    li {
        flex-direction: column;
        margin-top: 20px;
    }

    .tasks-date {
        text-align: start;
        margin: 0;
    }
}
@media (max-width: 768px) {
    .tasks-container {
        width: 70vw;
    }
}
</style>
