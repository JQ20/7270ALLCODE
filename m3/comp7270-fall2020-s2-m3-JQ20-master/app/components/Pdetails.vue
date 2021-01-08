<template>
  <Page>
    <ActionBar title="Personal Details" />

          <FlexboxLayout flexDirection="column" style="margin-bottom: 50px">
                  <FlexboxLayout   v-if="name != ''" >
                        <Image :src="avatar"  width="120" height="120" style="margin: 50px;" />

                        <Label text="   "   width="30" fontWeight="bold"/>
                        <FlexboxLayout flexDirection="column" style="margin: 60px;"  >
                          <Label :text="name"  class="h1"  fontWeight="bold"/>
                          <Label text="   "   height="15" fontWeight="bold"/>
                          <Label textWrap="true">
                            <FormattedString>
                              <Span text="Coins: " class="h2"/>
                              <Span text="   "   width="" />
                              <Span :text="usercoins"  class="h2" fontWeight="bold" style="color: red" />
                            </FormattedString>
                          </Label>
                        </FlexboxLayout>
                  </FlexboxLayout>
                  <ListView for="Uvalue in User"  @itemTap="logTap" style=""  >
                      <v-template>
                        <FlexboxLayout flexDirection="row">
                                <Label :text="Uvalue.name" class="h3" />
                                <Label :text="Uvalue.value" class="h3" />
                        </FlexboxLayout>
                      </v-template>
                  </ListView>
          </FlexboxLayout>     
  </Page>
</template>
<script>
export default {

  async mounted() {
   
    this.name = global.username;
    this.User[1].value = global.age;
    this.User[0].value = global.gender;
    this.User[2].value = global.coins;
    this.usercoins = global.coins;
    this.avatar = "~/images/avatars/"+ global.avatar + ".png";
    var response_login = await fetch(global.baseUrl + "/login", {
        method: "GET",
    });
    if (response_login.ok) {
        var user = await response_login.json();
        global.age = user.age;
        global.gender = user.gender;
        global.coins = user.coins;
        global.avatar = user.avatar;
    }

  },

  data() {
    return {
      avatar: "",
      name: "",
      usercoins: 0,
      User:[
          {
              name: "Gender",
              value: ""
          },
          {
              name: "age",
              value: ""
          },
          {
              name: "Coin Balance",
              value: 0
          },
                  
      ]
    }
  },
};
</script>
<style scoped>
.home-panel {
  vertical-align: center;
  font-size: 20;
  margin: 15;
}

.description-label {
  margin-bottom: 15;
}

.action-image {
  width: 40;
  height: 40;
  vertical-align: center;
}

.action-label {
  color: #3c5afd;
  font-size: 24;
  font-weight: bold;
  vertical-align: center;
}
</style>