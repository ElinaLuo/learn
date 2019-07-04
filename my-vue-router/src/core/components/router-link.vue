<template>
    <a @click="jump">
        <slot></slot>
    </a>
</template>

<script>
export default {
    name: 'router-link',
    props: ['to'],
    methods: {
        jump() {
            this.$router.push(this.to)
        }
    }
}
</script>

<style>

</style>
