<template>
    <div>
        <!--        {{ $route.params.alias }}-->
        <!--        <router-link :to="{ name: 'serviceView', params: { alias: 'crop_sheep' } }">-->
        <!--            crop_sheep-->
        <!--        </router-link>-->
        <!--        <input v-model="service.title" type="text" />-->
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'ServiceView',
    computed: {
        ...mapState({
            service: (state) => state.activeService.item,
        }),
    },
    async created() {
        await this.GET_SERVICE({ alias: this.$route.params.alias });
    },
    methods: {
        ...mapActions({
            GET_SERVICE: 'activeService/GET_SERVICE',
        }),
    },
    metaInfo() {
        return {
            title: `${this.$route.params.alias} | servey`,
        };
    },
};
</script>

<style scoped lang="scss">
//div {
//    color: #eea135;
//}
</style>
