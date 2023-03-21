<template>
  <div class="home">
    <div ref="headerComponent"><header-component /></div>
    <navigation-tab-view :hide-suggestion-list="computedHideSuggestionList" />
    <div ref="listComponent"><list-component /></div>
    <div ref="footerComponent"><footer-component /></div>
  </div>
</template>

<script>
import HeaderComponent from "../core-components/HeaderView.vue";
import NavigationTabView from "../core-components/NavigationTabView.vue";
import ListComponent from "../core-components/ListView.vue";
import FooterComponent from "./../core-components/FooterView.vue";

export default {
  components: {
    HeaderComponent,
    NavigationTabView,
    ListComponent,
    FooterComponent,
  },
  data() {
    return {
      clickOutsideNavigationBar: 0,
    };
  },
  computed: {
    computedHideSuggestionList() {
      return this.clickOutsideNavigationBar;
    },
  },
  mounted() {
    this.$refs.headerComponent.addEventListener("click", this.onFocusOut);
    this.$refs.listComponent.addEventListener("click", this.onFocusOut);
    this.$refs.footerComponent.addEventListener("click", this.onFocusOut);
  },
  methods: {
    onFocusOut(event) {
      this.clickOutsideNavigationBar = event.timeStamp;
    },
  },
};
</script>
