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
        { path: "/", label: "Home", icon: ["fas", "house"] },
        { path: "/projects", label: "Projects", icon: ["fas", "rocket"] },
        { path: "/tasks", label: "Tasks", icon: ["fas", "sitemap"] },
        { path: "/people", label: "People", icon: ["fas", "users"] },
      ]
    }
  },
  components: { TNavBar }
}

</script>

