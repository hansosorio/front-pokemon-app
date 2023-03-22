<template>
  <div class="login">
    <h2 class="login-title text-center">Sign in to Pokemon App</h2>
    <form @submit.prevent="handleSubmit" class="login-form" novalidate>
      <div class="form-group">
        <label for="email">Email: </label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model.trim="email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password: </label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model.trim="password"
          required
        />
      </div>
      <div v-show="isError" class="invalid-feedback">
        Please enter a valid email address or password
      </div>
      <button type="submit" class="btn btn-primary">Sign In</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      isError: false,
    };
  },
  computed: {
    isEmailValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return this.email?.length >= 3 && emailRegex.test(this.email);
    },
    isPasswordValid() {
      console.log();
      return this.password?.length >= 3;
    },
    isFormValid() {
      return this.isEmailValid && this.isPasswordValid;
    },
  },
  methods: {
    handleSubmit() {
      if (this.isFormValid) {
        this.isError = false;
        localStorage.setItem(
          "authToken",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
        );
        this.$router.push("/pokemons");
      } else {
        this.isError = true;
      }
    },
  },
};
</script>

<style lang="scss">
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25em;

  &-title {
    margin: 0 0 1rem 0;
    text-transform: none;
  }

  &-form {
    margin-left: auto;
    margin-right: auto;
    padding: 1.5rem;
    background-color: $white;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    .invalid-feedback {
      display: block;
      color: red;
      margin-bottom: 1.25rem;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: flex-start;
      margin-bottom: 1.5rem;
      .form-control {
        width: 100%;
        height: 1.5rem;
        margin: 1rem auto;
      }
    }
  }
}
</style>
