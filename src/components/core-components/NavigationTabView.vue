<template>
  <nav class="navigation" ref="navigationBar">
    <a class="navigation-home" @click="handleGoToHome">
      <span class="mdi mdi-home mdi-24px"></span>
      Home
    </a>
    <form class="navigation-search">
      <span>Type a pokemon: </span>
      <div>
        <input
          class="form-control"
          type="search"
          placeholder="bulbasaur"
          aria-label="Search a pokemon"
          aria-required="true"
          ref="inputSearch"
          v-model="searchPokemon"
          @input="debouncedSearch"
          @focus="onFocus"
        />
        <ul v-show="!computedHideSuggestions" class="float-list">
          <li
            v-for="suggestion in filteredSuggestions"
            :key="suggestion"
            class="suggestion-item"
            @click="onHit(suggestion)"
          >
            {{ suggestion }}
          </li>
        </ul>
      </div>
    </form>
    <button class="navigation-logout" type="submit" @click="handleLogout">
      <span class="mdi mdi-logout mdi-18px"></span>
      Sign out
    </button>
  </nav>
</template>

<script>
import { namesOfPokemons } from "../../util/module.js";
export default {
  props: {
    hideSuggestionList: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      filteredSuggestions: [],
      searchPokemon: "",
      hideSuggestions: false,
      suggestions: namesOfPokemons,
    };
  },
  computed: {
    computedHideSuggestions() {
      return this.hideSuggestions;
    },
  },
  watch: {
    hideSuggestionList() {
      this.hideSuggestions = true;
    },
  },
  mounted() {
    this.$refs.navigationBar.addEventListener("click", this.onFocusOut);
  },
  methods: {
    debouncedSearch: function () {
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(this.setFilteredSuggestions, 500);
    },
    handleGoToHome() {
      this.$router.push("/pokemons");
    },
    handleLogout() {
      localStorage.removeItem("authToken");
      this.$router.push("/login");
    },
    onFocusOut(event) {
      if (
        event.target.className !== "suggestion-item" &&
        event.target.className !== "form-control"
      ) {
        this.hideSuggestions = true;
      }
    },
    onFocus() {
      this.hideSuggestions = false;
    },
    onHit(suggestion) {
      this.$router.push(`/pokemon/${suggestion}`);
    },
    setFilteredSuggestions() {
      this.filteredSuggestions = this.suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(this.searchPokemon.toLowerCase())
      );
    },
  },
};
</script>

<style lang="scss">
.navigation {
  width: 98%;
  padding-left: 2vw;
  padding-bottom: 2vh;
  display: flex;
  flex-flow: row wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: $background-color-darkgray;
  color: $white;
  font-size: 1.5vw;

  &-home {
    color: $white;
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  &-search {
    display: flex;
    flex-direction: row;
    align-items: center;

    .form-control {
      width: 15rem;
      height: 3vh;
      font-size: 1vw;
      margin-left: 0.5rem;
      border-width: 1px;
      border-color: $border-color;
      padding-left: 0.5vw;
    }
    .float-list {
      color: $black;
      list-style: none;
      margin: 0 0 0 0.5rem;
      position: absolute;
      width: 15rem;
      max-height: 200px;
      overflow-y: auto;
      background-color: $white;
      border-radius: 4px;
      border: 1px solid #ccc;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      z-index: 2;
      text-align: start;
      padding-inline-start: 0px;

      .suggestion-item {
        padding: 8px 16px;
        font-size: 16px;
        text-align: start;
        cursor: pointer;
      }
      .suggestion-item:hover,
      .suggestion-item.active {
        background-color: #f2f2f2;
      }
    }
  }
  &-logout {
    height: 100%;
    border-radius: 6px;
    color: $black;
    background-color: $white;
    border-style: solid;
    border-width: thin;
    display: flex;
    align-items: center;
    font-size: 1vw;
    margin-right: 2vw;
  }
}
</style>
