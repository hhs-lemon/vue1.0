<template>
    <div class="right_col" role="main">
        <div class="row">
            <div class="col-xs-12 x_title">
                <h3>笔记本商品列表</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-3">
                <form class="form-inline">
                    <div class="form-group">
                        <label for="page-size">每页显示记录数：</label>
                        <select v-model="pageSize" class="form-control" id="page-size">
                            <option value="8">8</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="40">40</option>
                            <option value="60">60</option>
                            <option value="80">80</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="col-xs-4 col-xs-offset-5">
                <div class="form-group has-feedback">
                    <label for="product-kw" class="sr-only">搜索关键字：</label>
                    <input  v-model="kw" @keyup.13="doSearch" class="form-control" type="text" id="product-kw" placeholder="请输入搜索关键字">
                    <span class="glyphicon glyphicon-search form-control-feedback"></span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <div class="table-responsive">
                    <table class="table table-hover table-striped" id="table-laptop">
                        <thead>
                        <tr>
                            <th>
                                <div class="checkbox" style="margin: 0;">
                                    <label>
                                        <input type="checkbox">全选
                                    </label>
                                </div>
                            </th>
                            <th>编号</th>
                            <th>图片</th>
                            <th>型号</th>
                            <th>主标题</th>
                            <th>规格</th>
                            <th>单价</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-if="!pager.data">
                            <td colspan="8">
                                <div class="loading">
                                    <img src="../assets/img/loading.gif" alt="">
                                </div>
                            </td>
                        </tr>
                        <tr v-for="l of pager.data" :key="l.lid">
                            <td><input type="checkbox"></td>
                            <td>{{l.lid}}</td>
                            <td><img class="pic" :src="require('../assets/'+l.pic)"></td>
                            <td><p class="fname" :title="l.fname">{{l.fname}}</p></td>
                            <td><p class="title" :title="l.title">{{l.title}}</p></td>
                            <td><p class="spec" :title="l.spec">{{l.spec}}</p></td>
                            <td>￥{{l.price}}</td>
                            <td>
                                <a href="product_details.html">详情</a>
                                <a href="product_update.html">修改</a>
                                <a href="product_delete.html">删除</a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <ul class="pagination pull-right" id="pagination">
                            <li><a @click="loadPager(pager.pno-1)" href="#">上一页</a></li>
                            <li v-if="pager.pno-2>0"><a @click="loadPager(pager.pno-2)" href="#">{{pager.pno-2}}</a></li>
                            <li v-if="pager.pno-1>0"><a @click="loadPager(pager.pno-1)" href="#">{{pager.pno-1}}</a></li>
                            <li class="active"><a href="#">{{pager.pno}}</a></li>
                            <li v-if="pager.pno+1<=pager.pageCount"><a @click="loadPager(pager.pno+1)" href="#">{{pager.pno+1}}</a></li>
                            <li v-if="pager.pno+2<=pager.pageCount"><a @click="loadPager(pager.pno+2)" href="#">{{pager.pno+2}}</a></li>
                            <li><a @click="loadPager(pager.pno+1)" href="#">下一页</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <br>
    </div>
</template>

<script>
    import axios from 'axios'
    export default{
        data(){
            return{
                pageSize:8,
                kw:'',
                pager:{}
            }
        },
        methods:{
            /** 搜索框**/
            doSearch(){
//                console.log('用户输入了搜索关键字并点击回车',this.kw);
                this.loadPager(1);
            },
            /** 加载分页**/
            loadPager(pno){
                var url=`http://127.0.0.1/teacher_note/22%20vuejs/day06/day06ok/xz_admin_v1/data/product_list.php?pno=${pno}&pageSize=${this.pageSize}&kw=${this.kw}`;
                axios.get(url).then((res)=>{
//                    console.log(res.data);
                    this.pager=res.data;
                    console.log(this.pager)
                }).catch((err)=>{
                    console.log(err);
                })
            }
        }, 
        mounted(){
            this.loadPager(1);
        },
        watch:{
            pageSize(){
//                console.log('用户选择了新的页面商品数大小',this.pageSize);
                this.loadPager(1)
            }
        }
    }
</script>

<!--限制为组件样式-->
<style scoped>
    #table-laptop p {
        margin: 0;
    }
    #table-laptop td .title,
    #table-laptop td .fname,
    #table-laptop td .spec {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    #table-laptop td .title {
        width: 120px; 
    }
    #table-laptop td .fname {
        width: 80px;
        height:25px;
    }
    #table-laptop td .spec {
        width: 60px;
    }
    #table-laptop td .pic{
        width: 40px;
        vertical-align: middle;
        position: absolute;
        margin-top: -8px;
    }
     
</style>
<!--
大体步骤：模板——引html——建异步加载数据方法——页面加载完绑异步——页大小绑异步——搜索关键词绑异步——找js的插入模板引入——引数据样式——绑数据——帮分页绑异步

分析加载产品列表异步方法创建：搜索调用一次，改变页大小调用一次，分页栏点击调用一次。

错误：1.url的/写成\
    2.网址变量少了$!!20分钟

1.图片的动态打包：:src="require('../assets/'+l.pic)"
-->