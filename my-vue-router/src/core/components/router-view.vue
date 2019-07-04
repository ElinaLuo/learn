<template>
    <component :is="currentView"></component>
</template>

<script>
export default {
    name: 'router-view',
    computed: {
        currentView() {
            return this.$route && this.$route.component
        }
    }
}
</script>

<style>

</style>
