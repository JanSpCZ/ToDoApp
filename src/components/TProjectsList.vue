<template>
    <ul>
        <li v-for="(project, index) in projects" @click="toggleDescription(index, project.id)">
            {{ project.project }}
            <span v-if="clickedProject === index" class="description">{{ project.description }}</span>
            <span v-if="clickedProject === index" class="tasks-list">
                <TTasksList :projectId="project.id" />
            </span>
        </li>
    </ul>
</template>

<script>

import { mapState, mapActions } from "vuex"
import TTasksList from "./TTasksList.vue"

export default {
    name: "TProjectsList",
    data () {
        return {
            clickedProject: null,
            show: false
        }
    },
    computed: {
        ...mapState(["projects", "tasks", "errorMsg"])
    },
    created () {
        this.fetchProjects()
    },
    methods: {
        ...mapActions(["fetchProjects", "fetchProjectsTasks"]),
        toggleDescription(index, projectId) {
            if (this.clickedProject === index) {
                this.clickedProject = null
                this.$store.commit("setTasks", [])
            } else {
                this.clickedProject = index
                this.fetchProjectsTasks(projectId).then(() => {
                    this.show = true
                })
            }
        }
    },
    components: { TTasksList }
}

</script>

<style scoped>
ul {
    margin: 3rem 0;
    list-style-type: none;
}

li {
    border-bottom: 3px solid #393E46;
    max-width: 400px;
    padding: .5rem 0;
    cursor: pointer;
    transition: color .2s linear;
}

li:hover {
    color: #00ADB5;
}

.description {
    color: #a1a1a1;
    width: 100%;
    margin-left: 10%;
}

li:hover .description {
    color: #a1a1a1;
}

.tasks-list {
    color: #fff;
}

</style>