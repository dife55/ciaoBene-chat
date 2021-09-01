<template>
	<div class="container" id="container-success">
		<h1 id="success-icon"><fa :icon="['fas', 'check-circle']" /></h1>
		<h3 class="mb-3" id="headline-success">Your registration is complete.</h3>
		<h5 class="mb-5" id="headline">Congratulations, your user has been sucessfully created!</h5>
		<a href="/login"><button href="/login" class="btn mb-3 p-3 rounded-pill" id="go-to-login-button" @click="login">Login to start chatting</button></a>
	</div>
</template>

<script>

	export default {
		name: 'SignIn',

		data() {
			return {};
		},
		methods: {},
		created() {},
	};
</script>

<style scoped>
	#container-success {
		width: 70vh;
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

	button:hover {
		border: none;
		background-color: #fe4c6f;
		box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
		color: #fff;
	}

	#headline-success {
		font-weight: bold;
		color: #58b561;
	}

	#success-icon {
		color: #58b561;
		font-size: 4rem;
	}

	/* style determined based on device */
	@media (max-width: 550px) {
		#container-success {
			width: 95%;
		}
	}
</style>
