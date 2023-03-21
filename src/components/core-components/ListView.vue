<template>
  <div class="list">
    <div ref="scrollableContent" class="list-wrapper" @scroll="onScroll">
      <div class="list-wrapper-card" v-for="item in listItems" :key="item.id">
        <a class="list-wrapper-card-link" @click="goToDetails(item.name)">
          <img
            class="image"
            :src="item.imgUrl"
            :alt="item.name"
            v-on:error="loadDefaultImage"
          />
          <div class="name">{{ item.name }}</div>
        </a>
        <div @click="handleLike(item)">
          <span
            v-if="likesByUser.has(Number(item.id))"
            class="mdi mdi-heart"
            style="color: red"
          ></span>
          <span v-else class="mdi mdi-heart-outline" style="color: red"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchPokemons } from "../../util/api";
import { getLikesByUser, setLikeByUser } from "../../util/firebase";

export default {
  data() {
    return {
      currentPage: 0,
      defaultImageSrc: require("../../assets/pokemon-default.png"),
      itemsPerPage: 20,
      likesByUser: new Set(),
      listItems: [],
      totalPages: 0,
    };
  },
  async created() {
    this.getPokemons();
    const likes = await getLikesByUser("hansosorio");
    this.likesByUser = new Set([...likes[0].likes]);
  },
  methods: {
    async getPokemons() {
      const pokemons = await fetchPokemons({
        currentPage: this.currentPage,
        itemsPerPage: this.itemsPerPage,
      });
      this.listItems = this.listItems.concat(pokemons.results);
      this.updateTotalpages(pokemons.count);
    },
    goToDetails(name) {
      const routeData = this.$router.resolve({
        name: "DetailsPage",
        params: { name },
      });
      window.open(routeData.href, "_blank");
    },
    async handleLike(item) {
      const newId = Number(item.id);
      if (this.likesByUser.has(newId)) {
        this.likesByUser.delete(newId);
      } else {
        this.likesByUser.add(Number(item.id));
      }
      await setLikeByUser([...this.likesByUser]);
    },
    loadDefaultImage(event) {
      event.target.src = this.defaultImageSrc;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
        this.getPokemons();
      }
    },
    onScroll() {
      const el = this.$refs.scrollableContent;
      if (el.scrollTop + el.offsetHeight >= el.scrollHeight && !this.loading) {
        this.nextPage();
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
        this.getPokemons();
      }
    },
    updateTotalpages(total) {
      this.totalPages = Math.ceil(total / this.itemsPerPage);
    },
    verifyLike(id) {
      return this.likesByUser.has(Number(id));
    },
  },
};
</script>
<style lang="scss">
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  list-style: none;
  &-wrapper {
    list-style: none;
    margin-top: 1vh;
    padding: 0;
    max-width: 75%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: row;
    max-height: 60vh;
    overflow-y: scroll;

    &-card {
      box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px,
        rgba(0, 0, 0, 0.117647) 0px 1px 4px;
      margin: 12px;
      width: 12vw;
      height: 100%;
      transition: 0.15s all ease-in-out;
      &:hover {
        transform: scale(1.1);
      }

      &-link {
        cursor: pointer;
        .image {
          object-fit: cover;
          border-radius: 50%;
        }
        .name {
          margin-top: 10px;
          font-size: 1.1rem;
          font-weight: bold;
          color: #333;
        }
      }
    }
  }
}
</style>
