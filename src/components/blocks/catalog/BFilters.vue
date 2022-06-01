<template>
    <aside class="filters d-flex flex-column pa-4">
        <h3 class="filters__title text-center">Фильтры</h3>
        <div class="filters__groups">
            <div v-for="group in filtersList.groups" :key="group.groupId" class="filters__group">
                <h4 class="filters__group-name">{{ group.name }}</h4>
                <v-checkbox
                    v-for="variant in group.variations"
                    :key="variant.variationId"
                    :label="variant.name"
                    :value="variant.variationId"
                    @change="onFilterChange(group.alias, variant.variationId)"
                />
            </div>
        </div>
        <!--        <v-btn-->
        <!--            :color="$vuetify.theme.currentTheme.info"-->
        <!--            dark-->
        <!--            class="rounded-lg align-self-center"-->
        <!--            @click="applyFilters"-->
        <!--        >-->
        <!--            Применить-->
        <!--        </v-btn>-->
    </aside>
</template>
<script>
import { mapMutations, mapState } from 'vuex';

export default {
    name: 'BFilters',

    data() {
        return {
            selectedFilters: {},
        };
    },

    computed: {
        ...mapState({
            filtersList: (state) => state.filters.items,
        }),
    },

    methods: {
        ...mapMutations({
            APPLY_FILTERS: 'filters/APPLY_FILTERS',
        }),
        onFilterChange(groupName, variantId) {
            let group = this.selectedFilters[groupName];
            if (!group) {
                group = [];
            }
            if (group.includes(variantId)) {
                group.splice(
                    group.findIndex((value) => value === variantId),
                    1
                );
            } else {
                group.push(variantId);
            }
            if (!!group.length) {
                this.$set(this.selectedFilters, groupName, [...group]);
            } else {
                this.$delete(this.selectedFilters, groupName);
            }
            this.applyFilters();
        },
        applyFilters() {
            this.APPLY_FILTERS(this.selectedFilters);
        },
    },
};
</script>
<style scoped lang="scss">
.filters {
    background-color: $color-white;

    &__title {
        font-size: 1.25rem;
        font-weight: 500;
    }

    &__groups {
    }

    &__group {
    }

    &__group-name {
        font-size: 1.15rem;
        font-weight: 400 !important;
    }
}
</style>
