<template>
    <ModalLayoutDefault v-model="modal" title="Фильтры">
        <div class="d-flex flex-column filters">
            <div class="filters__groups">
                <div
                    v-for="group in filtersList.groups"
                    :key="group.groupId"
                    class="filters__group"
                >
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
        </div>
        <template #footer>
            <v-btn
                :color="$vuetify.theme.currentTheme.info"
                dark
                class="rounded-lg align-self-center"
                block
                large
                @click="applyFilters"
            >
                Применить
            </v-btn>
        </template>
    </ModalLayoutDefault>
</template>

<script>
import ModalLayoutDefault from '@/components/blocks/modal/template/ModalLayoutDefault';
import { modalToggleMixin } from '@/mixins/modal';
import { mapMutations, mapState } from 'vuex';
export default {
    name: 'ModalFilters',
    components: {
        ModalLayoutDefault,
    },
    mixins: [modalToggleMixin],
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
        },
        applyFilters() {
            this.APPLY_FILTERS(this.selectedFilters);
            this.modal = false;
        },
    },
};
</script>

<style scoped lang="scss">
.filters {
    background-color: $color-white;

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
