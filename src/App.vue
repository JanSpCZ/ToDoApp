<template>

  <TNavBar :links="links" />
  
  <RouterView>
    
  </RouterView>
</template>

<script>
import TNavBar from "@/components/TNavBar.vue"

export default {
  name: "App",
  data () {
    return {
      links: [
        { path: "/", label: "Home" },
        { path: "/projects", label: "Projects" },
        { path: "/tasks", label: "Tasks" },
        { path: "/people", label: "People" },
      ]
    }
  },
  components: { TNavBar }
}

</script>

