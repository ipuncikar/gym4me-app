<template>
  <div>
    <div class="form-group">
      <label for="filter-zupanija">Filtriraj po županiji</label>
      <select v-model="selectedZupanija" id="filter-zupanija" class="form-select">
        <option value="">Sve županije</option>
        <option v-for="zupanija in zupanije" :key="zupanija" :value="zupanija">
          {{ zupanija }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="search-keyword">Pretraži po ključnoj riječi</label>
      <input v-model="keyword" @input="resetResults" id="search-keyword" type="text" class="form-control" placeholder="Unesite ključnu riječ">
    </div>

    <button @click="pokreniPretragu" class="btn btn-danger">Pretraži</button>

    <div v-if="prikaziObavijest" class="alert alert-danger" role="alert">
      Nema teretana koje odgovaraju vašem pretraživanju.
    </div>

    <div v-if="prikaziRezultate" v-for="teretana in filtriraneTeretane" :key="teretana.id" class="card mb-3" style="max-width: 540px;">
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
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase"; 

export default {
  name: "PretragaTeretana",
  data() {
    return {
      teretane: [], 
      zupanije: [
        "Bjelovarsko-bilogorska županija",
        "Brodsko-posavska županija",
        "Dubrovačko-neretvanska županija",
        "Istarska županija",
        "Karlovačka županija",
        "Koprivničko-križevačka županija",
        "Krapinsko-zagorska županija",
        "Ličko-senjska županija",
        "Međimurska županija",
        "Osječko-baranjska županija",
        "Požeško-slavonska županija",
        "Primorsko-goranska županija",
        "Šibensko-kninska županija",
        "Sisačko-moslavačka županija",
        "Splitsko-dalmatinska županija",
        "Varaždinska županija",
        "Virovitičko-podravska županija",
        "Vukovarsko-srijemska županija",
        "Zadarska županija",
        "Zagrebačka županija",
      ],
      selectedZupanija: "", 
      keyword: "", 
      prikaziRezultate: false, 
      prikaziObavijest: false, 
      defaultImage: '/path/to/default-image.jpg', 
    };
  },
  computed: {
    filtriraneTeretane() {
      return this.teretane.filter((teretana) => {
        const matchesZupanija = this.selectedZupanija === "" || teretana.zupanija === this.selectedZupanija;
        const matchesKeyword = this.keyword === "" || 
          teretana.naziv.toLowerCase().includes(this.keyword.toLowerCase()) ||
          teretana.opis.toLowerCase().includes(this.keyword.toLowerCase()) ||
          teretana.adresa.toLowerCase().includes(this.keyword.toLowerCase());
        return matchesZupanija && matchesKeyword;
      });
    },
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
    resetResults() {
      this.prikaziRezultate = false; 
      this.prikaziObavijest = false; 
    },
    async pokreniPretragu() {
      await this.dohvatiteretane();
      this.prikaziRezultate = this.filtriraneTeretane.length > 0; 
      this.prikaziObavijest = this.filtriraneTeretane.length === 0; 
    },
  },
};
</script>
