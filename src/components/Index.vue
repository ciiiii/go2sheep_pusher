<template>
  <div>
      <h1>{{ msg }}</h1>
      <div v-if="isLogin" id="avatar">
        <Avatar class="avatar-items" :src="picture" :size="50"></Avatar>
        <div class="avatar-items">
          (<i>{{ email }}</i>)
        </div>
        <div class="button" @click="logout">Logout</div>
      </div>
      <div v-else class="button" @click="login">Login</div>
  </div>
</template>
  
<script>
import Avatar from 'vue-avatar'

export default {
  name: 'Index',
  components: {
    Avatar
  },
  methods: {
    logout: async function() {
      const token = this.$cookies.get("token")
      const res = await fetch(`https://oauth2.googleapis.com/revoke?token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      });
      if (res.status==200){
        this.$cookies.remove("email")
        this.$cookies.remove("picture")
        this.$cookies.remove("state")
        this.$cookies.remove("token")
        window.location.href = "/"
      }
    },
    login: function(){
      window.location.href=this.url
    }
  },
  props: {
      msg: String,
      isLogin: Boolean,
      url: String,
      picture: String,
      email: String,
  }
}
</script>

<style scoped>
h3 {
margin: 40px 0 0;
}
ul {
list-style-type: none;
padding: 0;
}
li {
display: inline-block;
margin: 0 10px;
}
a {
color: #42b983;
}
#avatar {
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar-items {
  padding: 10px;
}
.button {
  color: #42b983;

  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
  text-decoration: none;

  background-color: #fff;
  border-color: #ccc;

}

.button:active {
    box-shadow: 0 0 5px -1px rgba(0,0,0,0.6);
}
</style>
  