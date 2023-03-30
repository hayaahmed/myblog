<template>
  <div id="app">
    <nav>
      <router-link to="/">Employees</router-link> 
      <router-link to="/patientsCrud">Patients</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 20px;

  a {
    font-weight: bold;
    color: #2c3e50;
    border: none;
    font-size: 20px;
    text-decoration: none;
    text-transform: uppercase;
    margin: 20px;

    &.router-link-exact-active {
      color: #129e9e;
    }
  }
}
</style>
