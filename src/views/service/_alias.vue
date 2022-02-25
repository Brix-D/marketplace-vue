<template>
    <div>
        {{ $route.params.alias }}
        <!--        <NuxtLink :to="{ name: 'service-alias', params: { alias: 'хуй' } }"> ХУЙ </NuxtLink>-->
        <router-link :to="{ name: 'serviceView', params: { alias: 'crop_sheep' } }">
            crop_sheep
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'ServiceView',
};
</script>

<style scoped lang="scss">
div {
    color: #eea135;
}
</style>
