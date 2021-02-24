<button @click="signupPage()" to="/signup" id="signupPage">
        S'inscrire
      </button>

      <main id="formSignup">
        <h2 class="id">Inscrivez-vous</h2>
        <form method="post" action="/" @submit.prevent="envoieSign">
          <label for="email">E-mail ou nom d'utilisateur<span>*</span> :</label
          ><input
            id="email"
            type="email"
            placeholder="groupomania@gmail.com"
            v-model="emailSign"
          />
          <label for="password" maxlength="8"
            >Mot de passe<span>*</span> :</label
          ><input
            type="password"
            name="pass"
            id="Mot de passe"
            v-model="passwordSign"
            placeholder="*******  (max 8 caractères)"
          />
          <label for="password" maxlength="8"
            >Confirmation du mot de passe<span>*</span> :</label
          ><input
            type="password"
            name="pass"
            id="Mot de passe2"
            v-on:blur="verif"
            v-model="passwordSign2"
            placeholder="*******  (max 8 caractères)"
          />
          <label for="pseudo" maxlength="8"
            >Nom d'utilisateur<span>*</span> :</label
          ><input
            type="name"
            name="name"
            id="pseudo"
            v-model="pseudoSign"
            placeholder="Groupo  (max 8 caractères)"
          />
          <label for="Biographie">Biographie :</label
          ><textarea
            type="text"
            name="biographie"
            id="biographie"
            v-model="biographieSign"
          />
        </form>
        <p class="champ">* : Champs obligatoires</p>
        <router-link to="/accueil" class="bouton">S'inscrire</router-link>
      </main>
    </ul>