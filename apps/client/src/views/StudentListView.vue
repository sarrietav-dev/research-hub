<template>
  <StudentList :items="dataList"></StudentList>
</template>

<script>
import axios from 'axios';
import StudentList from '../components/StudentList.vue';

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
    axios.get('http://localhost:3000/api/seed-groups/1/members')
      .then(response => {
        this.dataList = response.data.map(item => {
          return {
            period: item.period,
            name: item.member.name,
            role: item.role,
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
