<template>
    <ModalLayoutDefault v-model="modal" :title="title"> s </ModalLayoutDefault>
</template>

<script>
import ModalLayoutDefault from '@/components/blocks/modal/template/ModalLayoutDefault';
import { modalToggleMixin } from '@/mixins/modal';
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
};
</script>

<style scoped lang="scss"></style>
