<template>
    <div id="app">
        <Header />
        <div class="main">
            <router-view name="sidebar"></router-view>
            <router-view name="main"></router-view>
        </div>
    </div>
</template>

<script>
import Header from "./components/Header";
import PostList from "./components/PostList";

export default {
    name: "app",
    components: {
        Header,
        PostList
    }
};
</script>

<style>
* {
    padding: 0;
    margin: 0;
}
body {
    background: #e7f3ee;
}
.main {
    width: 80%;
    margin: 0 auto;
}
</style>
