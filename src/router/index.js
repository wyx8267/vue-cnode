import Vue from 'vue'
import Router from 'vue-router'
import PostList from '../components/PostList'
import Article from '../components/Article'
import SideBar from '../components/SideBar'
import UserInfo from '../components/UserInfo'

Vue.use(Router)

export default new Router({
    routes: [
        {
            name: 'root',
            path: '/',
            components: {
                main: PostList
            }
        },
        {
            name: 'post_content',
            path: '/topic/:id',
            components: {
                main: Article,
                sidebar: SideBar
            }
        },
        {
            name: 'user_info',
            path: '/user/:loginname',
            components: {
                main: UserInfo
            }
        }
    ]
})