<script>
import { Router } from 'svelte-routing'
import Header from './Header.svelte';
import Routes from './Routes.svelte';
import './app.css';
</script>

<Router url="/">
	  <Header />

	  <main>
		    <Routes />
	  </main>

	  <footer>

	  </footer>
</Router>
