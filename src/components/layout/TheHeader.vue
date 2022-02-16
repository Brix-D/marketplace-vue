<template>
    <div>
        <v-container fluid class="pa-0">
            <v-row align="center">
                <v-col cols="12">
                    <BSlider />
                </v-col>
            </v-row>
        </v-container>
        <BMenu class="mt-2" />
        <v-container fluid class="py-2 mt-2">
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
    data() {
        return {};
    },
};
</script>

<style scoped lang="scss"></style>
