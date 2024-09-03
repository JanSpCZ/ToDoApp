<template>

  <TNavBar :links="links" />
  
  <RouterView v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </RouterView>
  <TCircles />
</template>

<script>
import TNavBar from "@/components/TNavBar.vue"
import TCircles from "@/components/TCircles.vue"

export default {
  name: "App",
  data () {
    return {
      links: [
        { path: "/", label: "Home", icon: ["fas", "house"] },
        { path: "/projects", label: "Projects", icon: ["fas", "rocket"] },
        { path: "/tasks", label: "Tasks", icon: ["fas", "list-check"] },
        { path: "/people", label: "People", icon: ["fas", "users"] },
      ]
    }
  },
  components: { TNavBar, TCircles }
}

</script>


<style>
.route-enter-from {
  opacity: 0;
  transform: translateY(-50px);
}

.route-enter-active {
  transition: all .3s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateY(50px);
}

.route-leave-active {
  transition: all .3s ease-in;
}
</style>
