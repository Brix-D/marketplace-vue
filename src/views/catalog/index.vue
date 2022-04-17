<template>
    <!--    <div class="stub" />-->
    <div>
        <TheCatalog>
            <BServiceList :items="FILTERED_SERVICES(services)" />
        </TheCatalog>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import TheCatalog from '@/components/layout/TheCatalog';
import BServiceList from '@/components/blocks/catalog/BServiceList';

export default {
    name: 'CatalogPage',
    metaInfo: {
        title: 'Каталог услуг | servey',
    },
    components: {
        TheCatalog,
        BServiceList,
    },
    computed: {
        ...mapState({
            services: (state) => state.catalog.items,
        }),
        ...mapGetters({
            FILTERED_SERVICES: 'filters/FILTERED_SERVICES',
        }),
    },

    async created() {
        await this.GET_CATALOG({ type: 'offer' });
        await this.GET_FILTERS({ type: 'offer' });
        //this.TEST_AXIOS();
    },
    methods: {
        ...mapActions({
            GET_CATALOG: 'catalog/GET_CATALOG',
            GET_FILTERS: 'filters/GET_FILTERS',
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
