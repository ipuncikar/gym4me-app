<template>
  <div class="row">
    <div class="col-8">
      <form @submit.prevent='dodajgym'>
        <div class="form-group">
          <label for="naziv">Naziv teretane</label>
          <input v-model="naziv" class="form-control" id="naziv" placeholder="Naziv teretane" />
        </div>

        <div class="form-group">
          <label for="adresa">Adresa teretane</label>
          <input v-model="adresa" class="form-control" id="adresa" placeholder="Adresa" />
        </div>

        <div class="form-group">
          <label for="zupanija">Županija</label>
          <select v-model="zupanija" class="form-select" id="zupanija" required>
            <option value="Bjelovarsko-bilogorska županija">Bjelovarsko-bilogorska županija</option>
            <option value="Brodsko-posavska županija">Brodsko-posavska županija</option>
            <option value="Dubrovačko-neretvanska županija">Dubrovačko-neretvanska županija</option>
            <option value="Istarska županija">Istarska županija</option>
            <option value="Karlovačka županija">Karlovačka županija</option>
            <option value="Koprivničko-križevačka županija">Koprivničko-križevačka županija</option>
            <option value="Krapinsko-zagorska županija">Krapinsko-zagorska županija</option>
            <option value="Ličko-senjska županija">Ličko-senjska županija</option>
            <option value="Međimurska županija">Međimurska županija</option>
            <option value="Osječko-baranjska županija">Osječko-baranjska županija</option>
            <option value="Požeško-slavonska županija">Požeško-slavonska županija</option>
            <option value="Primorsko-goranska županija">Primorsko-goranska županija</option>
            <option value="Šibensko-kninska županija">Šibensko-kninska županija</option>
            <option value="Sisačko-moslavačka županija">Sisačko-moslavačka županija</option>
            <option value="Splitsko-dalmatinska županija">Splitsko-dalmatinska županija</option>
            <option value="Varaždinska županija">Varaždinska županija</option>
            <option value="Virovitičko-podravska županija">Virovitičko-podravska županija</option>
            <option value="Vukovarsko-srijemska županija">Vukovarsko-srijemska županija</option>
            <option value="Zadarska županija">Zadarska županija</option>
            <option value="Zagrebačka županija">Zagrebačka županija</option>
          </select>
        </div>

        <div class="form-group">
          <label for="cijena">Cijena mjesečne članarine</label>
          <input v-model="cijena" class="form-control" id="cijena" placeholder="Cijena" />
        </div>

        <div class="form-group">
          <label for="kontakt">Kontakt</label>
          <input v-model="kontakt" class="form-control" id="kontakt" placeholder="Kontakt" />
        </div>

        <div class="form-group">
          <label for="email_adresa">Email adresa</label>
          <input v-model="email_adresa" class="form-control" id="email_adresa" placeholder="Email adresa" />
        </div>

        <div class="form-group">
          <label for="opis">Opis</label>
          <input v-model="opis" type="text" class="form-control ml-2" placeholder="Opis" id="opis" />
        </div>

        <div class="form-group">
          <label for="slika">Učitaj sliku...</label>
          <input type="file" @change="onFileChange" class="file-input" id="slika" />
        </div>

        <button type="submit" class="btn btn-danger ml-2">Dodaj teretanu</button>
      </form>
    </div>
  </div>
</template>

<script>
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from '@/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

export default {
  name: 'dodajgym',

  data() {
    return {
      naziv: '',
      adresa: '',
      zupanija: '',
      cijena: '',
      kontakt: '',
      email_adresa: '',
      opis: '',
      slika: null, 
      slikaURL: null, 
      user: null,
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
  },

  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      this.slika = file; 
      this.slikaURL = URL.createObjectURL(file); 
    },

    async dodajgym() {
      if (!this.user) {
        alert("Molimo prijavite se kako biste unijeli teretanu.");
        return;
      }

      try {
        const storage = getStorage();
        const storageRef = ref(storage, `teretane/${this.slika.name}`);
        await uploadBytes(storageRef, this.slika); 

        const downloadURL = await getDownloadURL(storageRef);

        const componentData = {
          naziv: this.naziv,
          adresa: this.adresa,
          zupanija: this.zupanija,
          cijena: this.cijena,
          kontakt: this.kontakt,
          email_adresa: this.email_adresa,
          opis: this.opis,
          slika: downloadURL, 
        };

        const docRef = await addDoc(collection(db, "teretane"), componentData);
        console.log("Teretana uspješno dodana s ID: ", docRef.id);
        alert("Teretana uspješno dodana!");

        this.naziv = '';
        this.adresa = '';
        this.zupanija = '';
        this.cijena = '';
        this.kontakt = '';
        this.slika = null;
        this.slikaURL = null; 
        this.email_adresa = '';
        this.opis = '';

      } catch (error) {
        console.error("Greška prilikom unosa teretane:", error);
        alert("Došlo je do pogreške pri unosu teretane.");
      }
    },
  },
};
</script>




