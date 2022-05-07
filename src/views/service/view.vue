<template>
    <div>
        <v-container class="wrapper rounded-lg pa-4 d-flex flex-column service">
            <div v-if="!loading" class="d-flex flex-column flex-grow-1">
                <h1
                    :class="{
                        'text-h3': !$vuetify.breakpoint.mobile,
                        'text-h4': $vuetify.breakpoint.mobile,
                    }"
                >
                    {{ service.title }}
                </h1>
                <v-img
                    :src="photoSource"
                    :alt="service.title"
                    :width="$vuetify.breakpoint.mobile ? '100%' : '80%'"
                    class="flex-shrink-0 mt-4"
                    :class="{
                        'mx-auto': !$vuetify.breakpoint.mobile,
                    }"
                    max-height="400px"
                    cover
                />
                <h3 class="text-subtitle-1 mt-4 service__subtitle">{{ service.category }}</h3>
                <h3 class="text-subtitle-1 mt-4 service__subtitle">{{ service.type }}</h3>
                <!--            <PicturesCarousel-->
                <!--                v-if="!!service.pictures.length"-->
                <!--                :items="service.pictures"-->
                <!--                class="mt-4"-->
                <!--            />-->
                <div class="mt-4 service__description text-body-1">{{ service.description }}</div>
                <div class="service__price mt-auto">
                    <span class="service__price-caption text-subtitle-1">Стоимость:&nbsp;</span>
                    <span class="text-h3 service__price-value">
                        {{ numberToPrice(service.price) }}
                    </span>
                </div>
                <!--            <div-->
                <!--                class="d-flex justify-space-between mt-4"-->
                <!--                :class="{ 'flex-column': $vuetify.breakpoint.mobile }"-->
                <!--            >-->
                <!--                <p class="service__author text-caption">Автор объявления: {{ service.author }}</p>-->
                <!--                <p class="service__date text-caption">Объявление размещено: {{ service.date }}</p>-->
                <!--            </div>-->
                <div class="mt-4 d-flex justify-center">
                    <div class="service__buttons">
                        <v-btn
                            v-if="service.isOffer"
                            :color="$vuetify.theme.currentTheme.info"
                            :dark="LOGGED"
                            large
                            depressed
                            class="rounded-lg"
                            :class="{
                                'px-10 service__button': !$vuetify.breakpoint.mobile,
                            }"
                            :block="$vuetify.breakpoint.mobile"
                            :disabled="!LOGGED"
                            @click="saveOrder('offer')"
                        >
                            Заказать
                        </v-btn>
                        <v-btn
                            v-if="service.isDemand"
                            :color="$vuetify.theme.currentTheme.info"
                            :dark="LOGGED"
                            large
                            depressed
                            class="rounded-lg"
                            :class="{
                                'px-10 service__button': !$vuetify.breakpoint.mobile,
                            }"
                            :block="$vuetify.breakpoint.mobile"
                            :disabled="!LOGGED"
                            @click="saveOrder('demand')"
                        >
                            Откликнутся на потребность
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
//import PicturesCarousel from '@/components/blocks/service/PicturesCarousel';
import { numberToPrice } from '@/utils';

export default {
    name: 'ServiceView',
    //components: { PicturesCarousel },
    computed: {
        ...mapState({
            service: (state) => state.activeService.item,
            loading: (state) => state.activeService.loading,
        }),
        ...mapGetters({
            LOGGED: 'users/LOGGED',
        }),
        photoSource() {
            return process.env.VUE_APP_BASE_API_URI + this.service.photo;
        },
    },
    async created() {
        await this.GET_SERVICE({
            id: this.$route.params.id,
            contactId: this.$route.params.contactId,
        });
    },
    methods: {
        numberToPrice,
        ...mapActions({
            GET_SERVICE: 'activeService/GET_SERVICE',
            SAVE_ORDER: 'activeService/SAVE_ORDER',
            SAVE_ORDER_ITEM: 'activeService/SAVE_ORDER_ITEM',
        }),
        async saveOrder(type) {
            if (this.LOGGED) {
                const orderItemId = await this.SAVE_ORDER_ITEM();
                await this.SAVE_ORDER({ type, orderItemId });
                this.messageSuccess('Успешно сохранено');
                await this.$router.back();
            }
        },
    },
    metaInfo() {
        return {
            title: `${this.service.title} | servey`,
            meta: [
                {
                    vmid: 'description',
                    name: 'description',
                    content: this.service.description,
                },
            ],
        };
    },
};
</script>

<style scoped lang="scss">
//div {
//    color: #eea135;
//}
.service {
    min-height: calc(100vh - 124px);
    &__subtitle {
        font-size: 1.5rem !important;
    }
    &__description {
        font-size: 1.3rem !important;
    }
    &__price {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
    }
    &__price-caption {
        font-size: 1.4rem !important;
    }
    &__price-value {
    }
    &__author {
    }
    &__date {
    }
    &__buttons {
        display: grid;
        row-gap: 16px;
    }
    &__button {
        //font-size: 1.2rem !important;
    }
}
</style>
