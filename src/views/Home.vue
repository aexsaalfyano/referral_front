<template>
  <div class="hello">
    <h3 class="m-3">
      This is Apps For Test From INFT<br />
      Please Insert Name Before Click Link Bellow For Result
    </h3><br>
    <ul>

        <!-- <input v-model="name" class="bg-white text-sm rounded border-2 border-gray-400 focus:outline-none focus:border-orange-500 px-3 py-2 lg:w-1/4 w-full mb-5" placeholder="Your Name..." type="text"><br> -->
      <button
        @click="$router.push('/referral')"
        class="
          ml-auto
          bg-green-600
          hover:bg-green-700
          rounded-md
          px-3
          py-2
          text-sm text-white
          focus:outline-none
          items-center
          transition
          duration-300
          ease-in
        "
      >

        <h4 class="font-semibold">VIEW</h4>
      </button>
    </ul>
  </div>
</template>

<script>

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
