<template>
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
    name: 'CatalogDemandPage',
    metaInfo: {
        title: 'Каталог потребностей | servey',
    },
    components: {
        TheCatalog,
        BServiceList,
    },
    computed: {
        ...mapState({
            services: (state) => state.catalog.items,
        }),
    },
    async created() {
        await this.GET_CATALOG({ type: 'demand' });
    },
    methods: {
        ...mapActions({ GET_CATALOG: 'catalog/GET_CATALOG' }),
    },
};
</script>

<style scoped lang="scss"></style>
