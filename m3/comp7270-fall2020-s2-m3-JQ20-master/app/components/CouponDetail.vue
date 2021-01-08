<template>
  <Page>
    <ActionBar title="Coupons" />
    <StackLayout>
      <Image :src="this.tappedCoupon.Image" height="300" stretch="aspectFill" />
      <Label :text="this.tappedCoupon.Restaurant" class="h2" />
      <Label textWrap="true">
        <FormattedString>
          <Span :text="this.tappedCoupon.Title" class="h2" />
        </FormattedString>
      </Label>
      <Label textWrap="true">
        <FormattedString>
          <Span text="Mall: " class="h3" />
          <Span :text="this.tappedCoupon.Mall" class="h3" />
        </FormattedString>
      </Label>
      <Label textWrap="true">
        <FormattedString>
          <Span text="Expiry Date: " class="h3" />
          <Span :text="this.tappedCoupon.DealValidTill" class="h3" />
        </FormattedString>
      </Label>
      <Label textWrap="true">
        <FormattedString>
          <Span text="Coins: " class="h3" />
          <Span :text="this.tappedCoupon.Coins" class="h3" />
        </FormattedString>
      </Label>
      <Label textWrap="true">
        <FormattedString>
          <Span text="Quota: " class="h3" />
          <Span :text="this.tappedCoupon.Quota" class="h3" />
        </FormattedString>
      </Label>
      <Button
        text="Redeem"
        @tap="onRedeemTap"
        style="background-color: green; color: white"
        v-if="name != '' && exit_index < 0"
      />

      <Button
        text="Cancel"
        @tap="onCancelTap"
        style="background-color: red; color: white"
        v-if="name != '' && exit_index >= 0"
      />
      <Button text="Address" @tap="onAddressTap" />
    </StackLayout>
  </Page>
</template>

<script>
import address from "./Address";
import Home from "./HelloWorld";
export default {
  props: ["tappedCoupon", "cmall"],
  data() {
    return {
      name:"",
      exit_index: -1,
    };
  },
  async mounted() {

   this.name = global.username;
    if(this.name!=""){
          var response = await fetch(global.baseUrl + "/qpon/detail/"+ this.tappedCoupon.id, {
        method: "GET",
      });
    if (response.ok) {
      var data = await response.json();
      this.exit_index = data.uiList.indexOf(this.name);
    } 
    }

    

  },

  methods: {

   onRedeemTap: async function(){
      var cid = this.tappedCoupon.id;
       var r = await confirm("Redeem this coupon?");
      if(r){
        var response = await fetch(global.baseUrl + "/redeem/"+cid+"/"+this.name, {
        method: "POST",
        });
        var data = await response.json();
        alert(data.message).then(() => {
        this.$navigateTo(Home);
        });
        
      }
       
    },

  onCancelTap: async function(){
      var cid = this.tappedCoupon.id;
       var r = await confirm("Cancel your redeem?");
      if(r){
        var response = await fetch(global.baseUrl + "/cancel/"+cid+"/"+this.name, {
        method: "DELETE",
        });
        var data = await response.json();
        alert(data.message).then(() => {
        this.$navigateTo(Home);
        });
        
      }
       
    },
    onAddressTap: function () {
      var mall = this.cmall;
      this.$navigateTo(address, {
        transition: {},
        props: {
          cmall: mall,
        },
      });
    },
  },
};
</script>

<style>
</style>