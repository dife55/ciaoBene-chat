<template>
	<div class="container mt-5" id="container-signup">
		<h3 class="mb-5" id="headline">Register a new user to start chatting!</h3>

		<button class="btn mb-3 p-3 rounded-pill" id="register-button" @click="login"><fa :icon="['fab', 'google']" /> Sign in with Google</button>
		<hr />
		<h4 class="mb-5" id="headline">OR</h4>
		<h4 class="mb-5" id="headline">Register with your email adress</h4>

		<div class="form-group">
			<div class="alert alert-danger" style="font-size: 0.8rem; display:none;" id="password-hint"></div>
			<label class="label">What's your email?</label>

			<input
				type="email"
				v-model="formData.email"
				class="form-control rounded-pill shadow-sm border p-3"
				id="input-email"
				aria-describedby="emailHelp"
				placeholder="Enter email"
				required
			/>
		</div>

		<div class="form-group mt-4">
			<label id="label">Choose password</label>

			<input
				type="password"
				minlength="6"
				v-model="formData.password"
				class="form-control rounded-pill shadow-sm border p-3"
				id="input-password"
				aria-describedby="password-hint"
				placeholder="Password"
				@keyup.enter="signUp"
				required
			/>
		</div>
		<div class="d-grid gap-2 text-center">
					<div class="password-hint-error mt-2" style="font-size: 0.8rem" id="password-hint">
			Password must contain at least 6 characters
		</div>
			<button type="submit" class="btn mt-4 mb-5 p-3 rounded-pill" id="register-button" @click="signUp"><fa :icon="['fas', 'edit']" /> Register</button>
		</div>
	</div>
</template>

<script>
	import firebase from 'firebase';

	export default {
		name: 'Signup',
		name: 'Signin',
		data() {
			return {
				formData: {
					email: '',
					password: '',
				},
			};
		},

		methods: {

			// Firebase sign up method with email and password.
			signUp() {
				firebase
					.auth()
					.createUserWithEmailAndPassword(this.formData.email, this.formData.password)
					.then((user) => {
					

						this.$router.replace('/success');
					})
					.catch((error) => {

						// Logic for showing the validation errors.
						var pwDiv = document.getElementById('password-hint');

						if (error.message) {
							pwDiv.style.display = 'block';
							pwDiv.innerText = error.message;
						} else {
							pwDiv.style.display = 'none';
						}
					});

			},

			// Login with Google.
			login() {
				var provider = new firebase.auth.GoogleAuthProvider();
				provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

				firebase
					.auth()
					.signInWithPopup(provider)
					.then((result) => {
						/** @type {firebase.auth.OAuthCredential} */
						var credential = result.credential;

						// This gives you a Google Access Token. You can use it to access the Google API.
						var token = credential.accessToken;
						// The signed-in user info.
						var user = result.user;

						this.$router.push('/');
						// ...
					})
					.catch((error) => {
						// Handle Errors here.
						console.log('Something went wrong!');
						// ...
					});
			},
		},
	};
</script>

<style scoped>
	#container-signup {
		width: 50vh;
	}

	button {
		background: #000000;
		box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease 0s;
		font-weight: bold;
		font-size: 0.9rem;
		color: white;
		border: 0px;
	}

	#google-button {
		background: none;
		border: none;
		color: black;
		box-shadow: none;
	}

	#google-button:hover {
		color: #fe4c6f;
		box-shadow: none;
	}

	#input-email,
	#input-password {
		font-size: 0.9rem;
	}

	#headline {
		font-weight: bold;
	}

	button:hover {
		border: none;
		background-color: #fe4c6f;
		box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
		color: #fff;
	}

	label {
		font-weight: bold;
		margin-bottom: 10px;
	}

	/* style determined based on device */
	@media (max-width: 550px) {
		#container-signup {
			width: 95%;
		}
	}
</style>
