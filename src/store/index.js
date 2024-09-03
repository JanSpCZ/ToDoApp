import { createStore } from "vuex"
import db from "@/utils/db.js"


const store = createStore({
    state: {
        projects: [],
        tasks: [],
        persons: [],
        positions: [],
        projectToEdit: {},
        taskToEdit: {},
        personToEdit: {},
        projectIdToTask: null,
    },
    mutations: {
        setProjects(state, value) {
            state.projects = value
        },
        setProjectsTasks(state, value) {
            state.tasks = value
        },
        setProjectToEdit(state, record) {
            state.projectToEdit = record
        },
        setTasks(state, value) {
            state.tasks = value
        },
        setPersons(state, value) {
            state.persons = value
        },
        setPositions(state, value) {
            state.positions = value
        },
        setTaskToEdit(state, record) {
            state.taskToEdit = record
        },
        setPersonToEdit(state, record) {
            state.personToEdit = record
        },
        setProjectIdToTask(state, value) {
            state.projectIdToTask = value
        },
        setUpdateTask(state, updatedTask) {
            const index = state.tasks.findIndex(task => task.id === updatedTask.id);
            if (index !== -1) {
                state.tasks.splice(index, 1, updatedTask)
            }
        },
    },
    actions: {
        fetchProjects (context) {
            return db.get("js6projects").then((projects) => {
                context.commit("setProjects", projects)
            })
        },
        fetchProjectsTasks (context, projectId) {
            return db.get(`js6tasks?projectid=${projectId}`).then((tasks) => {
                context.commit("setProjectsTasks", tasks)
            })
        },
        fetchProjectToEdit (context, id) {
            return db.get("js6projects/" + id).then((record) => {
                context.commit("setProjectToEdit", record)
            })
        },
        fetchTasks (context) {
            return db.get("js6tasks").then((tasks) => {
                context.commit("setTasks", tasks)
            })
        },
        fetchPersons (context) {
            return db.get("js6persons").then((persons) => {
                context.commit("setPersons", persons)
            })
        },
        fetchPositions (context) {
            return db.get("js6positions").then((positions) => {
                context.commit("setPositions", positions)
            })
        },
        addProject (context, body) {
            return db.post("js6projects", body).then(() => {
                context.dispatch("fetchProjects")
            })
        },
        editProject (context, body) {
            return db.put("js6projects", body).then(() => {
                context.dispatch("fetchProjects")
            })
        },
        addPerson (context, body) {
            return db.post("js6persons", body).then(() => {
                context.dispatch("fetchPersons")
            })
        },
        editPerson (context, body) {
            return db.put("js6persons", body).then(() => {
                context.dispatch("fetchPersons")
            })
        },
        fetchPersonToEdit (context, id) {
            return db.get("js6persons/" + id).then((record) => {
                context.commit("setPersonToEdit", record)
            })
        },
        addTask (context, body) {
            return db.post("js6tasks", body).then(() => {
                context.dispatch("fetchTasks")
            })
        },
        editTask (context, body) {
            return db.put("js6tasks", body).then(() => {
                context.dispatch("fetchTasks")
            })
        },
        fetchTaskToEdit (context, id) {
            return db.get("js6tasks/" + id).then((record) => {
                context.commit("setTaskToEdit", record)
            })
        },
        updateTask (context, payload) {
            return db.put(`js6tasks/${payload.data.id}`, payload).then(() => {
                context.commit("setUpdateTask", payload.data)
            })
        }
    },
    getters: {
        projects: (state) => state.projects,
        tasks: (state) => state.tasks,
        persons: (state) => state.persons,
    }
})

export default store