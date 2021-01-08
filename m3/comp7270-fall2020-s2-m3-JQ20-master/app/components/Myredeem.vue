<template>
  <Page>
    <ActionBar title="Myredeem" />
    <ListView for="coupon in coupons" @itemTap="onCouponsTap">
      <v-template>
        <StackLayout orientation="vertical" height="350">
          <Label :text="coupon.Restaurant" class="h2" />
        </StackLayout>
      </v-template>
    </ListView>
  </Page>
</template>

<script>
import CoupD from "./CouponDetail";
export default {
  props: ["tappedMyre"],
  data() {
    return {
        coupons:[],
    };
  },
    methods: {
    onCouponsTap: function (args) {
    var mall = global.malls.filter(function(p) {     
        return p.mall == args.item.Mall;
    });
      this.$navigateTo(CoupD, {
        transition: {},
        props: {
          tappedCoupon: args.item,
          cmall: mall
        },
      });
    }, 
  },

  async mounted() {
        var response = await fetch(global.baseUrl + "/myredeem/"+global.username, {
        method: "GET",
      });

      if (response.ok) {
        var qpons = await response.json();
        this.coupons = qpons.Qpon;
      } else if(response.status == 401){
               alert("ERROR");
        }

  },
};
</script>

<style>
</style>