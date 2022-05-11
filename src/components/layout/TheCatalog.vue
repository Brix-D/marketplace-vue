<template>
    <div>
        <v-container fluid class="py-2 mb-2 wrapper rounded-lg">
            <BSearch />
        </v-container>
        <v-row dense>
            <v-col md="9" xs="12">
                <div class="wrapper rounded-lg pa-3">
                    <slot />
                </div>
            </v-col>
            <v-col v-if="$vuetify.breakpoint.mdAndUp" md="3" class="d-flex">
                <div class="wrapper rounded-lg pa-3 d-flex flex-column flex-grow-1">
                    <BFilters />
                </div>
            </v-col>
            <div v-else class="filter__button">
                <v-btn
                    icon
                    large
                    :ripple="false"
                    :color="$vuetify.theme.currentTheme.info"
                    dark
                    depressed
                    @click="filtersModal = !filtersModal"
                >
                    <v-icon>mdi-filter</v-icon>
                </v-btn>
            </div>
        </v-row>
        <ModalFilters v-model="filtersModal" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import BFilters from '@/components/blocks/catalog/BFilters';
import ModalFilters from '@/components/blocks/modal/ModalFilters';
import BSearch from '@/components/blocks/header/BSearch';

export default {
    name: 'TheCatalog',
    components: { BFilters, BSearch, ModalFilters },
    data() {
        return {
            filtersModal: false,
        };
    },
};
</script>

<style lang="scss" scoped>
.filter {
    &__button {
        position: fixed;
        bottom: 48px;
        right: 16px;
        z-index: 4;
        background-color: $color-white;
        border: 1px solid $color-info;
        border-radius: 50%;
    }
}
</style>
