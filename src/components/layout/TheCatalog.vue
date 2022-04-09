<template>
    <v-row dense>
        <v-col md="9" xs="12">
            <div class="wrapper rounded-lg pa-3">
                <slot />
            </div>
        </v-col>
        <v-col v-if="$vuetify.breakpoint.mdAndUp" md="3">
            <aside class="wrapper rounded-lg pa-3">
                <div class="catalog__filters">{{ filtersList }}</div>
            </aside>
        </v-col>
    </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    name: 'TheCatalog',
    computed: {
        ...mapState({
            filtersList: (state) => state.filters.items,
        }),
    },
};
</script>

<style scoped lang="scss">
.catalog {
    &__filters {
    }
}
</style>
