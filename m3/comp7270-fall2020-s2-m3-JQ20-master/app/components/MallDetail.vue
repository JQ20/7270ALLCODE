<template>
  <Page>
    <ActionBar title = "Coupons" />

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
  props: ["tappedMall", "coupons"],
  data() {
    return {
        items: [],
    };
  },
  mounted() {
    var mall = this.tappedMall.mall
    this.items = this.coupons.filter(function(p) {     
      return p.Mall == mall;
    });

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