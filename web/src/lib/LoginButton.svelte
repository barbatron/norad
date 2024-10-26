<script lang="ts">
  import { createAccount, login } from "../auth";
  import path from "path";
  const emailInput = () =>
    document.getElementById("create-email")! as HTMLInputElement;
  const passwordInput = () =>
    document.getElementById("create-password")! as HTMLInputElement;
  const emailPassword = () => ({
    email: emailInput().value,
    password: passwordInput().value,
  });
  const create = async () => {
    const result = await createAccount(emailPassword());
    return result;
  };
  const loginEmailPassword = async () => {
    const session = await login(emailPassword());
    return session;
  };
</script>

<form on:submit={create}>
  <input id="create-email" type="email" />
  <input id="create-password" type="password" />
</form>
<button on:click={loginEmailPassword}>login</button>
