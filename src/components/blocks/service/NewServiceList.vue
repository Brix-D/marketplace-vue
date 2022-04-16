<template>
    <div class="services pa-4 rounded-lg">
        <h3 class="h4">{{ title }}</h3>
        <div class="mt-4">
            <v-list v-if="!!items.length" two-line>
                <v-list-item v-for="(service, index) in items" :key="service.id">
                    <!--                                <v-list-item-avatar>-->
                    <!--                                    <v-img :src="service.field_photo" />-->
                    <!--                                </v-list-item-avatar>-->
                    <v-list-item-content>
                        <v-list-item-title v-text="service.title" />

                        <v-list-item-subtitle v-text="service.description" />
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-btn icon @click="onDeleteService(index)">
                            <v-icon :color="$vuetify.theme.currentTheme.info"> mdi-close </v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
            <div class="mt-4">
                <span class="body-1">
                    Выберите из списка уже имеющихся услуг или создайте новую
                </span>
            </div>
            <v-autocomplete
                :value="selectedSuggestion"
                :items="suggestionList"
                return-object
                outlined
                clearable
                class="mt-4"
                @change="onSelectService"
            />
        </div>
    </div>
</template>
<script>
export default {
    name: 'NewServiceList',
    props: {
        title: {
            type: String,
            default: '',
        },
        items: {
            type: Array,
            required: true,
        },
        existingItems: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            selectedSuggestion: {},
        };
    },
    computed: {
        suggestionList() {
            return this.existingItems.map((item) => {
                return { text: item.title, value: item };
            });
        },
    },
    methods: {
        onSelectService(event) {
            if (!!event) {
                this.$emit('select', event);
            }
            this.selectedSuggestion = {};
        },
        onDeleteService(index) {
            this.$emit('delete', index);
        },
    },
};
</script>
<style lang="scss" scoped>
.services {
    border: 1px solid $color-info;
}
</style>
