<template>
	<div class="container" id="about-container">
		<h3 class="mb-3" id="headline-about">About the CiaoBene chat-application.</h3>
		<hr />
        <p class="mb-5" id="about-paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae porro maiores aut eius non sequi voluptatibus sed, eveniet nostrum facilis nulla beatae. Fuga veritatis nesciunt ea quis id, tempore modi?<br><br>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit, debitis odit? Ducimus numquam, officiis natus reprehenderit impedit quod vel! Ea.<br><br>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus laudantium reprehenderit necessitatibus optio voluptatibus explicabo, adipisci placeat quis, quia labore est sequi saepe? Velit, illum, ex ea perferendis alias laboriosam, vel debitis nisi ipsa ducimus mollitia praesentium molestiae dicta omnis!</p>
	</div>
</template>

<script>
	export default {};
</script>

<style scoped>
	#headline-about {
		font-weight: bold;
	}

	#about-container {
		width: 70vh;
	}

    #about-paragraph{
        text-align: left;
        line-height: 2;
    }

	@media (max-width: 550px) {
		#about-container {
			width: 95%;
		}
	}
</style>
