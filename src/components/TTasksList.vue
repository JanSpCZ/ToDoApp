<template>
    <div v-if="!loading">
        <div v-if="tasks.length" class="tasks-container">
            <ul>
                <li v-for="task in tasks" :key="task.id">
                    <div class="task-name-container">
                        <input type="checkbox" v-model="task.completed" :checked="task.completed" @change="toggleCheckbox(task)">
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
                    </div>
                </li>
            </ul>
        </div>
    
        <div v-else>
            <p>No tasks to show</p>
        </div>
    </div>
</template>

<script>

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
            loading: true
        }
    },
    created () {
        const action = this.projectId === "All" ? "fetchTasks" : "fetchProjectsTasks"
        this.$store.dispatch(action, this.projectId).then(() => {
            this.loading = false
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
        toggleCheckbox(task) {
            const updatedTask = {
                data: {
                    completed: task.completed ? 1 : 0,
                    date: task.date,
                    id: task.id,
                    priority: task.priority,
                    projectid: task.projectid,
                    task: task.task
                }
            }

            this.$store.dispatch("updateTask", updatedTask)
        }
    }
}
</script>

<style scoped>
.tasks-container {
    cursor: default;
    max-width: 50vw;
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
}

.tasks-name {
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
    cursor: pointer;
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
</style>
