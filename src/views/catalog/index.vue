<template>
    <!--    <div class="stub" />-->
    <div>
        <TheCatalog>
            <BServiceList :items="services" />
        </TheCatalog>
    </div>
</template>

<script>
import TheCatalog from '@/components/layout/TheCatalog';
import BServiceList from '@/components/blocks/catalog/BServiceList';
export default {
    name: 'CatalogPage',
    components: {
        TheCatalog,
        BServiceList,
    },
    data() {
        return {
            services: [
                {
                    id: 1,
                    alias: 'service_1',
                    title: 'Создание маркетплейса услуг',
                    category: 'Информационные технологии',
                    author: 'Дмитрий Шляхта',
                    price: 17000,
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam debitis fugiat nobis quo sequi voluptates.',
                },
                {
                    id: 2,
                    alias: 'service_2',
                    title: 'Создание маркетплейса услуг',
                    category: 'Информационные технологии',
                    author: 'Дмитрий Шляхта',
                    price: 17000,
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam debitis fugiat nobis quo sequi voluptates.',
                },
                {
                    id: 3,
                    alias: 'service_3',
                    title: 'Создание маркетплейса услуг',
                    category: 'Информационные технологии',
                    author: 'Дмитрий Шляхта',
                    price: 17000,
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam debitis fugiat nobis quo sequi voluptates.',
                },
                {
                    id: 4,
                    alias: 'service_4',
                    title: 'Создание маркетплейса услуг',
                    category: 'Информационные технологии',
                    author: 'Дмитрий Шляхта',
                    price: 17000,
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam debitis fugiat nobis quo sequi voluptates.',
                },
                {
                    id: 5,
                    alias: 'service_5',
                    title: 'Создание маркетплейса услуг',
                    category: 'Информационные технологии',
                    author: 'Дмитрий Шляхта',
                    price: 17000,
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam debitis fugiat nobis quo sequi voluptates.',
                },
                {
                    id: 6,
                    alias: 'service_6',
                    title: 'Создание маркетплейса услуг',
                    category: 'Информационные технологии',
                    author: 'Дмитрий Шляхта',
                    price: 17000,
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam debitis fugiat nobis quo sequi voluptates.',
                },
                {
                    id: 7,
                    alias: 'service_7',
                    title: 'Создание маркетплейса услуг',
                    category: 'Информационные технологии',
                    author: 'Дмитрий Шляхта',
                    price: 17000,
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam debitis fugiat nobis quo sequi voluptates.',
                },
                {
                    id: 8,
                    alias: 'service_8',
                    title: 'Создание маркетплейса услуг',
                    category: 'Информационные технологии',
                    author: 'Дмитрий Шляхта',
                    price: 17000,
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam debitis fugiat nobis quo sequi voluptates.',
                },
                {
                    id: 9,
                    alias: 'service_9',
                    title: 'Создание маркетплейса услуг',
                    category: 'Информационные технологии',
                    author: 'Дмитрий Шляхта',
                    price: 17000,
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam debitis fugiat nobis quo sequi voluptates.',
                },
                {
                    id: 10,
                    alias: 'service_10',
                    title: 'Создание маркетплейса услуг',
                    category: 'Информационные технологии',
                    author: 'Дмитрий Шляхта',
                    price: 17000,
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam debitis fugiat nobis quo sequi voluptates.',
                },
            ],
        };
    },
};
</script>

<style scoped lang="scss">
.stub {
    min-height: 1000px;
}
</style>
