<template>
  <Page>
    <ActionBar title = "CouponsSelected" />

      <ListView for="item in items" @itemTap="onCouponTap">
        <v-template>
          <StackLayout orientation="vertical" height="350">
            <Label :text="item.Restaurant" class="h2" />
          </StackLayout>
        </v-template>
      </ListView>
  </Page>
</template>

<script>
import CoupD from "./CouponDetail";
import Vue from "nativescript-vue";
export default {
  props: ["tappedCoin","coupons"],
  data() {
    return {
        items: [],
    };
  },
  mounted() {
    var coin = this.tappedCoin.id;
    if(coin==1){
        this.items = this.coupons.filter(function(p) {     
      return p.Coins <= 300;
    });
    }else if(coin==2){
        this.items = this.coupons.filter(function(p) {     
      return p.Coins > 300&& p.Coins <=600;
    });
    }else if(coin==3){
        this.items = this.coupons.filter(function(p) {     
      return p.Coins > 600;
    });
    }
    

  },

  methods :{
    onCouponTap: function (args) {
      console.log("Item with index: " + args.index + " tapped");
      var mall = global.malls.filter(function(p) {     
        return p.mall == args.item.Mall;
    });
    console.log(JSON.stringify(mall));
      this.$navigateTo(CoupD, {
        transition: {},
        props: {
          tappedCoupon: args.item,
          cmall: mall
        },
      });
    },
  },
};
</script>

<style>
</style>