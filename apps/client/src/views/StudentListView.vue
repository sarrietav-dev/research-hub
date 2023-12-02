<template>
  <StudentList :items="dataList"></StudentList>
</template>

<script lang="js">
import axios from 'axios';
import StudentList from '../components/StudentList.vue';
import baseUrl from '../lib/baseUrl'

export default {
  data() {
    return {
      search: '',
      dataList: [],
    };
  },
  components: {
    StudentList,
  },
  mounted() {
    axios.get(`${baseUrl}/api/seed-groups/1/members`)
      .then(response => {
        this.dataList = response.data.map(item => {
          return {
            id: item.id,
            name: item.member.name,
            role: item.role,
            period: item.period,
            isActive: item.isActive,
            identityCard: item.member.identityCard,
            institutionalCode: item.member.institutionalCode,
            email: item.member.email,
            functions: item.functions.join(', '),
          };
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
};
</script>
