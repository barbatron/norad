<script lang="ts">
  import { currentSession } from "../auth";

  const session = currentSession()  
</script>

<main>
  <h1>{session.then(x => x?.providerUid )}</h1>

</main>