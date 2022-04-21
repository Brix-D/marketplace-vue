<template>
    <div class="services pa-4 rounded-lg">
        <h3 class="h4">{{ title }}</h3>
        <div class="mt-4">
            <v-list v-if="!!items.length" two-line>
                <v-list-item
                    v-for="(service, index) in items"
                    :key="service.id"
                    :disabled="disabled"
                    @click="onEditService(service, index)"
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
                    {{ hintMessage }}
                </span>
            </div>
            <v-autocomplete
                :value="selectedSuggestion"
                :items="suggestionList"
                return-object
                outlined
                clearable
                class="mt-4"
                :disabled="disabled"
                @change="onSelectService"
            />
            <v-btn
                :color="$vuetify.theme.currentTheme.info"
                large
                :ripple="false"
                depressed
                :dark="!disabled"
                class="rounded-lg"
                :disabled="disabled"
                @click="onAddService"
            >
                Добавить {{ this.bundle === 'service' ? 'услугу' : 'товар' }}
            </v-btn>
        </div>
        <AddService
            v-if="modal.open"
            v-model="modal.open"
            :title="modal.title"
            :item="modal.item"
            :type="type"
            @save="onSaveItem($event)"
        />
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
        bundle: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            selectedSuggestion: {},
            modal: {
                open: false,
                title: '',
                item: {},
                itemIndex: null,
                isEdit: null,
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
        hintMessage() {
            return `Выберите из списка уже имеющихся ${
                this.bundle === 'service' ? 'услуг' : 'товаров'
            } или создайте ${this.bundle === 'service' ? 'новую' : 'новый'}`;
        },
    },
    methods: {
        ...mapMutations({
            ADD_SERVICE: 'newServices/ADD_SERVICE',
            DELETE_SERVICE: 'newServices/DELETE_SERVICE',
            EDIT_SERVICE: 'newServices/EDIT_SERVICE',
        }),
        onSelectService(event) {
            if (!!event) {
                this.ADD_SERVICE({
                    bundle: this.bundle,
                    listName: this.type,
                    service: event.value,
                });
            }
            this.selectedSuggestion = {};
        },
        onDeleteService(index) {
            this.DELETE_SERVICE({ bundle: this.bundle, listName: this.type, index });
        },
        onAddService() {
            this.modal.title = this.bundle === 'service' ? 'Добавить услугу' : 'Добавить товар';
            this.modal.item = {
                id: performance.now(),
                title: '',
                description: '',
            };
            this.modal.isEdit = false;
            this.modal.open = true;
        },
        onEditService(item, index) {
            this.modal.item = item;
            this.modal.title =
                this.bundle === 'service' ? 'Редактировать услугу' : 'Редактировать товар';
            this.modal.isEdit = true;
            this.modal.itemIndex = index;
            this.modal.open = true;
        },
        onSaveItem(event) {
            if (this.modal.isEdit) {
                this.EDIT_SERVICE({
                    bundle: this.bundle,
                    listName: this.type,
                    service: event,
                    index: this.modal.itemIndex,
                });
            } else {
                this.ADD_SERVICE({
                    bundle: this.bundle,
                    listName: this.type,
                    service: event,
                });
            }
            this.modal.isEdit = null;
            this.modal.itemIndex = null;
        },
    },
};
</script>
<style lang="scss" scoped>
.services {
    border: 1px solid $color-info;
}
</style>
