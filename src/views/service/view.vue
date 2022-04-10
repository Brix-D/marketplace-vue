<template>
    <div>
        <!--        {{ $route.params.alias }}-->
        <!--        <router-link :to="{ name: 'serviceView', params: { alias: 'crop_sheep' } }">-->
        <!--            crop_sheep-->
        <!--        </router-link>-->
        <!--        <input v-model="service.title" type="text" />-->
        <v-container class="wrapper rounded-lg pa-4">
            <h1 class="text-h3">{{ service.title }}</h1>
            <h3 class="text-subtitle-1 mt-4 service__subtitle">{{ service.category }}</h3>
            <PicturesCarousel
                v-if="!!service.pictures.length"
                :items="service.pictures"
                class="mt-4"
            />
            <div class="mt-4 service__description text-body-1">{{ service.description }}</div>
            <div class="service__price text-h2">{{ numberToPrice(service.price) }}</div>
            <div class="d-flex justify-space-between mt-4">
                <p class="service__author text-caption">Автор объявления: {{ service.author }}</p>
                <p class="service__date text-caption">Объявление размещено: {{ service.date }}</p>
            </div>
        </v-container>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import PicturesCarousel from '@/components/blocks/service/PicturesCarousel';
import { numberToPrice } from '@/utils';

export default {
    name: 'ServiceView',
    components: { PicturesCarousel },
    computed: {
        ...mapState({
            service: (state) => state.activeService.item,
        }),
    },
    async created() {
        await this.GET_SERVICE({ alias: this.$route.params.alias });
    },
    methods: {
        numberToPrice,
        ...mapActions({
            GET_SERVICE: 'activeService/GET_SERVICE',
        }),
    },
    metaInfo() {
        return {
            title: `${this.$route.params.alias} | servey`,
        };
    },
};
</script>

<style scoped lang="scss">
//div {
//    color: #eea135;
//}
.service {
    &__subtitle {
        font-size: 1.5rem !important;
    }
    &__description {
        font-size: 1.3rem !important;
    }
    &__price {
    }
    &__author {
    }
    &__date {
    }
}
</style>
