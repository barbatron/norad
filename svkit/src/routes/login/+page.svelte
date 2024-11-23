<script lang="ts">
	import { account, ID } from '$lib/appwrite';
	import { OAuthProvider } from 'appwrite';
	import { resolveRoute } from '$app/paths';
	import { logger } from '$lib/observability';
	import { goto } from '$app/navigation';

	const console = logger('login page');

	const { data } = $props();
	console.log('login page data', data);
	const {
		account: { account: loggedInUser }
	} = data;

	console.log({ loggedInUser });

	async function login(email: string, password: string) {
		await account.createEmailPasswordSession(email, password);
		if (loggedInUser) goto('/norad');
	}

	async function register(email: string, password: string) {
		await account.create(ID.unique(), email, password);
		login(email, password);
	}

	function submitEmailPassword(e: any) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const type = e.submitter.dataset.type;
		const { email, password } = {
			email: formData.get('email')?.toString() ?? '',
			password: formData.get('password')?.toString() ?? ''
		};
		if (type === 'login') {
			login(email, password);
		} else if (type === 'register') {
			register(email, password);
		}
	}

	async function logout() {
		await account.deleteSession('current');
		goto('/');
	}

	const loginOauth = async () => {
		const noradPath = resolveRoute('/norad', {});
		const failPath = resolveRoute('/', {});
		const onSuccess = new URL(noradPath, location.origin).toString();
		const onFail = new URL(failPath, location.origin).toString();
		console.log('[login] Creating oauth2 session', { origin: location.origin, onSuccess, onFail });
		// Go to OAuth provider login page
		try {
			const someString = await account.createOAuth2Session(
				OAuthProvider.Google, // provider
				undefined, // onSuccess, // redirect here on success
				undefined, // onFail, // redirect here on failure
				['account', 'openid', 'https://www.googleapis.com/auth/userinfo.email'] // scopes (optional)
			);
			console.log('[login] Created session maybe? Trying to get current', { someString });
			const session = await account.getSession('current');
			if (session) {
				console.log('[login] Got session', session);
				// Provider information
				console.log(session.provider);
				console.log(session.providerUid);
				console.log(session.providerAccessToken);
			} else {
				console.log('[login] No session :(');
			}
		} catch (err) {
			console.error('[login] Error', err);
			if (err instanceof Error && err.name === 'AppwriteException') {
				console.error('[login] AppwriteException!');
			}
		}
	};
</script>

<p>
	{loggedInUser ? `Logged in as ${loggedInUser.name}` : 'Not logged in'}
</p>

<button onclick={loginOauth}>login using google</button>

<form onsubmit={submitEmailPassword}>
	<input type="email" placeholder="Email" name="email" required />
	<input type="password" placeholder="Password" name="password" required />

	<button type="submit" data-type="login">Login</button>
	<button type="submit" data-type="register">Register</button>
</form>

<button onclick={logout}>Logout</button>
