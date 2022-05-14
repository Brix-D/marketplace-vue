<template>
    <div>
        <BServiceTemplate>
            <template #sidebar>s</template>
        </BServiceTemplate>
    </div>
</template>

<script>
import BServiceTemplate from '@/components/blocks/service/BServiceTemplate';
export default {
    name: 'ServiceCreate',
    components: {
        BServiceTemplate,
    },
    metaInfo() {
        return {
            title: 'Добавить услугу | servey',
        };
    },
};
</script>

<style module lang="scss"></style>
