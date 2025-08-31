<script setup lang="ts">
  import { ref } from 'vue';

  import Swal from 'sweetalert2';

  import Logo from '~/components/svg/Logo.vue';

  const email = ref('');
  const password = ref('');
  const loading = ref(false);
  const errorMsg = ref('');


  const submitForm = async () => {
    errorMsg.value = '';
    loading.value = true;
    try {
      const response = await $fetch('/api/user', {
        method: 'POST',
        body: {
          email: email.value,
          password: password.value,
        },
      })
      const { isConfirmed } = await Swal.fire({
        icon: 'success',
        title: 'Registration successful',
        text: 'You have been registered successfully!',
        confirmButtonText: 'Close',
      });

      if (isConfirmed) {
        navigateTo('/');
      }
    } catch (error: any) {
      console.log(error.response?.data?.message);
      errorMsg.value = error?.response?.data?.message || error?.message || 'Request failed';
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMsg.value,
        confirmButtonText: 'Close',
      });
    } finally {
      loading.value = false;
    }
  }
</script>

<template>
  <div class="register">
    <div class="register__logo">
      <Logo width="50" height="50" />
      <span>Duck-note</span>
    </div>
    <article class="register__title">
      <h1>Sign up for a free account</h1>
      <p>Already have an account? <a href="/login">Log in</a></p>
    </article>
    <form class="register__form" @submit.prevent="submitForm">
      <div class="register__form_item">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" v-model="email" required>
      </div>
      <div class="register__form_item">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" v-model="password" required>
      </div>
      <button class="register__form_submit" type="submit">Sign up</button>
    </form>
  </div>
</template>


<style scoped>
  .register {
    display: flex;
    flex-direction: column;
    max-width: 450px;
    margin: 140px auto;

    .register__logo {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      >span {
        margin-left: 0.5rem;
        font-size: 1.5rem;
      }
    }

    .register__title {
      margin-bottom: 1rem;

      >h1 {
        font-size: 2rem;
        margin-bottom: 0.5rem;
      }

      >p {
        font-size: 1rem;

        a {
          color: orangered;
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }

    .register__form {
      width: 100%;

      .register__form_item {
        margin-bottom: 1rem;
        width: 100%;

        >label {
          display: block;
          margin-bottom: 0.5rem;
        }

        >input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 10px;
        }
      }

      .register__form_submit {
        width: 100%;
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 20px;
        background-color: orangered;
        color: white;
        cursor: pointer;
        text-align: center;
        transition: all 0.6s ease;

        &:hover {
          background-color: red;
          transform: scale3d(1, 1, 1);
          transition: all 0.4s ease;
        }

        &:active {
          transform: scale3d(0.8, 0.8, 1);
          transition: all 0.6s ease;
        }

      }

    }
  }
</style>