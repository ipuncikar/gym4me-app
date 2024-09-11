<template>
  <div>
    <div class="about">
      <h1>Registracija</h1>
      <div class="container">
        <div class="row">
          <div class="col-sm"></div>
          <div class="col-sm">
            <form @submit.prevent="registracija">
              <div class="form-group">
                <label for="email">Email adresa</label>
                <input v-model="email" type="email" class="form-control" id="email" placeholder="Unesite email" />
              </div>
              <div class="form-group">
                <label for="password">Lozinka</label>
                <input v-model="password" type="password" class="form-control" id="password" placeholder="Unesite lozinku" />
              </div>
              <div class="form-group">
                <label for="password2">Ponovite lozinku</label>
                <input v-model="password2" type="password" class="form-control" id="password2" placeholder="Ponovite lozinku" />
              </div>
              <div class="form-group">
                <label for="ime">Ime</label>
                <input v-model="ime" type="text" class="form-control" id="ime" placeholder="Unesite ime" />
              </div>
              <div class="form-group">
                <label for="prezime">Prezime</label>
                <input v-model="prezime" type="text" class="form-control" id="prezime" placeholder="Unesite prezime" />
              </div>
              <button type="submit" class="btn btn-danger">Registracija</button>
            </form>
          </div>
          <div class="col-sm"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { doc, setDoc } from 'firebase/firestore';


export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const password2 = ref('');
    const ime = ref('');
    const prezime = ref('');
    const router = useRouter();

    const registracija = async () => {
      console.log("Funkcija registracija je pozvana");

      if (password.value !== password2.value) {
        alert('Lozinke se ne poklapaju!');
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const userId = userCredential.user.uid;

        console.log("Korisnik registriran:", userId); 

        await setDoc(doc(db, 'Korisnici', userId), {
          email: email.value,
          ime: ime.value,
          prezime: prezime.value,
        });

        console.log("Podaci spremljeni u Firestore"); 

        alert('Uspješna registracija');
        router.push('/prijava');
      } catch (error) {
        console.error('Neuspješna registracija', error);

        if (error.code === 'auth/email-already-in-use') {
          alert('Email adresa je već u upotrebi. Molimo pokušajte prijavu ili koristite drugi email.');
        } else {
          alert('Neuspješna registracija: ' + error.message);
        }
      }
    };

    return {
      email,
      password,
      password2,
      ime,
      prezime,
      registracija,
    };
  }
}
</script>
