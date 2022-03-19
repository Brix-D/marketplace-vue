<template>
    <v-carousel hide-delimiter-background delimiter-icon="mdi-minus" height="150">
        <v-carousel-item v-for="item in slides" :key="item.id">
            <div class="slider d-flex justify-center align-center">
                <h2 class="text-h3">{{ item.text }}</h2>
            </div>
        </v-carousel-item>
    </v-carousel>
</template>

<script>
export default {
    name: 'BSlider',
    data() {
        return {
            slides: [
                {
                    id: 1,
                    text: 'First slide',
                },
                {
                    id: 2,
                    text: 'Second slide',
                },
                {
                    id: 3,
                    text: 'Third slide',
                },
            ],
        };
    },
};
</script>

<style scoped lang="scss">
.slider {
    background-color: $color-secondary;
    min-height: 150px;
}
</style>
