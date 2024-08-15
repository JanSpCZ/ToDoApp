<template>
    <h3 class="my-h3">New Person</h3>
    <form @submit.prevent="onSubmit" class="my-form">
        <div class="input-container">
            <label for="first-name">First name:</label>
            <input id="second-name" v-model="first" class="my-input">
        </div>
        <div class="input-container">
            <label for="last-name">Second name:</label>
            <input id="last-name" v-model="last" class="my-input">
        </div>
        <div class="input-container">
            <label for="position">Position:</label>
            <input id="position" v-model="position" class="my-input">
        </div>
        <div class="btn-container">
            <button class="submit-button">Submit</button>
        </div>
        <!-- TODO: inputy vypadají špatně po zadání textu -->
    </form>
</template>

<script>

export default {
    name: "NewPersonPage",
    data () {
        return {
            first: "",
            last: "",
            position: ""
        }
    },
    methods: {
        onSubmit() {
            this.$store.dispatch("addPerson", {
                first: this.first,
                last: this.last,
                position: this.position
            }).then(() => {
                this.$router.push("/people") //TODO: dodělat, databáze nechce přijímat data
            })
        }
    }
}


</script>