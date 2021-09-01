<template>
	<div class="fixed-top" id="nav">
		<head>
			<nav class="navbar navbar-dark bg-dark navbar-fixed-top">
				<div class="container">
					<div class="navbar-header">
						<a class="navbar-brand" href="/">C I A O B E N E</a>
					</div>
					<div id="navbar">
						<ul class="nav navbar-nav navbar-right">
							<li>
								<a id="sign-up-link" href="/sign-up"> Signup</a>
								<a id="login-link" href="/login"> Login</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</head>
	</div>
	<router-view />
</template>

<script>
	import firebase from 'firebase';
	export default {
		name: 'SignIn',
		data() {
			return {
				formData: {
					email: '',
					password: '',
				},
			};
		},

		methods: {
			
		},
		created() {

		},

	};
</script>

<style>
	#app {
		font-family: 'Montserrat', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		background-color: rgb(236, 236, 236);
		margin-top: 20vh;
		scroll-behavior: smooth;
	}

	html {
		background: rgb(236, 236, 236);
		scroll-behavior: smooth;
		margin-bottom: 10vh;
	}

	nav {
		-webkit-box-shadow: 0 8px 6px -6px rgb(124, 124, 124);
		-moz-box-shadow: 0 8px 6px -6px rgb(153, 153, 153);
		box-shadow: 0 8px 6px -6px rgb(153, 153, 153);
	}

	.nav {
		padding: 30px;
	}

	.navbar-brand {
		font-weight: bold;
	}

	#nav a {
		color: #ffffff;
		text-decoration: none;
		margin: 10px;
	}

	#nav a:hover {
		color: #fe4c6f;
	}

	#nav a.a-exact-active {
		color: #fe4c6f;
	}

	button {
		background: #000000;
		box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease 0s;
		font-weight: bold;
		font-size: 0.7rem;
		width: 100%;
	}

	button:hover {
		border: 0px;
		background-color: #fe4c6f;
		box-shadow: 0px 15px 20px rgba(78, 78, 78, 0.4);
		color: #fff;
	}
</style>
