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
			<label id="label">Password</label>

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
			<button type="submit" class="btn mt-5 mb-5 p-3 rounded-pill" id="register-button" @click="signUp"><fa :icon="['fas', 'edit']" /> Register</button>
		</div>
	</div>
</template>

<script>
	import firebase from 'firebase';
	import swal from 'sweetalert';

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
			signUp() {
				firebase
					.auth()
					.createUserWithEmailAndPassword(this.formData.email, this.formData.password)
					.then((user) => {
						//swal("User registered!", "Congratulations, your user has been registered!", "success")

						this.$router.replace('/success');
					})
					.catch((error) => {
						//let emailValid = document.querySelector('#input-email');
						//let passwordValid = document.querySelector('#input-password');

						//emailValid.reportValidity();
						//passwordValid.reportValidity();

						var pwDiv = document.getElementById('password-hint');

						if (error.message) {
							pwDiv.style.display = 'block';
							pwDiv.innerText = error.message;
						} else {
							pwDiv.style.display = 'none';
						}
						// ..
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
