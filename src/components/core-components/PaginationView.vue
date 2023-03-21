<template>
  <div class="pagination">
    <button :disabled="isDisabledPreviousButton" @click="previousPage">
      Previous
    </button>
    <span>{{ currentPage + 1 }} of {{ totalPages }}</span>
    <button :disabled="isDisabledNextButton" @click="nextPage">Next</button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isDisabledPreviousButton() {
      return this.currentPage === 0;
    },
    isDisabledNextButton() {
      return this.currentPage + 1 === this.totalPages || this.totalPages === 0;
    },
  },
  methods: {
    previousPage() {
      this.$emit("previousPage");
    },
    nextPage() {
      this.$emit("nextPage");
    },
  },
};
</script>
<style lang="scss"></style>
