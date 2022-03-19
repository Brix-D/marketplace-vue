<template>
    <div>
        <v-container v-if="showSlider" fluid class="pa-0">
            <v-row align="center">
                <v-col cols="12">
                    <BSlider />
                </v-col>
            </v-row>
        </v-container>
        <BMenu class="mt-2" />
        <v-container v-if="showSearch" fluid class="py-2 mt-2 search">
            <BSearch />
        </v-container>
    </div>
</template>

<script>
import BSlider from '@/components/blocks/BSlider';
import BMenu from '@/components/blocks/BMenu';
import BSearch from '@/components/blocks/BSearch';
export default {
    name: 'TheHeader',
    components: {
        BSlider,
        BMenu,
        BSearch,
    },
    props: {
        showSlider: {
            type: Boolean,
            default: false,
        },
        showSearch: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {};
    },
};
</script>

<style scoped lang="scss">
.search {
    background-color: $color-secondary-light;
}
</style>
