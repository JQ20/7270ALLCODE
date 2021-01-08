<template>
  <Page>
    <ActionBar title="Qpon" />

    <StackLayout>
      <BottomNavigation>
        <TabStrip>
          <TabStripItem>
            <Label text="Home" fontSize="16"></Label>
          </TabStripItem>
          <TabStripItem>
            <Label text="Malls" fontSize="16"></Label>
          </TabStripItem>
          <TabStripItem>
            <Label text="Coins" fontSize="16"></Label>
          </TabStripItem>
          <TabStripItem >
            <Label text="User" fontSize="16"></Label>
          </TabStripItem>
        </TabStrip>
        <TabContentItem>
          <ListView for="coupon in coupons"  @itemTap="onCouponTap">
            <v-template>
              <StackLayout orientation="vertical" height="350">
                <Image :src="coupon.Image" height="300" stretch="aspectFill" />
                <Label :text="coupon.Restaurant" class="h2" />
                <Label :text="coupon.Coins" class="h3" />
              </StackLayout>
            </v-template>
          </ListView>
        </TabContentItem>
        <!-- Mall -->
        <TabContentItem>
          <ListView for="mall in malls" @itemTap="onMallTap">
            <v-template>
              <StackLayout orientation="vertical" height="350">
                <Label :text="mall.mall" class="h2" />
              </StackLayout>
            </v-template>
          </ListView>
        </TabContentItem>
        <!-- Coins -->
        <TabContentItem>
          <ListView for="coin in coins" @itemTap="onCoinTap">
            <v-template>
              <StackLayout orientation="vertical" height="350">
                <Label :text="coin.coin" class="h2" />
              </StackLayout>
            </v-template>
          </ListView>
          
        </TabContentItem>

        <!-- User -->
        <TabContentItem>
          <FlexboxLayout flexDirection="column" >
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
                  <ListView for="logfunction in Log"  @itemTap="logTap" style=""  >
                      <v-template>
                        <StackLayout orientation="vertical" height="350">
                          <Label :text="logfunction.name" class="h2" />
                        </StackLayout>
                      </v-template>
                  </ListView>
                 <ListView for="Ufunction in Ulist"  @itemTap="onItemTap" style="" v-if="name != ''" >
                      <v-template>
                        <StackLayout orientation="vertical" height="350">
                          <Label :text="Ufunction.name" class="h2" />
                        </StackLayout>
                      </v-template>
                  </ListView>
          </FlexboxLayout>     
        </TabContentItem>
      </BottomNavigation>
    </StackLayout>
  </Page>
</template>
<script>
import Log from "./Log";
import Myre from "./Myredeem";
import CoupD from "./CouponDetail";
import MallD from "./MallDetail";
import CoinD from "./CoinDetail";
import Pdetails from "./Pdetails";
import Recharge from "./Recharge";
import Avatars from "./Avatars";
import Vue from "nativescript-vue";
export default {
  methods: {



    logTap: function (args) {
      console.log("Item with index: " + args.index + " tapped");
      console.log("Product tapped: " + args.item.name);
        this.$navigateTo(Log, {
          transition: {},
          props: {
            tappedlogin: args.item,
          },
        });
     
    },

    onItemTap: function (args) {
      console.log("Item with index: " + args.index + " tapped");
      console.log("Product tapped: " + args.item.name);
      if (args.index == 1) {
        this.$navigateTo(Pdetails, {
          transition: {},
          props: {
            tappedlogin: args.item,
          },
        });
      } else if (args.index == 2){
        this.$navigateTo(Myre, {
          transition: {},
          props: {
            tappedMyre: args.item,
          },
        });
      } else if (args.index == 3){
        this.$navigateTo(Recharge, {
          transition: {},
          props: {
            tappedMyre: args.item,
          },
        });
      }else if (args.index == 0){
        this.$navigateTo(Avatars, {
          transition: {},
          props: {
            tappedMyre: args.item,
          },
        });
      }
    },

    onCoinTap: function (args){
    var coupons = this.coupons;
      this.$navigateTo(CoinD, {
        transition: {},
        props: {
          tappedCoin: args.item,
         coupons: coupons,
        },
      });
    },

    onMallTap: function (args) {
      console.log("Item with index: " + args.index + " tapped");
      console.log("Product tapped: " + args.item.mall);
      var coupons = this.coupons;
      this.$navigateTo(MallD, {
        transition: {},
        props: {
          tappedMall: args.item,
          coupons: coupons,
        },
      });
    },

    onCouponTap: function (args) {
      console.log("Item with index: " + args.index + " tapped");
      var mall = this.malls.filter(function (p) {
        return p.mall == args.item.Mall;
      });
      console.log(JSON.stringify(mall));
      this.$navigateTo(CoupD, {
        transition: {},
        props: {
          tappedCoupon: args.item,
          cmall: mall,
        },
      });
    },
  },
  async mounted() {
   

    
    var response = await fetch(global.baseUrl + "/home");
    if (response.ok) {
      var receive = await response.json();
      this.coupons = receive.coupons;
    } else {
      console.log(response.statusText);
    }
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
    this.avatar = "~/images/avatars/"+ global.avatar + ".png";
    this.name = global.username;
    this.usercoins = global.coins; 
    this.malls = global.malls;
    if(global.username!='') this.Log[0].name = "Log Out";
    else this.Log[0].name = "Login";

  },

  data() {
    return {
      avatar: "",
      coupons: [],
      coins:[
        {
            coin:"Coins <= 300",
            id: 1
        },{
            coin:"300 < Coins <= 600",
            id: 2
        },{
            coin:"600 < Coins",
            id: 3
        }
      ],
      name: "",
      usercoins: 0,
      malls: [],
      Log:[
        {
          name: "Login"
        }
      ],
      Ulist: [
        {
          name: "Change your avatars",
        },
        {
          name: "Personal details",
        },
        {
          name: "My redeemed coupons",
        },
        {
          name: "Recharge your coins",
        },
        
      ],
    };
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