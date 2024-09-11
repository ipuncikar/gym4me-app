<template>
  <div>
    <div class="row">
      <div class="col">
        <h1 class="text-center mb-5">Prijava</h1>
      </div>
    </div>
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <form @submit.prevent="prijava">
          <div class="form-group">
            <label for="exampleInputEmail1">Email adresa</label>
            <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Unesite Email">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Lozinka</label>
            <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Lozinka">
          </div>
          <button type="submit" class="btn btn-danger">Potvrdi</button>
        </form>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async prijava() {
      const auth = getAuth();
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push('/'); 
      } catch (error) {
        console.error('Neispravna prijava', error);
        alert('Neispravna prijava');
      }
    },
  },
};
</script>

