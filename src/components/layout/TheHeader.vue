<template>
    <div>
        <v-container v-if="showSlider" fluid class="pa-0 mb-2">
            <v-row align="center" no-gutters>
                <v-col cols="12">
                    <BSlider />
                </v-col>
            </v-row>
        </v-container>
        <BMenu class="" />
    </div>
</template>

<script>
import BSlider from '@/components/blocks/header/BSlider';
import BMenu from '@/components/blocks/header/BMenu';

export default {
    name: 'TheHeader',
    components: {
        BSlider,
        BMenu,
    },
    props: {
        showSlider: {
            type: Boolean,
            default: false,
        },
        // showSearch: {
        //     type: Boolean,
        //     default: false,
        // },
    },
    data() {
        return {};
    },
};
</script>

<style scoped lang="scss"></style>
