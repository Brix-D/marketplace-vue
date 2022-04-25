<template>
    <ModalLayoutDefault v-model="modal" :title="title">
        <template #default>
            <v-text-field v-model="localItem.title" label="Название" outlined />
            <v-textarea v-model="localItem.description" label="Описание" outlined />
            <v-text-field v-model="localItem.price" label="Цена" outlined />
            <!--            <v-text-field v-model="localItem.category" label="Категория" outlined />-->
            <v-select
                v-model="localItem.categoryId"
                label="Категория"
                outlined
                :items="categorySuggestion"
            />
        </template>
        <template #footer>
            <v-btn
                depressed
                dark
                class="rounded-lg"
                :color="$vuetify.theme.currentTheme.info"
                :ripple="false"
                @click="onSubmit(localItem)"
            >
                Сохранить
            </v-btn>
        </template>
    </ModalLayoutDefault>
</template>

<script>
import ModalLayoutDefault from '@/components/blocks/modal/template/ModalLayoutDefault';
import { modalToggleMixin } from '@/mixins/modal';
import { copyObject } from '@/utils';
import { mapState } from 'vuex';

export default {
    name: 'AddService',
    components: {
        ModalLayoutDefault,
    },
    mixins: [modalToggleMixin],
    props: {
        title: {
            type: String,
            required: true,
        },
        item: {
            type: Object,
            default: () => ({}),
        },
        type: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            localItem: {},
        };
    },
    computed: {
        ...mapState({
            CATEGORIES: (state) => state.newServices.categories,
        }),
        categorySuggestion() {
            return this.CATEGORIES.map((category) => {
                return {
                    //id: category.categoryId,
                    text: category.name,
                    value: category.categoryId,
                };
            });
        },
    },
    created() {
        this.localItem = copyObject(this.item);
    },
    methods: {
        onSubmit(event) {
            this.$emit('save', event);
            this.modal = false;
        },
    },
};
</script>

<style scoped lang="scss"></style>
