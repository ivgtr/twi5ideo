<template>
  <div class="root relative grid items-center overflow-hidden bg-gray-800">
    <main class="main w-full h-full rounded flex items-center justify-center">
      <nuxt />
    </main>
  </div>
</template>

<style scoped>
.root {
  justify-items: center;
  width: 100%;
  min-height: 100vh;
}
/* stylelint-disable */
_::-webkit-full-page-media,
_:future,
:root .root {
  min-height: -webkit-fill-available;
}
/* stylelint-enable */
</style>
