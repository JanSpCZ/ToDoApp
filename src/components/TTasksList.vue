<template>
    <div v-if="!loading">
        <div v-if="tasks.length">
            <ul>
                <li @click="$router.push('/newtask/' + task.id)" v-for="task in tasks" :key="task.id">
                    {{ task.task }}
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
            return this.$store.state.tasks
        }
    }
}
</script>

<style scoped>
div {
    cursor: default;
}
ul {
    list-style-type: none;
}
li {
    margin: .8rem 0;
    transition: color .2s linear;
    cursor: pointer;
}
div:hover {
    color: #fff;
}
li:hover {
    color: #00ADB5;
}
</style>
