<template>
    <div id="app">
        <v-container>
            <v-layout>
                <v-card height="80vh" min-width="30vw" class="overflow-auto">
                    <v-card-title primary-title class="headline font-weight-bold text-xs-center">{{name}}</v-card-title>
                    <v-card-subtitle  class="font-weight-bold subtile" v-for="(group, index) in seedGroup"
                        :key="group.research_group">
                        <template v-if="index === 0">Grupo de investigación:  {{ group.research_group }}</template>
                    </v-card-subtitle>
                    <v-card-subtitle class="subtitle" v-for="(group, index) in seedGroup"
                        :key="group.leader">
                        <template v-if="index === 0">Líder de semillero:  {{ group.leader }}</template>
                    </v-card-subtitle>
                        
                    <v-card-text >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim nulla aliquet porttitor lacus. Cursus eget nunc scelerisque viverra mauris in aliquam. Sit amet nulla facilisi morbi. Sed cras ornare arcu dui vivamus arcu felis bibendum ut. Suspendisse sed nisi lacus sed viverra tellus in hac. Eleifend mi in nulla posuere. Condimentum mattis pellentesque id nibh tortor id. Non curabitur gravida arcu ac. Ultricies tristique nulla aliquet enim. Tincidunt dui ut ornare lectus sit amet est placerat in. Vel pretium lectus quam id leo. Pulvinar etiam non quam lacus. Tortor consequat id porta nibh venenatis cras sed felis eget. Lacus sed viverra tellus in hac habitasse platea dictumst vestibulum. Leo in vitae turpis massa. 
                    </v-card-text >
                    <v-card-title primary-title>Integrantes</v-card-title>
                    <v-list-item
                        v-for="group in seedGroup"
                        :key="group.full_name"
                        :title="' - ' + group.full_name"
                        class="my-custom-list-item"
                    >

                    </v-list-item>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary">Download info</v-btn>
                    </v-card-actions>
                </v-card>
            </v-layout>
        </v-container>
    </div>
</template>

<style>
    .my-custom-list-item {
        margin-bottom: -20px;
    }
    .subtitle{
        height: auto;
        color: black;
    }
</style>


<script setup lang="ts">
    import { ref } from 'vue';
    import { useRoute } from 'vue-router'
    import { getSeedGroup } from '../lib/database.ts';
    import { onMounted } from 'vue';

    const seedGroup = ref()
    const route = useRoute()
    const name = ref(route.params.seed_group)
    const seedname = name.value
    onMounted(async () => {
        seedGroup.value = await getSeedGroup(seedname as string)
    })

    

    
</script>
