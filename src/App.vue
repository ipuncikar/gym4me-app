<template>
  <div id="app">
    <nav id="nav" class="navbar navbar-expand-lg navbar-dark">
      <a class="navbar-brand" href="#">
        <img src="@/assets/logo..png" height="100" class="d-inline-block align-top" alt="" loading="lazy"/>
      </a> 
      <button
        class="navbar-toggler" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarToggler" 
        aria-controls="navbarToggler" 
        aria-expanded="false" 
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarToggler">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          
          <li v-if="!isAuthenticated" class="nav-item">
            <router-link to="/prijava" class="nav-link">Prijava</router-link>
          </li>
          <li v-if="!isAuthenticated" class="nav-item">
            <router-link to="/registracija" class="nav-link">Registracija</router-link>
          </li>
          
          
          <li v-if="isAuthenticated" class="nav-item">
            <router-link to="/" class="nav-link">Teretane</router-link>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <router-link to="/dodajgym" class="nav-link">Dodaj teretanu</router-link>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <router-link to="/pretrazigym" class="nav-link">Pretraži teretanu</router-link>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <a @click.prevent="odjava" class="nav-link">Odjava</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import router from '@/router';

export default {
  name: "App",
  data() {
    return {
      isAuthenticated: false
    };
  },
  mounted() {
    this.checkAuthStatus();
  },
  methods: {
    checkAuthStatus() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        this.isAuthenticated = !!user;
        if (!user) {
          router.push('/prijava'); 
        }
      });
    },
    odjava() {
      const auth = getAuth();
      auth.signOut()
        .then(() => {
          console.log("Korisnik je odjavljen");
          this.isAuthenticated = false; 
          router.push('/prijava'); 
        })
        .catch((error) => {
          console.error("Dogodila se pogreška", error);
        });
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0b0a0a;
  background-size: 100%;
  
}


nav {
  padding: 30px;
  background-color: black;
  font-size: 18px;
  

  a {
    font-weight: bold;
    color: #9f0d0d;

    &.router-link-exact-active {
      color: #de0b0b;
    }
  }
}  
</style>

