<template>
  <div class="card text-bg-danger mb-3" style="max-width: 18rem;">
    <img :src="teretane.slika" class="card-img-top" alt="Naziv teretane" />
    <div class="card-body">
      <h5 class="card-title">{{ teretane.naziv }}</h5>
      <p class="card-text">
        Adresa: {{ teretane.adresa }}<br />
        Županija: {{ teretane.zupanija }}<br />
        Cijena: {{ teretane.cijena }}<br />
        Kontakt: {{ teretane.kontakt }}<br />
        Slika: {{ teretane.slika }}<br />
        Email adresa: {{ teretane.email_adresa }}<br />
        Opis: {{ teretane.opis }}<br />
      </p>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "Teretane",
  props: {
    teretane: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>