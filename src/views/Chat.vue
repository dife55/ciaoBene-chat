<template>
	<div class="container mt-5 mb-5" id="chat-container">
				<h3 class="" id="headline">Lobby</h3>
				<hr/>
		<div class="row">
			<div class="alert alert-danger" style="font-size: 0.8rem; display:none;" id="delete-hint"></div>



			<!-- Chat boxes -->
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

			<!-- Write message -->
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

	<!-- User panel -->
	<footer class="container-fluid fixed-bottom" id="footer">
		<div class="row p-2" id="user-footer">
			<div class="col-4" id="channels-col">
				<li>
					<div class="dropup">
						<a class="dropbtn-channels" id="channel-button-channels">Channels</a>
						<div class="dropup-content">
							<a class="dropbtn-channels" id="channel-button-football" @click="changeChannel(this.football)">Football</a>
							<hr />
							<a class="dropbtn-channels" id="channel-button-basketball" @click="changeChannel(this.basketball)">Basketball</a>
							<hr />
							<a class="dropbtn-channels" id="channel-button-sports" @click="changeChannel(this.sports)">Sports</a>
							<hr />
							<a class="dropbtn-channels" id="channel-button-lobby" @click="changeChannel(this.lobby)">Lobby</a>
						</div>
					</div>
				</li>
			</div>
			<div class="col-2"></div>
			<div class="col-6" id="user-col">
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
				currentChannel: 'Lobby',
				channel: null,
			};
		},

		methods: {
			// Scroll down on page.
			goDown() {
				var box = document.getElementById('write-message');
				box.scrollIntoView();
			},

			// Delete user from firebase.
			deleteUser() {
				const user = firebase.auth().currentUser;
				let userdeleted = firebase.auth().currentUser.email;

				user
					.delete()
					.then(() => {
						window.location.href = '/deleted';
					})
					.catch((error) => {
						var deleteDiv = document.getElementById('delete-hint');

						// Logic for the error messages
						if (error.message) {
							deleteDiv.style.display = 'block';
							deleteDiv.innerText = error.message;
						} else {
							deleteDiv.style.display = 'none';
						}
					});
			},

			// Log out authenticated user.
			logOut() {
				firebase
					.auth()
					.signOut()
					.then(() => {
						// Sign-out successful.
						loginChange.innerText = 'Login';
						location.reload();
					})
					.catch((error) => {
						var deleteDiv = document.getElementById('delete-hint');

						// Logic for the error messages
						if (error.message) {
							deleteDiv.style.display = 'block';
							deleteDiv.innerText = error.message;
						} else {
							deleteDiv.style.display = 'none';
						}
					});
			},

			// Write message & save to firestore.
			saveMessage() {
				// Splitting datetime to date & time. Setting wanted date format.
				let dateNow = new Intl.DateTimeFormat('se-SE', { dateStyle: 'full' }).format(new Date());
				let timeNow = new Intl.DateTimeFormat('se-SE', { timeStyle: 'short' }).format(new Date());

				// Logic: if the user is logged in with google use display name else use email as username.
				if (this.authUser.displayName) {
					db.collection(this.currentChannel)
						.add({
							message: this.message, // The actual message
							author: this.authUser.email, // Logged in users email.
							postedAt: new Date(), // Full Datetime.
							date: dateNow, // Date.
							time: timeNow, // Time.
							username: this.authUser.displayName, // Google display name as username
						})
						.then(() => {
							// After saving message, scroll down on page.
							this.goDown();
						});

					this.message = null;
				} else {
					db.collection(this.currentChannel)
						.add({
							message: this.message,
							author: this.authUser.email,
							postedAt: new Date(),
							date: dateNow,
							time: timeNow,
							username: this.authUser.email, // Splitting the email after @ as username,
							//  to look better when fetching messages.
						})
						.then(() => {
							this.goDown();
						});

					this.message = null;
				}
			},

			// Change channel: changing current channel and fetching messages for that channel.
			changeChannel(channel) {
				var changeChannel = document.getElementById('channel-button-channels');

				changeChannel.innerText = channel;

				this.currentChannel = channel;

				var changeHeadline = document.getElementById('headline');
				changeHeadline.innerText = this.currentChannel;

				console.log(this.currentChannel);

				this.fetchMessages();
			},

			// Get all messages
			fetchMessages() {
				db.collection(this.currentChannel)
					.orderBy('postedAt')
					.onSnapshot((querySnapshot) => {
						let allMessages = [];
						querySnapshot.forEach((doc) => {
							allMessages.push(doc.data());
						});

						this.messages = allMessages;

						setTimeout(() => {
							// After fetching messages, scroll down on page.
							this.goDown();
						}, 200);
					});
			},
		},

		created() {
			firebase.auth().onAuthStateChanged((user) => {
				if (user) {
					this.authUser = user;

					this.football = document.getElementById('channel-button-football').innerText;
					this.basketball = document.getElementById('channel-button-basketball').innerText;
					this.sports = document.getElementById('channel-button-sports').innerText;
					this.lobby = document.getElementById('channel-button-lobby').innerText;
				} else {
					this.authUser = {};
					logout.style.display = 'block';
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
		min-width: 40vh;
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
		min-width: 40vh;
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
		text-align: center;
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
		width: 80vh;
		margin-top: 30%;
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

	#headline {
		font-weight: bold;
		margin-bottom: 20px;
	}



	#user-footer {
		background: rgb(31, 31, 31);
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

	.dropbtn-channels {
		cursor: pointer;
	}

	/* Dropup Button */
	.dropbtn {
		color: white;
		padding: 16px;
		font-size: 1rem;
		border: none;
		background: none;
	}

	.dropbtn-channels {
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
	.dropup-content,
	.dropup-content-channels {
		display: none;
		position: absolute;
		bottom: 5vh;
		background-color: rgb(31, 31, 31);
		width: 30vh;
		text-align: center;
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

		#headline {
			text-align: center;
			font-weight: bold;
			margin-top: 50%;
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

		.dropbtn {
			font-size: 0.9rem;
		}

		.dropbtn-channels {
			font-size: 0.9rem;
		}

		#channels-col,
		#user-col {
			width: 100%;
		}
	}
</style>
