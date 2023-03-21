<template>
  <div class="details">
    <button
      type="submit"
      class="details-btn btn btn-primary"
      @click="handleGoToHome"
    >
      <span class="mdi mdi-arrow-left mdi-18px"></span>
    </button>
    <h1 class="details-name">{{ pokemon?.name }}</h1>
    <div
      ref="container"
      class="details-image"
      :style="{
        '--image1': `url('${images[0]}')`,
        '--image2': `url('${images[1]}')`,
      }"
    ></div>
  </div>
</template>

<script>
import { fetchPokemonDetail } from "../../util/api";

export default {
  data() {
    return {
      currentImageIndex: 0,
      images: [0, 1].fill(
        `url('${require("./../../assets/pokemon-default.png")}')`
      ),
      pokemon: {},
    };
  },
  async created() {
    const name = this.$route.params.name;
    this.pokemon = await fetchPokemonDetail(name);
    this.images[0] = this.pokemon.sprites.front_default ?? this.images[0];
    this.images[1] = this.pokemon.sprites.back_default ?? this.images[1];

    const box = this.$refs.container;
    box.style.setProperty("--image1", `url('${this.images[0]}')`);
    box.style.setProperty("--image2", `url('${this.images[1]}')`);
  },
  methods: {
    handleGoToHome() {
      this.$router.push("/pokemons");
    },
  },
};
</script>

<style lang="scss" scoped>
.details {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25em;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: $white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  &-btn {
    margin-top: 1vh;
  }
  &-name {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  &-description {
    font-size: 16px;
    line-height: 1.5;
  }

  &-image {
    width: 200px;
    height: 200px;
    background-image: var(--image1), var(--image2);
    background-size: cover;
    margin: 20px auto;
    animation: fadeInOut 4s ease-in-out infinite;
  }
  @keyframes fadeInOut {
    0% {
      background-image: var(--image1);
      opacity: 1;
    }
    50% {
      background-image: var(--image2);
      opacity: 0.5;
    }
    100% {
      background-image: var(--image1);
      opacity: 1;
    }
  }
}
</style>
