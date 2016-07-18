<template lang="jade">
  select(class="form-control" v-model="education")
    option(v-for="item in educations" value="{{item.value}}") {{item.name}}
</template>


<script>

export default {
  props: ['education'],

  data () {
    retrun {
      educations: []
    }
  },
  methods: {

  },
  created() {

    // 初始化获取数据
    Refcd.all('education').then(function(data) {
      this.educations = data.map(function(item) {
        return {
          name: item.alias,
          value: item.name
        }
      })
    })
  }
}
</script>
