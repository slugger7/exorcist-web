<script>
import { Router } from 'svelte-routing'
import Header from './Header.svelte';
import Routes from './routes/Routes.svelte';
import './app.css';
</script>

<Router url="/">
	  <Header />

    <Routes />
</Router>
