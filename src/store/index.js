import { createStore } from "vuex"
import db from "@/utils/db.js"


const store = createStore({
    state: {
        projects: [],
        tasks: [],
        persons: [],
        errorMsg: ""
    },
    mutations: {
        setProjects(state, value) {
            state.projects = value
        },
        setProjectsTasks(state, value) {
            state.tasks = value
        },
        setTasks(state, value) {
            state.tasks = value
        },
        setPersons(state, value) {
            state.persons = value
        },
        setErrorMsg(state, value) {
            state.errorMsg = value
        }
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
        addProject (context, body) {
            db.post("js6projects", body).then(() => {
                context.dispatch("fetchProjects")
            })
        },
        addPerson (context, body) {
            db.post("js6persons", body).then(() => {
                context.dispatch("fetchPersons")
            })
        }
    },
    getters: {
        projects: (state) => state.projects,
        tasks: (state) => state.tasks,
        persons: (state) => state.persons,
        errorMsg: (state) => state.errorMsg
    }
})

export default store