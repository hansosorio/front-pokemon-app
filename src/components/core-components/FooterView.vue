<template>
  <div class="footer">
    <footer>
      <p>&copy; {{ currentYear }} Pokemon App</p>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style lang="scss">
.footer {
  background-color: $background-color-darkgray;
  color: $white;
  padding: 20px;
  text-align: center;
  position: absolute;
  bottom: 0px;
  width: 100%;
}
</style>
