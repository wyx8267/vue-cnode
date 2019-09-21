<template>
    <div class="postList">
        <div class="loading" v-if="isLoading">
            <img src="../assets/loading.gif" />
        </div>
        <div class="posts" v-else>
            <ul>
                <li>
                    <div class="topbar">
                        <span>全部</span>
                        <span>精华</span>
                        <span>分享</span>
                        <span>问答</span>
                        <span>招聘</span>
                    </div>
                </li>
                <li v-for="post in posts" :key="post.id">
                    <!-- avatar -->
                    <router-link
                        :to="{
                            name:'user_info',
                            params:{
                                loginname:post.author.loginname
                            }
                        }"
                    >
                        <img :src="post.author.avatar_url" alt />
                    </router-link>
                    <!-- reply & visit -->
                    <span class="allCount">
                        <span class="replyCount">{{post.reply_count}}</span>
                        /{{post.visit_count}}
                    </span>
                    <!-- tag -->
                    <span
                        :class="[{'putGood':(post.good === true),'putTop':(post.top === true),'topiclistTab':(post.good !== true && post.top !== true)}]"
                    >
                        <span>{{post | tabFormatter}}</span>
                    </span>
                    <!-- title -->
                    <router-link
                        :to="{
                        name:'post_content',
                        params:{
                            id:post.id
                        }
                    }"
                    >
                        <span>{{post.title}}</span>
                    </router-link>
                    <!-- last reply date -->
                    <span class="lastReply">{{post.last_reply_at | formatDate}}</span>
                </li>
                <li>
                    <Pagination @handleList="renderList" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Pagination from "./Pagination";
export default {
    name: "PostList",
    data() {
        return {
            isLoading: false,
            posts: [],
            postPage: 1
        };
    },
    components: {
        Pagination
    },
    methods: {
        getData() {
            this.$http
                .get("https://cnodejs.org/api/v1/topics", {
                    params: {
                        page: this.postPage,
                        limit: 20
                    }
                })
                .then(res => {
                    this.isLoading = false;
                    this.posts = res.data.data;
                })
                .catch(err => {
                    throw new Error(err);
                });
        },
        renderList(value) {
            this.postPage = value;
            this.getData();
        }
    },
    beforeMount() {
        this.isLoading = true;
        this.getData();
    }
};
</script>

<style lang="scss" scoped>
.postList {
    .loading {
        text-align: center;
        padding-top: 300px;
    }
    .posts {
        margin-top: 10px;
        ul {
            list-style: none;
            width: 100%;
            li {
                &:not(:first-child) {
                    padding: 9px;
                    font-size: 15px;
                    font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans",
                        Tahoma, "Hiragino Sans GB", STHeiti, sans-serif !important;
                    font-weight: 400;
                    background-color: #fff;
                    color: #333;
                    border-top: 1px solid #f0f0f0;
                    &:hover {
                        background: #f5f5f5;
                    }
                }
                &:last-child:hover {
                    background-color: #fff;
                }
                span {
                    line-height: 30px;
                }
                img {
                    width: 30px;
                    height: 30px;
                    vertical-align: middle;
                }
                a {
                    text-decoration: none;
                    color: #000;
                    &:hover {
                        text-decoration: underline;
                    }
                }
                .allCount {
                    width: 100px;
                    display: inline-block;
                    text-align: center;
                    font-size: 12px;
                    .replyCount {
                        color: #dad;
                        font-size: 14px;
                    }
                }
                .putGood,
                .putTop,
                .topiclistTab {
                    padding: 2px 4px;
                    border-radius: 3px;
                    font-size: 12px;
                    margin-right: 10px;
                }
                .putGood,
                .putTop {
                    background: #3c9d9b;
                    color: #fff;
                }
                .topiclistTab {
                    background-color: #e7f3ee;
                    color: #555;
                }
                .lastReply {
                    text-align: right;
                    min-width: 50px;
                    // display: inline-block;
                    white-space: nowrap;
                    color: #777;
                    font-size: 12px;
                    float: right;
                }
                .topbar {
                    height: 40px;
                    background-color: #e5e5e5;
                    span {
                        font-size: 14px;
                        color: #3c9d9b;
                        line-height: 40px;
                        margin: 0 10px;
                        cursor: pointer;
                        &:hover {
                            color: #394a6d;
                        }
                    }
                }
            }
        }
    }
}
</style>