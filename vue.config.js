/**
 * Created by web-01 on 2018/7/13.
 */
//让webpack加载器默认可以加载ico类型图片 agular01 10:37
module.exports={
    configureWebpack:{
        module:{
            rules:[{
                test:/\.ico$/,
                loader:'file-loader'
            }]
        }
    }
}