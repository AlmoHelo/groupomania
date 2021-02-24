
      <main id="formLog">
        <h2 class="id">Identifiez-vous</h2>
        <form method="POST" id="formulaireLog" @submit.prevent="envoie">
          <label for="email">E-mail ou nom d'utilisateur<span>*</span> :</label>
          <input
            id="emailLog"
            type="email"
            placeholder="groupomania@gmail.com"
            v-model="emailLog"
            required
          />
          <label for="password">Mot de passe<span>*</span> :</label>
          <input
            type="password"
            id="passwordLog"
            placeholder="*******"
            v-model="passwordLog"
            required
          />
          <div class="error-message">{{ message }}</div>
          <p class="champ">* : Champs obligatoires</p>
          <router-link
            to="/accueil"
            class="bouton"
            type="submit"
            >S'identifier</router-link
          ><small id="smallpass" class="text-danger"></small>
        </form>
        <p class="nouveau">
          Nouveau ?
          <button @click="signupPage2()" to="/signup" id="signupPage2">
            S'inscrire
          </button>
        </p>
      </main>