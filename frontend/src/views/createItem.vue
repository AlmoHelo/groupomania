<template>
    <headerAll/>
    <createForm/>
</template>

<script>
import headerAll from '../components/headerAll.vue'
import createForm from '../components/createForm.vue'
export default {
  components: { headerAll, createForm },
    name: "createItem"
}
</script>