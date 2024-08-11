<template>
    <div v-if="persons.length">
        <ul>
            <li v-for="person in persons">
                {{ `${person.first} ${person.last}` }}
            </li>
        </ul>
    </div>

    <div v-else>
        <p>No people to show</p>
    </div>
</template>

<script>


export default {
    name: "TPersonsList",
    props: {
        persons: {
            type: Array,
            required: true,
            default: () => []
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

li:hover {
    color: #00ADB5;
}
</style>
