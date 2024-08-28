<template>
    <div>
        <h3 class="my-h3">{{ header }}</h3>
        <form @submit.prevent="onSubmit" class="my-form">
            <div class="input-container">
                <label for="first-name">First name:</label>
                <input id="second-name" v-model="first" class="my-input" required>
            </div>
            <div class="input-container">
                <label for="last-name">Second name:</label>
                <input id="last-name" v-model="last" class="my-input" required>
            </div>
            <div class="input-container select">
                <label for="position-id">Position:</label>
                <select id="position-id" v-model="positionid" required>
                    <option value=""></option>
                    <option v-for="option in positions" :value="option.id" :key="option.id">{{ option.position }}</option>
                </select>
            </div>
            <div class="btn-container">
                <button class="submit-button">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
    name: "NewPersonPage",
    data () {
        return {
            first: "",
            last: "",
            positionid: null
        }
    },
    computed: {
        ...mapState(["positions"]),
        header() {
            return this.$route.params.id ? "Edit Person" : "New Person"
        }
    },
    created () {
        this.fetchPositions()

        if(this.$route.params.id) {
            this.$store.dispatch("fetchPersonToEdit", this.$route.params.id).then(() => {
                this.first = this.$store.state.personToEdit.first
                this.last = this.$store.state.personToEdit.last
                this.positionid = this.$store.state.personToEdit.positionid
                this.id = this.$route.params.id
            })
        }
    },     
    methods: {
        ...mapActions(["fetchPositions"]),
        onSubmit() {
            const body = {
                first: this.first,
                last: this.last,
                positionid: this.positionid
            }
            if (this.id) {
                body.id = this.id
            }
            const action = this.id ? "editPerson" : "addPerson"

            this.$store.dispatch(action, body).then(() => {
                this.$router.push("/people")
            })
        }
    }
}


</script>

<style scoped>

</style>