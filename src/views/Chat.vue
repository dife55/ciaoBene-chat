<template>
	<div class="container mt-5" id="chat-container">
		<div class="row">
			<div class="alert alert-danger" style="font-size: 0.8rem; display:none;" id="delete-hint"></div>
			<div class="container" id="message-container" v-for="message in messages" :key="message">
				<div :class="[message.author == authUser.email ? 'sent-msg shadow-sm border' : 'received-msg shadow-sm border']">
					<span class="" id="date-posted">{{ message.date }}</span>
					<span class="position-absolute p-3" id="username-div">{{ message.username }}</span>
					<div class=" mt-4 text-left" id="bubble">
						<p class="text-start p-3" id="message-text">
							{{ message.message }}
						</p>
					</div>
					<span class="" id="time-posted">{{ message.time }}</span>
				</div>
			</div>
			<input
				@keyup.enter="saveMessage"
				v-model="message"
				type="text"
				class="form-control rounded-pill shadow-sm border mb-5"
				id="write-message"
				placeholder="Write something..."
			/>
		</div>
	</div>

	<footer class="container-fluid fixed-bottom" id="footer">
		<div class="row p-2" id="user-footer">
			<li>
				<div class="dropup">
					<a class="dropbtn"><fa :icon="['fas', 'user-circle']" /> {{ authUser.email }} </a>
					<div class="dropup-content">
						<a href="#" id="delete-button" @click="deleteUser"> <fa :icon="['fas', 'times-circle']" /> Delete User </a>
						<hr />
						<a href="#" id="log-out-button" @click="logOut">Log Out</a>
					</div>
				</div>
			</li>
		</div>
	</footer>
</template>

<script>
	import firebase from 'firebase';

	export default {
		name: 'Chat',

		data() {
			return {
				message: null,
				messages: [],
				authUser: {},
			};
		},

		methods: {
			goDown() {
				var box = document.getElementById('write-message');
				box.scrollIntoView();
			},

			deleteUser() {
				const user = firebase.auth().currentUser;
				let userdeleted = firebase.auth().currentUser.email;

				user
					.delete()
					.then(() => {
						window.location.href = "/deleted";
					})
					.catch((error) => {
						var deleteDiv = document.getElementById('delete-hint');

						if (error.message) {
							deleteDiv.style.display = 'block';
							deleteDiv.innerText = error.message;
						} else {
							deleteDiv.style.display = 'none';
						}
						console.log(error);
					});
			},

			logOut() {
				firebase
					.auth()
					.signOut()
					.then(() => {
						// Sign-out successful.
						loginChange.innerText = 'Login';
					})
					.catch((error) => {
						// An error happened.
					});
			},

			saveMessage() {
				let dateNow = new Intl.DateTimeFormat('se-SE', { dateStyle: 'full' }).format(new Date());
				let timeNow = new Intl.DateTimeFormat('se-SE', { timeStyle: 'short' }).format(new Date());

				if (this.authUser.displayName) {
					db.collection('chat')
						.add({
							message: this.message,
							author: this.authUser.email,
							postedAt: new Date(),
							date: dateNow,
							time: timeNow,
							username: this.authUser.displayName,
						})
						.then(() => {
							this.goDown();
						});

					this.message = null;
				} else {
					db.collection('chat')
						.add({
							message: this.message,
							author: this.authUser.email,
							postedAt: new Date(),
							date: dateNow,
							time: timeNow,
							username: this.authUser.email.split('@')[0],
						})
						.then(() => {
							this.goDown();
						});

					this.message = null;
				}
			},

			fetchMessages() {
				db.collection('chat')
					.orderBy('postedAt')
					.onSnapshot((querySnapshot) => {
						let allMessages = [];
						querySnapshot.forEach((doc) => {
							allMessages.push(doc.data());
						});

						this.messages = allMessages;

						setTimeout(() => {
							this.goDown();
						}, 1000);
					});
			},
		},

		created() {
			firebase.auth().onAuthStateChanged((user) => {
				if (user) {
					this.authUser = user;
					var loginChange = document.getElementById('login-link');
					loginChange.innerText = 'Log out';
				} else {
					this.authUser = {};
				}
			});

			this.fetchMessages();
		},

		beforeRouteEnter(to, from, next) {
			next((vm) => {
				firebase.auth().onAuthStateChanged((user) => {
					if (user) {
						next();
					} else {
						vm.$router.push('/login');
					}
				});
			});
		},
	};
</script>

<style scoped>
	.received-msg {
		background: rgb(255, 255, 255);
		float: left;
		margin-bottom: 30px;
		border-radius: 2rem;
		max-width: 60vh;
		min-width: 30vh;
		margin-top: 3vh;
	}

	#date-posted {
		font-size: 0.7rem;
		color: rgb(66, 66, 66);
		box-sizing: border-box;
		position: absolute;
		margin-left: 2vh;
		margin-bottom: 1vh;
		margin-top: -20px;
	}

	#time-posted {
		font-size: 0.7rem;
		float: right;
		margin-right: 2vh;
		margin-bottom: 1vh;
		box-sizing: border-box;
	}

	.sent-msg {
		background: #fe4c6f;
		color: #ffffff;
		float: right;
		margin-bottom: 30px;
		border-radius: 2rem;
		max-width: 60vh;
		min-width: 30vh;
		margin-top: 3vh;
	}

	#username-div {
		font-size: 12px;
		font-weight: bold;
		display: block;
		margin-bottom: 10px;
	}

	#message-text {
		font-size: 0.8rem;
	}

	#user-head {
		font-size: 1.5rem;
	}

	#write-message {
		padding: 15px;
		display: inline;
	}

	#message-container {
		text-align: left;
		display: inline-block;
	}

	button {
		background: #000000;
		box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease 0s;
		font-weight: bold;
		font-size: 0.9rem;
		width: 100%;
	}

	#chat-container {
		width: 100vh;
	}

	button:hover {
		border: 0px;
		background-color: #fe4c6f;
		box-shadow: 0px 15px 20px rgba(78, 78, 78, 0.4);
		color: #fff;
	}

	#message-container {
		width: 100%;
	}

	#footer {
		color: white;
		text-align: center;
	}

	#user-footer {
		background: rgb(31, 31, 31);
		float: left;
	}

	li {
		list-style: none;
	}

	a {
		color: #ffffff;
		text-decoration: none;
		margin: 10px;
	}

	a:hover {
		color: #fe4c6f;
	}

	/* Dropup Button */
	.dropbtn {
		color: white;
		padding: 16px;
		font-size: 16px;
		border: none;
		background: none;
	}

	/* The container <div> - needed to position the dropup content */
	.dropup {
		position: relative;
		display: inline-block;
		padding: 1vh;
	}

	/* Dropup content (Hidden by Default) */
	.dropup-content {
		display: none;
		position: absolute;
		bottom: 5vh;
		background-color: rgb(31, 31, 31);
		min-width: 250px;
		text-align: left;
		font-size: 0.9rem;
		z-index: 1;
	}

	/* Links inside the dropup */
	.dropup-content a {
		color: rgb(255, 255, 255);
		padding: 5px 5px;
		text-decoration: none;
		display: block;
		background: none;
	}

	/* Change color of dropup links on hover */
	.dropup-content a:hover {
		color: #fe4c6f;
	}

	/* Show the dropup menu on hover */
	.dropup:hover .dropup-content {
		display: block;
	}

	/* Change the background color of the dropup button when the dropup content is shown */
	.dropup:hover .dropbtn {
		cursor: pointer;
	}

	/* style determined based on device */
	@media (max-width: 550px) {
		.sent-msg {
			width: 100%;
		}

		.received-msg {
			width: 100%;
		}

		#message-container {
			width: 100%;
		}

		#user-panel {
			width: 100%;
		}

		#chat-container {
			width: 100%;
		}
	}
</style>
