<template>
    <h3 class="my-h3">New Person</h3>
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
            <label for="positionid">Position:</label>
            <select id="positionid" v-model="positionid" required>
                <option value=""></option>
                <option v-for="option in positions" :value="option.id" :key="option.id">{{ option.position }}</option>
            </select>
        </div>
        <div class="btn-container">
            <button class="submit-button">Submit</button>
        </div>
    </form>
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
        ...mapState(["positions"])
    },
    created () {
        this.fetchPositions()
    },     
    methods: {
        ...mapActions(["fetchPositions"]),
        onSubmit() {
            this.$store.dispatch("addPerson", {
                first: this.first,
                last: this.last,
                positionid: this.positionid
            }).then(() => {
                this.$router.push("/people") //TODO: dodělat, databáze nechce přijímat data
            })
        }
    }
}


</script>

<style scoped>
.select {
    position: relative;
}

select {
    appearance: none;
    position: relative;
    width: 55%;
    padding: .3rem;
    background-color: #222831;
    color: #fff;
    border: 0;
    outline: 0;
    border-bottom: 3px solid #393E46;
    cursor: pointer;
}

select:focus {
    border-bottom: 3px solid #00ADB5;
}

.select::after {
    content: '\25BC';
    position: absolute;
    top: 0;
    right: 0;
    outline: 0;
    background-color: #222831;
    transition: .2s all linear;
    pointer-events: none;
}

.select:hover::after {
    color: #00ADB5;
}
</style>