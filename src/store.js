import { reactive, ref } from "vue";
import { firebase } from "@/firebase";

const store = reactive({
        searchTerm: "",
        currentUser: ref(null),
        checkAuth() {
          return new Promise((resolve) => {
            firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                this.currentUser.value = user.email;
                resolve(true);
              } else {
                this.currentUser.value = null;
                resolve(false);
              }
            });
          });
        },
      });
      
      export default store;