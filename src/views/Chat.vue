<template>
	<div class="container mt-5">
		<div class="row">
			<div class="col-3 p-2 m-3">
				<h3 id="user-head">{{ authUser.email }}</h3>
				<button class="btn btn-danger mt-3 m-2 p-3 rounded-pill shadow-sm border" id="delete-button" @click="deleteUser">
					<fa :icon="['fas', 'times-circle']" /> Delete User
				</button>
				<button class="btn btn-dark mt-2 mb-5 m-2 p-3 rounded-pill shadow-sm border" id="log-out-button" @click="logOut">
					Log Out
				</button>
				<table class="table">
					<thead>
						<tr>
							<th scope="col"></th>
							<th scope="col">Channels</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">1</th>
							<td>Football</td>
						</tr>
						<tr>
							<th scope="row">2</th>
							<td>Basketball</td>
						</tr>
						<tr>
							<th scope="row">3</th>
							<td colspan="2">Movies</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="col-6 m-4">
				<h3 id="user-head">YOU ARE IN THE LOBBY</h3>
				<div class="container" id="message-container" v-for="message in messages" :key="message">
					<div :class="[message.author == authUser.email ? 'sent-msg shadow-sm border' : 'received-msg shadow-sm border']">
						<span class="position-absolute p-3" id="username-div">{{ message.author }}</span>
						<div class="p-3 mt-4 text-left" id="bubble">
							<p class="text-start" id="message-text">
								{{ message.message }}
							</p>
						</div>
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
	</div>

	<div class="bottom-div"></div>
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
				let box = document.querySelector('.bottom-div');
				box.scrollTop = box.scrollHeight;
			},

			deleteUser() {
				const user = firebase.auth().currentUser;
				let userdeleted = firebase.auth().currentUser.email;
				user
					.delete()
					.then(() => {
						console.log(userdeleted + ' is now deleted from firebase!');
					})
					.catch((error) => {
						// An error ocurred
						// ...
					});
			},

			logOut() {
				firebase
					.auth()
					.signOut()
					.then(() => {
						// Sign-out successful.
					})
					.catch((error) => {
						// An error happened.
					});
			},

			saveMessage() {
				db.collection('chat')
					.add({
						message: this.message,
						author: this.authUser.email,
						postedAt: new Date(),
					})
					.then(() => {
						this.goDown();
					});

				this.message = null;
				return username;
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
				} else {
					this.authUser = {};
				}
			});
			this.fetchMessages();

			return name;
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
		max-width: 50%;
		min-width: 80%;
	}

	.sent-msg {
		background: #fe4c6f;
		color: #ffffff;
		float: right;
		margin-bottom: 30px;
		border-radius: 2rem;
		max-width: 80%;
		min-width: 80%;
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

	button:hover {
		border: 0px;
		background-color: #fe4c6f;
		box-shadow: 0px 15px 20px rgba(78, 78, 78, 0.4);
		color: #fff;
	}

	#chat-container {
		width: 100%;
	}

	/* style determined based on device */
	@media (max-width: 550px) {
		.sent-msg {
			width: 100%;
		}

		.received-msg {
			width: 100%;
		}

		#chat-container {
			width: 100%;
		}
	}
</style>
