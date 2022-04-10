<template>
    <div class="pictures d-flex flex-column align-center">
        <div
            :class="{
                'active-picture': !$vuetify.breakpoint.mobile,
                'active-picture--mobile': $vuetify.breakpoint.mobile,
            }"
        >
            <v-img
                :src="items[active].path"
                :alt="items[active].name"
                :height="!$vuetify.breakpoint.mobile ? '400px' : '200px'"
                max-height="100%"
                class="rounded-lg"
            />
        </div>
        <div class="pictures__slider mt-4">
            <v-slide-group v-model="active" show-arrows="desktop" center-active>
                <v-slide-item
                    v-for="picture in items"
                    :key="picture.id"
                    #default="{ active: activeSlide, toggle }"
                    :class="{
                        'mx-4': !$vuetify.breakpoint.mobile,
                        'mx-2': $vuetify.breakpoint.mobile,
                    }"
                >
                    <v-img
                        :src="picture.path"
                        :alt="picture.name"
                        class="rounded-lg"
                        :class="{ 'slider__picture--active': activeSlide }"
                        width="100px"
                        height="auto"
                        max-height="100px"
                        contain
                        @click="toggle"
                    />
                </v-slide-item>
            </v-slide-group>
        </div>
    </div>
</template>
<script>
export default {
    name: 'PicturesCarousel',
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            active: 0,
        };
    },
};
</script>

<style lang="scss" scoped>
.pictures {
    &__slider {
        width: 100%;
    }
}
.active-picture {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 800px;
    &--mobile {
        width: 100%;
        max-height: 200px;
    }
}
.slider {
    &__picture {
        &--active {
            border: 2px $color-info solid;
        }
    }
}
</style>
