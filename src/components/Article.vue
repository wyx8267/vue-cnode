<template>
    <div class="article">
        <div class="loading" v-if="isLoading">
            <img src="../assets/loading.gif" />
        </div>
        <div v-else>
            <div class="topicHeader">
                <div class="topicTitle">{{post.title}}</div>
                <ul>
                    <li>• 发布于{{post.create_at | formatDate}}</li>
                    <li>• 作者
                        <router-link
                            :to="{
                            name:'user_info',
                            params:{
                                loginname:post.author.loginname
                            }
                        }"
                        ><span>{{post.author.loginname}}</span></router-link></li>
                    <li>• {{post.visit_count}}</li>
                    <li>• 来自{{post | tabFormatter}}</li>
                </ul>
                <div class="topicContent" v-html="post.content"></div>
            </div>
            <div class="reply">
                <div class="topbar">回复</div>
                <div class="replySec" v-for="(reply,index) in post.replies" :key="reply.id">
                    <div class="replyUp">
                        <router-link
                            :to="{
                            name:'user_info',
                            params:{
                                name:reply.author.loginname
                            }
                        }"
                        >
                            <img :src="reply.author.avatar_url" />
                        </router-link>
                        <router-link
                            :to="{
                            name:'user_info',
                            params:{
                                name:reply.author.loginname
                            }
                        }"
                        >
                            <span>{{reply.author.loginname}}</span>
                        </router-link>
                        <span>{{index+1}}楼</span>
                        <span v-if="reply.ups.length>0">☝{{reply.ups.length}}</span>
                        <span v-else></span>
                    </div>
                    <p v-html="reply.content"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Article",
    data() {
        return {
            isLoading: false,
            post: {}
        };
    },
    methods: {
        getArticleData() {
            this.$http
                .get(
                    `https://cnodejs.org/api/v1/topic/${this.$route.params.id}`
                )
                .then(res => {
                    if (res.data.success) {
                        this.isLoading = false;
                        this.post = res.data.data;
                    }
                })
                .catch(err => {
                    throw new Error(err);
                });
        }
    },
    beforeMount() {
        this.isLoading = true;
        this.getArticleData();
    }
};
</script>

<style>
@import url(../assets/markdown-github.css);
.markdown-text img {
    width: 92% !important;
}
</style>
<style lang="scss">

.article {
        margin-right: 300px;
        margin-top: 15px;
    .loading {
        text-align: center;
        padding-top: 300px;
    }
    .topicHeader {
        padding: 10px;
        background-color: #fff;
        .topicTitle {
            font-size: 20px;
            font-weight: bold;
            padding-top: 8px;
        }
        ul {
            list-style: none;
            margin: 6px 0;
            li {
                display: inline-block;
                font-size: 12px;
                color: #838383;
            }
        }
        .topicContent {
            border-top: 1px solid #e5e5e5;
            padding: 0 10px;
            p{
                padding: 5px 0;
            }
        }
    }
    .reply {
        margin-top: 15px;
        background-color: #fff;
        .topbar{
            padding: 10px;
            background-color: #f6f6f6;
            height: 16px;
            font-size: 12px;
            margin-top: 10px;
        }
        .replySec{
            border-bottom: 1px solid #e5e5e5;
            padding: 0 10px;
            a,span{
                font-size: 13px;
                color: #666;
                text-decoration: none;
            }
            img{
                width: 30px;
                height: 30px;
                position: relative;
                bottom: -9px;
            }
            .replyUp{
                span,a:nth-of-type(2){
                    margin-left: 5px;
                }
            }
            p{
                margin:10px auto 10px 20px;
            }
        }
    }
}
</style>