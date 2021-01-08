<template>
  <Page>
    <ActionBar title="Choose your favorate avatar" />
    <ListView for="avatar in avatars" @itemTap="onItemTap">
      <v-template>
        <FlexboxLayout flexDirection="row">
          <Image :src="avatar.imageSrc" class="thumb img-circle" />
          <Label :text="avatar.name" class="t-12" style="width: 60%" />
        </FlexboxLayout>
      </v-template>
    </ListView>
  </Page>
</template>

<script>
import Home from "./HelloWorld";
export default {

  data() {
    return {
      items: [],
      avatars: [
        {
          ai: "a1",
          name: "Avatar: a1",
          imageSrc: "~/images/avatars/a1.png",
        },
        {
            ai: "a2",
          name: "Avatar: a2",
          imageSrc: "~/images/avatars/a2.png",
        },{
            ai: "a3",
          name: "Avatar: a3",
          imageSrc: "~/images/avatars/a3.png",
        },{
            ai: "a4",
          name: "Avatar: a4",
          imageSrc: "~/images/avatars/a4.png",
        },{
            ai: "a5",
          name: "Avatar: a5",
          imageSrc: "~/images/avatars/a5.png",
        },{
            ai: "a6",
          name: "Avatar: a6",
          imageSrc: "~/images/avatars/a6.png",
        },{
            ai: "a7",
          name: "Avatar: a7",
          imageSrc: "~/images/avatars/a7.png",
        },{
            ai: "a8",
          name: "Avatar: a8",
          imageSrc: "~/images/avatars/a8.png",
        },
      ],
    };
  },
  mounted() {

  },

  methods: {
    onItemTap: async function (args) {

    var r = await confirm("Do you want to use it?");
      if(r){
        var response = await fetch(global.baseUrl + "/avatar/", {
        method: "POST",
        body: JSON.stringify({
                    avator: args.item.ai,
                    username: global.username,
                }),
        });
        var data = await response.json();
        alert(data).then(() => {
        this.$navigateTo(Home);
        });
        
      }
    },
  },
};
</script>

<style>
</style>