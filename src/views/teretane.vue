<template>
  <div>
    <div v-for="teretana in teretane" :key="teretana.id" class="card mb-3" style="max-width: 1000px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img v-if="teretana.slika" :src="teretana.slika" class="img-fluid rounded-start" alt="Slika">
          <img v-else src="/path/to/default-image.jpg" class="img-fluid rounded-start" alt="Default Slika"> <!-- Alternativna slika ako nema URL -->
        </div>
        <div class="col-md-8">
          <h5 class="fw-bold">{{ teretana.naziv }}</h5>
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
</template>


<script>
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase"; 

export default {
  name: "teretane",
  data() {
    return {
      teretane: [], 
    };
  },
  mounted() {
    this.dohvatiteretane();
  },
  methods: {
    async dohvatiteretane() {
      this.teretane = []; 
      try {
        
        const querySnapshot = await getDocs(collection(db, "teretane"));
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          this.teretane.push({
            id: doc.id,
            naziv: data.naziv,
            adresa: data.adresa,
            zupanija: data.zupanija,
            cijena: data.cijena,
            kontakt: data.kontakt,
            slika: data.slika,
            email_adresa: data.email_adresa,
            opis: data.opis,
          });
        });
      } catch (error) {
        console.error("Greška prilikom dohvaćanja teretana:", error);
      }
    },
  },
}
</script>


<style scoped>
.card {
  margin-bottom: 30px;
}
</style>
