<template>
    <div class="userInfo">
        <div class="loading" v-if="isLoading">
            <img src="../assets/loading.gif" />
        </div>
        <div v-else class="userInformation">
            <section>
                <img :src="userinfo.avatar_url" />
                <span>{{userinfo.loginname}}</span>
                <p>{{userinfo.score}}积分</p>
                <p>注册时间 {{userinfo.create_at | formatDate}}</p>
            </section>
            <div class="replies">
                <p>回复的主题</p>
                <ul>
                    <li v-for="item in userinfo.recent_replies" :key="item.id">
                        <router-link
                            :to="{
                            name:'post_content',
                            params:{
                                id:item.id
                            }
                        }"
                        >{{item.title}}</router-link>
                    </li>
                </ul>
            </div>
            <div class="topics">
                <p>创建的主题</p>
                <ul>
                    <li v-for="item in userinfo.recent_topics" :key="item.id">
                        <router-link
                            :to="{
                            name:'post_content',
                            params:{
                                id:item.id
                            }
                        }"
                        >{{item.title}}</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserInfo",
    data() {
        return {
            isLoading: false,
            userinfo: {}
        };
    },
    methods: {
        getUserData() {
            this.$http
                .get(
                    `https://cnodejs.org/api/v1/user/${this.$route.params.loginname}`
                )
                .then(res => {
                    if (res.data.success) {
                        this.isLoading = false;
                        this.userinfo = res.data.data;
                    }
                })
                .catch(err => {
                    throw new Error(err);
                });
        }
    },
    beforeMount() {
        this.isLoading = true;
        this.getUserData();
    }
};
</script>

<style lang="scss" scoped>
.userInfo {
    .loading {
        text-align: center;
        padding-top: 300px;
    }
    .userInformation {
        width: 75%;
        margin: 10px auto;
        section {
            background-color: #fff;
            padding: 12px;
            border-radius: 3px;
            img {
                width: 40px;
            }
        }
        .replies,
        .topics {
            background-color: #fff;
            margin-top: 10px;
            border-radius: 3px;
            p {
                padding: 12px 0 12px 12px;
                background-color: #f6f6f6;
                font-size: 14px;
            }
            li {
                padding: 4px 0 4px 12px;
                white-space: nowrap;
                font-size: 12px;
                text-overflow: ellipsis;
                overflow: hidden;
                line-height: 30px;
                vertical-align: middle;
                a {
                    color: #094e99;
                    text-decoration: none;
                }
            }
        }
    }
}
</style>