<template>
  <Page>
    <ActionBar title="Log" />

    <StackLayout class="form" id="form" v-if="!islogin">
      <Image class="logo" src="~/images/redlogo.png" />
      <StackLayout class="input-field">
        <TextField
          class="input"
          hint="Username"
          v-model="username"
          name="username"
        ></TextField>
      </StackLayout>

      <StackLayout class="input-field">
        <TextField
          class="input"
          hint="Password"
          v-model="password"
          secure="true"
          name="password"
        ></TextField>
      </StackLayout>

      <Button text="Log In" class="btn btn-primary" @tap="submit"></Button>
    </StackLayout>

    <StackLayout class="form" id="form" v-if="islogin">
      <Image class="logo" src="~/images/redlogo.png" />

      <Button
        text="Log out"
        class="btn btn-primary"
        @tap="logout"
        style="margin-top: 80em"
      ></Button>
    </StackLayout>
  </Page>
</template>

<script>
import Home from "./HelloWorld";
export default {
  props: ["tappedlogin"],
  data() {
    return {
      islogin: false,
      username: "sq",
      password: "123456",
    };
  },
  methods: {
    submit: async function (args) {
      console.log("login tapped: " + this.username + this.password);
      if (this.username == "" || this.password == "") {
        alert("Please provide both an email address and password.");
        return;
      }

      var response = await fetch(global.baseUrl + "/login", {
        method: "POST",
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      });
      if (response.ok) {
        var user = await response.json();
          global.username = this.username;
          global.password = this.password;
          global.age = user.age;
          global.gender = user.gender;
          global.coins = user.coins;
          global.avatar = user.avatar;
          
        alert("Login success").then(() => {
          this.$navigateTo(Home);
        });
      } else if (response.status == 401) {
        var msg = await response.json();
        alert(msg);
      } else {
        alert(response.statusText);
      }
    },

    logout: async function () {
      var response = await fetch(global.baseUrl + "/logout", {
        method: "GET",
      });
      if (response.ok) {
        alert("Logout success").then(() => {
          this.$navigateTo(Home);
        });
      } else if (response.status == 401) {
        alert("ERROR");
      }
      global.username = "";
    },
  },

  async mounted() {
    var response = await fetch(global.baseUrl + "/login", {
      method: "GET",
    });
    if (response.ok) {
      this.islogin = true;
    } else this.islogin = false;
  },
};
</script>

