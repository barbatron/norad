<script lang="ts">
  import {createAccount, testLogin } from '../auth'
  const create = async () => {
    await createAccount({ email: document.getElementById('#create-email')!.innerText, password: document.getElementById('#create-password')!.innerText });
  }
  const login = async () => {
    const session = await testLogin({ email: document.getElementById('#create-email')!.innerText, password: document.getElementById('#create-password')!.innerText });
    // Go somewhere
  }
</script>

<form on:submit={create}>
  <input id="create-email" type="email" />
  <input id="create-password" type="password" />
</form>
<button on:click={login}>login</button>