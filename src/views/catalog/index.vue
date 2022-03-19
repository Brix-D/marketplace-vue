<template>
    <!--    <div class="stub" />-->
    <div>
        <TheCatalog>
            <BServiceList :items="services" />
        </TheCatalog>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TheCatalog from '@/components/layout/TheCatalog';
import BServiceList from '@/components/blocks/catalog/BServiceList';
export default {
    name: 'CatalogPage',
    components: {
        TheCatalog,
        BServiceList,
    },
    // data() {
    //     return {
    //         //services: [],
    //     };
    // },
    computed: {
        ...mapState({
            services: (state) => state.service.offer,
        }),
    },
    created() {
        this.GET_SERVICES();
        //this.TEST_AXIOS();
    },
    methods: {
        ...mapActions({
            GET_SERVICES: 'service/GET_OFFER',
            //TEST_AXIOS: 'service/TEST_AXIOS'
        }),
    },
};
</script>

<style scoped lang="scss">
.stub {
    min-height: 1000px;
}
</style>
