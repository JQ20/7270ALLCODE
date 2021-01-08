<template>
  <Page>
    <ActionBar title="Recharge your Coins" />

    <StackLayout class="form" id="form" >
      <Image class="logo" src="~/images/redlogo.png" />
      <StackLayout class="input-field">
        <label text="Please input your recharge code" class="h3" style="margin-bottom: 40 px"/>
        <TextField
          class="input"
          hint="Recharge Code e.g. qpon051388384931"
          v-model="code"
          name="code"
        ></TextField>
      </StackLayout>

      <Button text="Recharge" class="btn btn-primary" @tap="submit"></Button>
    </StackLayout>

  </Page>
</template>

<script>
import Home from "./HelloWorld";
export default {

  data() {
    return {
      code: "qpon051388384931",
    }
  },

  methods: {
    submit: async function (args) {
         var response = await fetch(global.baseUrl + "/recharge/" , {
                method: "POST",
                body: JSON.stringify({
                    username: global.username,
                    code: this.code,
                }),
            });
        if(response.ok){
            alert("Recharge Successfully !").then(() => {
            this.$navigateTo(Home);
        });
        }else if (response.status == 401) {
        var msg = await response.json();
        alert(msg);
      }

    },

  },

};
</script>

<style>
</style>