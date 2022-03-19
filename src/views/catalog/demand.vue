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
            services: (state) => state.service.demand,
        }),
    },
    created() {
        this.GET_SERVICES();
    },
    methods: {
        ...mapActions({ GET_SERVICES: 'service/GET_DEMAND' }),
    },
};
</script>

<style scoped lang="scss"></style>
