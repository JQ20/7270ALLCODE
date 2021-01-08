<template>
  <Page>
    <ActionBar title="Address" />
    <Label :text="this.cmall[0].mall" class="h2" />
    <WebView :src="url"/>
  </Page>
</template>

<script>
export default {
  props: ["cmall"],
  data() {
    return {
        url: encodeURI("https://leaflet-api.vercel.app?marker="+this.cmall[0].mall+"|"+this.cmall[0].latitude+","+this.cmall[0].longitude),
    };
  },
};
</script>

<style>
</style>