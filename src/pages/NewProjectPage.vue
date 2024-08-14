<template>
    <h3 class="myH3">New Project</h3>
    <form @submit.prevent="onSubmit">
        <div>
            <label for="name">Project name:</label>
            <input id="name" v-model="project">
        </div>
        <div>
            <label for="description">Project description:</label>
            <input id="description" v-model="description">
        </div>
        <div class="btn-container">
            <button>Add new project</button>
        </div>
    </form>
</template>

<script>


export default {
    name: "NewProjectPage",
    data () {
        return {
            project: "",
            description: ""
        }
    },
    methods: {
        onSubmit() {
            this.$store.dispatch("addProject", {
                project: this.project,
                description: this.description
            }).then(() => {
                this.$router.push("/projects")
            })
        }
    }
}

</script>

<style scoped>
form {
    max-width: 400px;
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

div {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

input {
    width: 50%;
    padding: .3rem;
    background-color: #222831;
    color: #fff;
    border: none;
    border-bottom: 3px solid #393E46;
    outline: none;
}

input:focus {
    border-bottom: 3px solid #00ADB5;
}

.btn-container {
    display: flex;
    justify-content: flex-end;
}

button {
    padding: .8rem;
    border-radius: 5px;
    cursor: pointer;
    background-color: #222831;
    border: 3px solid #fff;
    color: #fff;
    font-size: medium;
    transition: all .2s linear;
}

button:hover {
    color: #00ADB5;
    border: 3px solid #00ADB5;
}

</style>