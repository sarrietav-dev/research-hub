<template>
    <div id="app">
        <v-container>
            <v-layout>
                <div v-if="posts">
                    <v-data-table v-model:items-per-page="itemsPerPage">
                        :headers="headers"
                        :items="data"
                        item-value="userID"
                        class="elevation-1"
                    </v-data-table>
                </div>
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


<script>

    import getAllPosts from '../services/getAllPosts.js';
    
    export default{
        components:{
            VDataTable
        },
        setup(){
            
            const {posts, error, load} = getAllPosts()
            load()
            return {posts, error, load, itemsPerPage: 10, headers:[{
                title: 'Código',
                align: 'start',
                sortable: false,
                key: 'userID'
            },
            {
                title: 'Title',
                align: 'start',
                key: 'title'
            },
            {
                title: 'Body',
                align: 'start',
                key: 'body'
            },
        
        ],
        data: posts
            }
        }
    }

    
</script>
