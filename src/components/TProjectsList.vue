<template>
    <ul>
        <li v-for="(project, index) in projects" :key="project.id">
            <div class="project-header">
                <div class="project-name" @click="toggleDescription(index, project.id)">
                    {{ project.project }}
                </div>
                <div class="project-icon" @click="$router.push('/newproject/' + project.id)">
                    <font-awesome-icon :icon="['fas', 'gear']" />
                </div>
                <div class="project-icon" @click.stop="onDeleteClick(project.id)">
                    <font-awesome-icon :icon="['fas', 'trash']" />
                </div>
            </div>
            <div v-if="clickedProject === index" class="description">{{ project.description }}</div>
            <div v-if="clickedProject === index" @click="newProjectTask(project.id)" class="add-task"><font-awesome-icon :icon="['fas', 'circle-plus']" /></div>
            <div v-if="clickedProject === index" class="tasks-list">
                <TTasksList :projectId="project.id" />
            </div>
        </li>
    </ul>
    <TModal 
        v-if="showModal"
        :msg="modalMsg"
        cancelBtn
        :confirmBtn="modalConfirmBtn"
        :cancelLabel="cancelBtnLabel"
        @close-me="closeModal"
        @cancel="closeModal"
        @confirm="deleteProject"

    />
</template>

<script>

import db from "@/utils/db"
import { mapState, mapActions } from "vuex"
import TTasksList from "./TTasksList.vue"
import TModal from "./TModal.vue"

export default {
    name: "TProjectsList",
    data () {
        return {
            loading: true,
            clickedProject: null,
            show: false,
            showModal: false,
            modalMsg: "",
            modalCancelBtn: false,
            projectIdToDelete: null,
            cancelBtnLabel: ""
        }
    },
    computed: {
        ...mapState(["projects", "tasks"])
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
        },
        newProjectTask(projectid) {
            this.$store.commit("setProjectIdToTask", projectid)
            this.$router.push("/newtask")
        },
        onDeleteClick(id) {
            this.projectIdToDelete = id
            db.get("js6tasks?projectid=" + id).then(data => {
                if(!data.length) {
                    this.modalMsg = "Are you sure to delete " + this.projects.find(project => project.id === id).project + "?"
                    this.modalConfirmBtn = true
                    this.cancelBtnLabel = "Cancel"
                } else {
                    this.modalMsg = "Can not delete this project"
                    this.modalConfirmBtn = false
                    this.cancelBtnLabel = "OK"
                }
                this.showModal = true
            })
        },
        closeModal() {
            this.showModal = false
            this.modalMsg = ""
            this.projectIdToDelete = null
        },
        deleteProject () {
            db.delete("js6projects", {id: this.projectIdToDelete}).then(() => {
                this.closeModal()
                this.loading = true
                this.$store.dispatch("fetchProjects").then(() => {
                    this.loading = false
                })
            })
        }
    },
    components: { TTasksList,  TModal }
}

</script>

<style scoped>
ul {
    list-style-type: none;
}

li {
    border-bottom: 3px solid #393E46;
    max-width: 50vw;
    padding: .3rem 0;
    cursor: pointer;
    transition: color .2s linear;
    display: grid;
    grid-template-rows: auto auto;
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

.add-task {
    padding: .3rem 0;
    transition: color .2s linear;
    width: 20px;
}

.project-icon{
    padding: .3rem;
    transition: color .2s linear;
}

.project-icon:hover,
.add-task:hover {
    color: #00ADB5;
}

</style>