<template>
    <div class="authorInfo">
        <div class="authorSummary">
            <div class="topbar">作者</div>
            <router-link
                :to="{
                    name:'user_info',
                    params:{
                        loginname: user.author.loginname
                    }
                }"
            >
                <img :src="user.author.avatar_url" />
            </router-link>
        </div>
        <div class="recentTopics">
            <div class="topbar">作者最近主题</div>
            <ul>
                <li v-for="list in topiclimit" :key="list.id">
                    <router-link
                        :to="{
                        name:'post_content',
                        params:{
                            id:list.id
                        }
                    }"
                    >{{list.title}}</router-link>
                </li>
            </ul>
        </div>
        <div class="recentReplies">
            <div class="topbar">作者最近回复</div>
            <ul>
                <li v-for="list in replylimit" :key="list.id">
                    <router-link
                        :to="{
                        name:'post_content',
                        params:{
                            id:list.id
                        }
                    }"
                    >{{list.title}}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "SideBar",
    data() {
        return {
            user: {},
            userinfo: {}
        }
    },
    methods: {
        getUserData() {
            this.$http
                .get(
                    `https://cnodejs.org/api/v1/user/${this.user.author.loginname}`
                )
                .then(res => {
                    if (res.data.success) {
                        this.userinfo = res.data.data;
                    }
                })
                .catch(err => {
                    throw new Error(err);
                });
        },
        getData() {
            this.$http
                .get(
                    `https://cnodejs.org/api/v1/topic/${this.$route.params.id}`
                )
                .then(res => {
                    if (res.data.success) {
                        this.user = res.data.data;
                        this.getUserData();
                    }
                })
                .catch(err => {
                    throw new Error(err);
                });
        }
    },
    beforeMount() {
        this.getData();
    },
    computed: {
        topiclimit() {
            if (this.userinfo.recent_topics) {
                return this.userinfo.recent_topics.slice(0, 5);
            }
        },
        replylimit() {
            if (this.userinfo.recent_replies) {
                return this.userinfo.recent_replies.slice(0, 5);
            }
        }
    },
    watch: {
        $route(to, from) {
            this.getData();
        }
    }
};
</script>

<style lang="scss" scoped>
.authorInfo {
    width: 320px;
    float: right;
    margin-top: 0;
    .topbar {
        padding: 10px;
        background-color: #f5f5f5;
        height: 16px;
        font-size: 12px;
    }
    .authorSummary {
        background-color: #fff;
        border-radius: 3px;
        img {
            height: 48px;
            width: 48px;
            border-radius: 3px;
            margin: 10px;
        }
    }
    .recentReplies,
    .recentTopics {
        border-radius: 3px;
        background-color: #fff;
        .topbar {
            margin-top: 10px;
        }
        ul {
            margin-top: 0;
            margin-bottom: 0;
            list-style: none;
            padding-left: 14px;
            padding-right: 14px;
            li {
                padding: 3px 0;
                a {
                    font-size: 12px;
                    text-decoration: none;
                    color: #778087;
                }
            }
        }
    }
}
</style>