<template>
  <div>
    <SearchBar @search="handleSearch" />
    
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-if="teretane.length">
      <div v-for="teretana in teretane" :key="teretana.id" class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img :src="teretana.slika || defaultImage" class="img-fluid rounded-start" alt="Slika">
          </div>
          <div class="col-md-8">
            <h5 class="card-title">{{ teretana.naziv }}</h5>
            <p class="card-text">Adresa: {{ teretana.adresa }}</p>
            <p class="card-text">Županija: {{ teretana.zupanija }}</p>
            <p class="card-text">Cijena: {{ teretana.cijena }}</p>
            <p class="card-text">Kontakt: {{ teretana.kontakt }}</p>
            <p class="card-text">Email: {{ teretana.email_adresa }}</p>
            <p class="card-text">Opis: {{ teretana.opis }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="searched">
      <p>No results found.</p>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
export default {
  components: {
    SearchBar
  },
  data() {
    return {
      teretane: [],
      error: '',
      defaultImage: 'path/to/default-image.jpg', 
      searched: false
    };
  },
  methods: {
    async handleSearch({ keyword, zupanija }) {
      this.error = ''; 
      this.teretane = []; 
      this.searched = true; 

      try {

        let q = collection(db, 'teretane');
        
        if (keyword && zupanija) {
          q = query(q, where('naziv', '>=', keyword), where('naziv', '<=', keyword + '\uf8ff'), where('zupanija', '==', zupanija));
        } else if (keyword) {
          q = query(q, where('naziv', '>=', keyword), where('naziv', '<=', keyword + '\uf8ff'));
        } else if (zupanija) {
          q = query(q, where('zupanija', '==', zupanija));
        }

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          this.teretane.push({
            id: doc.id,
            ...doc.data()
          });
        });

        if (this.teretane.length === 0) {
          this.error = 'No results found for your search.';
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        this.error = 'An error occurred while searching.';
      }
    }
  }
};
</script>

<style scoped>
.card {
  margin-bottom: 1rem;
}

.alert {
  color: red;
}

.img-fluid {
  max-width: 100%;
  height: auto;
}

.card-title {
  font-size: 1.25rem;
}

.card-text {
  font-size: 1rem;
}
</style>
