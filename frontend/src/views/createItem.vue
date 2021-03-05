<template>
    <headerAll/>
    <createForm/>
    <footerAll/>
</template>

<script>
import headerAll from '../components/headerAll.vue'
import createForm from '../components/createForm.vue'
import footerAll from "../components/footerAll"
export default {
  components: { headerAll, createForm, footerAll },
    name: "createItem"
}
</script>