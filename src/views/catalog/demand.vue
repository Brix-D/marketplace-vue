<template>
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
    name: 'CatalogDemandPage',
    metaInfo: {
        title: 'Каталог потребностей | servey',
        meta: [
            {
                vmid: 'description',
                name: 'description',
                content:
                    'Маркетплейс услуг - это сервис для организации исполнения услуг и предоставления предложений услуг без прямого взаимодействия между исполнителем и заказчиком.',
            },
        ],
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
        await this.GET_CATALOG({ type: 'demand' });
        await this.GET_FILTERS({ type: 'demand' });
    },
    methods: {
        ...mapActions({
            GET_CATALOG: 'catalog/GET_CATALOG',
            GET_FILTERS: 'filters/GET_FILTERS',
        }),
    },
};
</script>

<style scoped lang="scss"></style>
