<template>
    <div>
        <v-row>
            <v-col v-for="([key, value], index) in Object.entries(colors)" :key="index" cols="3">
                <div>
                    <h3 class="text-h3">{{ key }}</h3>
                    <div class="square" :style="{ backgroundColor: value }" />
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="3">
                <!--                $vuetify.theme.dark
                            ? $vuetify.theme.currentTheme.info
                            : $vuetify.theme.currentTheme.backgroundSecondary

                            class="text--white"-->
                <v-btn :color="$vuetify.theme.currentTheme.info" dark @click="changeTheme">
                    Сменить тему
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'TestColors',
    computed: {
        colors() {
            return this.$vuetify.theme.currentTheme;
        },
    },
    methods: {
        changeTheme() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        },
    },
};
</script>

<style scoped lang="scss">
.square {
    width: 100%;
    height: 100px;
}
</style>
