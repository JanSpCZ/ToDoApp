<template>
    <ul>
        <li v-for="(project, index) in projects" :key="project.id" @click="toggleDescription(index, project.id)">
            <div class="project-header">
                <div class="project-name">
                    {{ project.project }}
                </div>
                <span class="edit-project" @click="$router.push('/newproject/' + project.id)"><font-awesome-icon :icon="['fas', 'gear']" /></span>
            </div>
            <div v-if="clickedProject === index" class="description">{{ project.description }}</div>
            <div v-if="clickedProject === index" class="tasks-list">
                <TTasksList :projectId="project.id" />
            </div>
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
    display: grid;
    grid-template-rows: auto auto;
    row-gap: .5rem;
}

.project-header {
    display: grid;
    grid-template-columns: 1fr auto auto;
    align-items: center;
    column-gap: 1rem;
}

.description {
    color: #a1a1a1;
    width: 100%;
}

li:hover .description {
    color: #a1a1a1;
}

.tasks-list {
    color: #fff;
    padding-left: 5%;
}

.project-name {
    transition: color .2s linear;
}

.project-name:hover {
    color: #00ADB5;
}

.edit-project {
    padding: .3rem;
    transition: color .2s linear;
}

.edit-project:hover {
    color: #00ADB5;
}

</style>