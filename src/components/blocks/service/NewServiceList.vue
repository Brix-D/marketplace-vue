<template>
    <div class="services pa-4 rounded-lg">
        <h3 class="h4">{{ title }}</h3>
        <div class="mt-4">
            <v-list v-if="!!items.length" two-line>
                <v-list-item
                    v-for="(service, index) in items"
                    :key="service.id"
                    @click="onEditService(index)"
                >
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
            <v-btn
                :color="$vuetify.theme.currentTheme.info"
                large
                :ripple="false"
                depressed
                dark
                class="rounded-lg"
                @click="onAddService"
            >
                Добавить услугу
            </v-btn>
        </div>
        <AddService v-model="modal.open" :title="modal.title" :item="modal.item" :type="type" />
    </div>
</template>
<script>
import { mapMutations } from 'vuex';
import AddService from '@/components/blocks/modal/AddService';

export default {
    name: 'NewServiceList',
    components: { AddService },
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
        type: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            selectedSuggestion: {},
            modal: {
                open: false,
                title: '',
                item: {},
            },
        };
    },
    computed: {
        suggestionList() {
            return this.existingItems.map((item) => {
                if (!this.items.some((selectedItem) => selectedItem.id === item.id)) {
                    return { text: item.title, value: item };
                }
            });
        },
    },
    methods: {
        ...mapMutations({
            ADD_SERVICE: 'newServices/ADD_SERVICE',
            DELETE_SERVICE: 'newServices/DELETE_SERVICE',
        }),
        onSelectService(event) {
            if (!!event) {
                this.ADD_SERVICE({ listName: this.type, service: event.value });
            }
            this.selectedSuggestion = {};
        },
        onDeleteService(index) {
            this.DELETE_SERVICE({ listName: this.type, index });
        },
        onAddService(type) {
            this.modal.title = 'Добавить услугу';
            this.modal.open = true;
            this.modal.item = {};
            // this.modal.type = type;
        },
        onEditService(index, type) {
            this.modal.title = 'Редактировать услугу';
            this.modal.open = true;
            //this.modal.item = this.this.modal.type = type;
        },
    },
};
</script>
<style lang="scss" scoped>
.services {
    border: 1px solid $color-info;
}
</style>
