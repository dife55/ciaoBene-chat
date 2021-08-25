<template>
  <div id="nav">
    <head>
      
    <nav class="navbar navbar-dark bg-dark navbar-fixed-hrefp">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand" href="/">C I A O B E N E</a>
        </div>
        <div id="navbar">
          <ul class="nav navbar-nav navbar-right">
            <li>
                <a href="/about">About</a>
                  <a href="/sign-up"> Signup</a>
              <a href="/login"> Login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </head>
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: rgb(236, 236, 236);
}

nav{
    -webkit-box-shadow: 0 8px 6px -6px rgb(124, 124, 124);
  -moz-box-shadow: 0 8px 6px -6px rgb(153, 153, 153);
  box-shadow: 0 8px 6px -6px rgb(153, 153, 153);
  position: sticky;
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
  color: #FE4C6F;
}



#nav a.a-exact-active {
  color: #FE4C6F;
}

</style>
