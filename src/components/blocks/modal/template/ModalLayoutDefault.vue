<template>
    <v-dialog
        v-model="modal"
        scrollable
        :width="width"
        :persistent="persistent"
        :transition="transition"
        :overlay-color="overlayColor"
        :overlay-opacity="overlayOpacity"
        :fullscreen="computedFullScreen"
        @click:outside="$emit('click:outside', $event)"
    >
        <v-card
            :tag="tag"
            :style="{ minHeight: minHeight + 'px' }"
            @submit.prevent="$emit('submit', $event)"
            @reset.prevent="$emit('reset', $event)"
        >
            <v-btn icon type="button" class="c-btn-close" @click="onClickCloseModal">
                <v-icon :color="$vuetify.theme.currentTheme.secondary"> mdi-close </v-icon>
            </v-btn>

            <!-- HEADER -->
            <v-card-title v-if="title">
                <span>{{ title }}</span>
            </v-card-title>

            <!-- BODY -->
            <v-card-text :class="[{ 'is-relative': loading }, bodyClass]">
                <slot />
            </v-card-text>

            <v-spacer v-if="!$vuetify.breakpoint.mobile && $slots.footer" />

            <!-- FOOTER -->
            <v-card-actions v-if="$slots.footer">
                <slot name="footer" />
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { modalToggleMixin, modalOverlayColorMixin } from '@/mixins/modal';
// const BBtnClose = () => import(/* webpackChunkName: "BlockLoader" */ '../../buttons/BtnClose');
// const BBlockLoader = () => import(/* webpackChunkName: "BlockLoader" */ '../../blocks/BlockLoader');

export default {
    name: 'BModalLayoutDefault',
    // components: { BBtnClose, BBlockLoader },
    mixins: [modalToggleMixin, modalOverlayColorMixin],
    props: {
        minHeight: {
            type: Number,
            default: 420,
        },
        tag: {
            type: String,
            default: 'form',
        },
        title: {
            type: String,
            default: '',
        },
        bodyClass: {
            type: String,
            default: '',
        },
        loading: {
            type: Boolean,
            default: false,
        },
        scrollable: {
            type: Boolean,
            default: true,
        },
        fullscreen: {
            type: Boolean,
            default: true,
        },
        transition: {
            type: String,
            default: 'slide-y-reverse-transition',
        },
        width: {
            type: [String, Number],
            default: '500',
        },
        persistent: {
            type: Boolean,
            default: false,
        },
        closeIsDisabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        computedFullScreen() {
            return this.fullscreen ? this.$vuetify.breakpoint.mobile : this.fullscreen;
        },
    },
    methods: {
        onClickCloseModal() {
            if (this.closeIsDisabled) {
                return false;
            }
            this.modal = false;
            this.$emit('click:close');
        },
    },
};
</script>

<style lang="scss" scoped>
.v-card {
    display: flex;
    flex-direction: column;

    &__title {
        position: relative;
        height: 60px;
        padding: 0 !important;

        & > span {
            width: 100%;
            max-width: 83%;
            margin: auto;
            font-size: 23px;
            font-weight: 300;
            line-height: 32px;
            text-align: center;
        }
    }

    &__text,
    &__actions {
        &:empty {
            min-height: auto;
            padding: 0;
        }
    }

    &__text {
        flex-grow: 1;
        padding: 24px !important;
        overflow-y: hidden;

        &.is-scrolled {
            overflow-y: auto;
        }

        &.is-relative {
            position: relative;
        }
    }

    &__actions {
        padding: 16px 24px;
    }
}

.c-btn-close {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
}
</style>
