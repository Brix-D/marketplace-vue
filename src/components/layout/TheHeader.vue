<template>
    <div>
        <v-container fluid class="pa-0">
            <v-row align="center">
                <v-col cols="12">
                    <div class="header__slider" />
                </v-col>
            </v-row>
        </v-container>
        <v-app-bar flat :color="$vuetify.theme.currentTheme.primary" class="mt-2">
            <v-container fluid>
                <!--                <v-row align="center">-->
                <!--                    <v-col cols="3">-->
                <!--                        <NuxtLink :to="{ name: 'index' }">-->
                <!--                            <h1-->
                <!--                                :style="{ color: $vuetify.theme.currentTheme.info }"-->
                <!--                                class="text-h3 font-italic font-weight-bold"-->
                <!--                            >-->
                <!--                                Servey-->
                <!--                            </h1>-->
                <!--                        </NuxtLink>-->
                <!--                    </v-col>-->
                <!--                    <v-col cols="6">-->
                <!--                        <v-text-field-->
                <!--                            v-model="searchValue"-->
                <!--                            prepend-inner-icon="mdi-magnify"-->
                <!--                            hide-details-->
                <!--                            outlined-->
                <!--                            label="Найти..."-->
                <!--                            clearable-->
                <!--                            :color="$vuetify.theme.currentTheme.info"-->
                <!--                        />-->
                <!--                    </v-col>-->
                <!--                    <v-col cols="3">s</v-col>-->
                <!--                </v-row>-->
            </v-container>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    name: 'TheHeader',
    searchValue: '',
};
</script>

<style scoped lang="scss">
.header__slider {
    background-color: $color-secondary;
    min-height: 120px;
}
</style>
