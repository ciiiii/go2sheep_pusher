<template>
  <div id="app">
    <Index msg="Go2SheeP_notification register" :isLogin="isLogin" :picture="picture" :email="email" :url="url"/>
  </div>
</template>

<script>
import * as PushNotifications from '@pusher/push-notifications-web'
import Index from './components/Index'

export default {
  name: 'App',
  data: function() {
    return {
      isLogin: false,
      picture: "",
      email: "",
      url: "",
    }
  },
  mounted: async function(){
    const email = this.$cookies.get("email")
    const picture = this.$cookies.get("picture")
    if (email && picture) {
      this.isLogin = true
      this.picture = picture
      this.email = email

      const beamsClient = new PushNotifications.Client({
        instanceId: process.env.VUE_APP_PUSHER_INSTANCE_ID,
      });

      beamsClient.start()
        .then(() => beamsClient.addDeviceInterest(email))
        .then(() => console.log('Successfully registered and subscribed!'))
        .catch(console.error);
    }else{
      this.isLogin = false
      const res = await fetch("/config");
      const data = await res.json();
      this.url = data.url;
    }
  },
  components: {
    Index
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
