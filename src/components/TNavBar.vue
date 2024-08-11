<template>
    <nav>
        <ul>
            <li v-for="link in links">
                <div v-if="$route.path === link.path">{{ link.label }}</div>
                <RouterLink v-else :to="link.path">{{ link.label }}</RouterLink>
            </li>
        </ul>
    </nav>
</template>

<script>

export default {
    name: "TNavBar",
    props: {
        links: Array
    }
}

</script>

<style scoped>

nav {
    width: 15vw;
    height: 100vh;
    top: 10vh;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 1.6em;
    position: fixed;
    border-right: 3px solid #393E46;
}
ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
li {
    font-size: 1.25em;
}
a {
    display: flex;
    padding: .3em .7em;
    text-decoration: none;
    color: #f4f7f5;
    transition: color .2s linear;
    font-weight: 500;
}
a:hover {
    color: #00ADB5;
}
div {
    display: flex;
    padding: .3em .7em;
    color: #00ADB5;
    font-weight: 500;
}

</style>