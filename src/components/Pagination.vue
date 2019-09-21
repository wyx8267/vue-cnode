<template>
    <div class="pagination">
        <button @click="changeBtn">首页</button>
        <button @click="changeBtn">上一页</button>
        <button v-if="judge" class="pagebtn">...</button>
        <button
            v-for="btn in pagebtns"
            :key="btn"
            :class="[{currentPage:btn === currentPage},'pagebtn']"
            @click="changeBtn(btn)"
        >{{btn}}</button>
        <button @click="changeBtn">下一页</button>
    </div>
</template>

<script>
import $ from "jquery";
export default {
    name: "Pagination",
    data() {
        return {
            pagebtns: [1, 2, 3, 4, 5, "..."],
            currentPage: 1,
            judge: false
        };
    },
    methods: {
        changeBtn(page) {
            if (typeof page !== "number") {
                switch (page.target.innerText) {
                    case "上一页":
                        $("button.currentPage")
                            .prev()
                            .click();
                        break;
                    case "下一页":
                        $("button.currentPage")
                            .next()
                            .click();
                        break;
                    case "首页":
                        this.pagebtns = [1, 2, 3, 4, 5, "..."];
                        this.changeBtn(1);
                        break;
                    default:
                        break;
                }
                return;
            }
            this.currentPage = page;
            if (page > 4) {
                this.judge = true;
            } else {
                this.judge = false;
            }
            if (page === this.pagebtns[4]) {
                this.pagebtns.shift();
                this.pagebtns.splice(4, 0, this.pagebtns[3] + 1);
            } else if (page === this.pagebtns[0] && page !== 1) {
                this.pagebtns.unshift(this.pagebtns[0] - 1);
                this.pagebtns.splice(5, 1);
            }
            this.$emit("handleList", this.currentPage);
        }
    }
};
</script>

<style lang="scss" scoped>
.pagination {
    margin-top: 5px;
    margin-bottom: 10px;
    background-color: #fff;
    padding: 6px 20px;
    border-radius: 5px;
    border: 1px solid #888;
    button {
        background-color: #fff;
        border: 1px solid #bbb;
        color: #778087;
        border-radius: 3px;
        outline: none;
        width: 55px;
        height: 30px;
        cursor: pointer;
        padding: 0 2px;
        margin: 0 4px;
    }
    .pagebtn {
        position: relative;
        bottom: 1px;
        width: 40px;
        margin: 0 4px;
    }
    .currentPage {
        color: #fff;
        background-color: #394a6d;
    }
}
</style>