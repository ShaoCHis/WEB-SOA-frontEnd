<template>

</template>

<script>

export default {
  name: 'index',
  middleware({ store, route, redirect, params, query, req, res }) {
    redirect('/Main') // 默认跳转页面的路由
  },
};
</script>