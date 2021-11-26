<template>
  <div class="app-footer">
    <div class="footer-bottom d-flex flex-column flex-sm-row align-items-center">
      <span class="flex-grow-1" />
      <div class="d-flex align-items-center">
        <img
            class="logo"
            src="https://th.bing.com/th/id/R.5bf4c6f7326d88bf19b141238cd55ee6?rik=6DWSWRkwSMnKDQ&pid=ImgRaw&r=0"
            alt=""
        >
        <div>
          <p class="m-0">
            &copy; 2015-{{ new Date().getFullYear() }} <a href="https://farjan.dev/">CIS</a>
          </p>
          <p class="m-0">
            All rights reserved
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageFooter'
}
</script>

<style>
.app-footer {
  padding: 0.25rem 1.25rem;
}
</style>
