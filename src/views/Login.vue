<template>
	<div class="container mt-5" id="container-login">
		<h3 class="mb-5" id="headline">Log in to continue.</h3>
					<div class="alert alert-danger" style="font-size: 0.8rem; display:none;" id="delete-hint"></div>
		<hr />

		<div class="form-group">
      			<div class="alert alert-danger" style="font-size: 0.8rem; display:none;" id="password-hint"></div>
			<label>Email address</label>
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
			<label>Password</label>
			<input
				type="password"
				minlength="6"
				v-model="formData.password"
				class="form-control rounded-pill shadow-sm border p-3"
				id="input-password"
				aria-describedby="password-hint"
				placeholder="Password"
				required
			/>
		</div>



		<div class="d-grid gap-2 text-center"></div>
		<button type="submit" class="btn mt-5 mb-3 p-3 rounded-pill" id="register-button" @click="signIn" @enter="signIn">
			<fa :icon="['fas', 'user-circle']" /> Login
		</button>
		<hr />

		<h4 class="mb-5" id="headline">OR</h4>
		<button class="btn mb-3 p-3 rounded-pill" id="register-button" @click="login"><fa :icon="['fab', 'google']" /> Continue with Google</button>

		<h6 class="mb-1 mt-5" id="headline">Don't have an account?</h6>
		<a href="/sign-up"
			><button class="btn mt-2 mb-5 p-3 rounded-pill" id="reg-now-button">
				Sign up for CiaoBene!
			</button></a
		>
	</div>
</template>

<script>
	import firebase from 'firebase';

	export default {
		name: 'SignIn',
		name: 'Signup',

		data() {
			return { 
				formData: {
					email: '',
					password: '',
				},
			};
		},
		methods: {
			signIn() {
				firebase
					.auth()
					.signInWithEmailAndPassword(this.formData.email, this.formData.password)
					.then((user) => {
						this.$router.replace('/');

						let loggedUser = this.formData.email.split('@')[0];
						console.log(loggedUser + ' successfully logged in!');
					})
					.catch((error) => {
						//let emailValid = document.querySelector('#input-email')
						//let passwordValid = document.querySelector('#input-password')

						//emailValid.reportValidity();
						//passwordValid.reportValidity();

						var pwDiv = document.getElementById('password-hint');

						if (error.message) {
							pwDiv.style.display = 'block';
							pwDiv.innerText = error.message;
						} else {
							pwDiv.style.display = 'none';
						}
					});
			},

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
						var errorCode = error.code;
						var errorMessage = error.message;
						// The email of the user's account used.
						var email = error.email;
						// The firebase.auth.AuthCredential type that was used.
						var credential = error.credential;
						// ...
					});
			},
			
		},
		created() {},
	};
</script>

<style scoped>
	#container-login {
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

	#reg-now-button {
		background: none;
		color: black;
		box-shadow: none;
		text-decoration: underline;
	}

	#reg-now-button:hover {
		border: none;
		color: #fe4c6f;
		box-shadow: none;
		text-decoration: none;
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

	#headline {
		font-weight: bold;
	}

	/* style determined based on device */
	@media (max-width: 550px) {
		#container-login {
			width: 95%;
		}
	}
</style>
