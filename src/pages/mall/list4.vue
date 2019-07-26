<template>

    <div class="media-container">
        <div class="media-title" >
            <!-- 扫一扫 -->
        </div>
        <!-- <div id="cameraPc" v-if="pcSide">
         
            <canvas v-show="canvashowpc" id="canvasPC" width="420" height="350"></canvas>
            <div class="cameraPc-btn">
                 <Button type="primary">拍照</Button><Button type="primary" @click="selectAlbum">从相册选择</Button>
            </div>
           
        </div> -->
        <div id="camera">
            <div id="contentHolder">
                <!-- <video id="video" width="320" height="200" autoplay></video>
                <canvas v-show="canvashow" id="canvas" width="320" height="200"></canvas> -->
                <img :src="fileTurl" alt="" id="showimg">
            </div>
            <div id="buttons">
                <!-- <button id="btn_snap" class="btn btn_blue" @click="getPhoto">拍照</button> -->
                 <!-- <Upload action="http://www.lizsh.net/bgApi/uploadQRCode" :on-success="handleSuccess">
                    <input type="file" id='image-camera' accept="image/*" capture='camera' name="file"  @change="getPhoto">
                    <input type="file" id="image-album" name="file" style="margin-top:20px;" @change="getAlbum">
                    <Button type="primary" id="btn_snap" @click="goPhoto">拍照</Button>
                    <Button type="primary"  @click="goAlbum">相册</Button>
                </Upload> -->
                <van-uploader :after-read="afterRead" capture="camera" >
                     <van-button icon="photo" type="primary">拍照</van-button>
                </van-uploader>
                <van-uploader :after-read="afterRead" >
                    <van-button icon="photo" type="primary">选择相册</van-button>
                </van-uploader>
                <!-- <button id="btn_cancel" class="btn btn_blue" v-show="reBtn">取消</button>
                <button id="btn_upload" class="btn btn_green" v-show="upBtn">上传</button> -->
            </div>
           
                
           
            <van-popup v-model="showDialog">
                <div class="title">查询商家</div>
                <van-cell-group>
                    <van-field v-model="mobile" placeholder="请输入店铺注册手机号" />
                </van-cell-group>
                <van-button type="info" @click="handleBind" >查询</van-button>
            </van-popup>
            <van-popup v-model="showShop">
                <van-cell-group>
                    <van-field v-model="shopInfo.name" label="店铺名称" placeholder="请输入店铺名称" />
                    <van-field v-model="shopInfo.addr" label="注册手机号" placeholder="请输入注册手机号" />
                    <van-field v-model="shopInfo.mobile" label="店铺地址" placeholder="请输入店铺地址" />
                    <!-- <van-field v-model="value" label="店铺推荐人" placeholder="请输入店铺名称" /> -->
                </van-cell-group>
               
               <van-button class="shopSb" type="primary" @click="closeShop" >确定</van-button>
               <van-button class="shopRe" type="info" @click="resetShop">取消</van-button>
            </van-popup>
         
        
        </div>

         
    </div>
    
</template>
<script>
import Vue from "Vue"
import axios from "axios"
export default {
    data(){
        return{
            value:"",
            modal1:false,
            reBtn:false,
            upBtn:false,
            canvashow:false,
            canvashowpc:"",
            pcSide:"",
            mbSide:"",
            flag:"",//true为pc false为手机
            picUrl:"",
            cameraFile:"",
            codeId:"",
            showDialog:false,
            mobile:"",
            shopInfo:{
                id:"",
                name:"",
                addr:"",
                mobile:"",
            },//店铺信息
            showShop:false,
            files:[],
            fileUrl:"",
            fileTurl:"",//放置的图片地址
        }
    },
    mounted(){
        this.getDevice();
        // alert(this.flag);
        if(this.flag){
        
            this.pcSide = true;
            this.mbSide = false;
            this.canvashowpc = true;
            
        }else{
            this.pcSide = false;
            this.mbSide = true;
            this.canvashowpc =false;
            
        }
    },
    methods:{
        //点击拍照
        selectPhoto(){
           
        },
        selectAlbum(){

        },
        goPhoto(){
            this.getPhoto();
        },
        goAlbum(){
            this.getAlbum();
        },
        //选择相册
        getAlbum(){
            alert("相册");
            
        },
        //选择拍照
        getPhoto(){
            alert("拍照");

        },
        getPhoto2(){
           alert("拍照");
            // 获取元素，创建设置等等
            var canvas = document.getElementById("canvas"),
                context = canvas.getContext("2d"),
                video = document.getElementById("video"),
                videoObj = { "video": true },
                errBack = function (error) {
                    console.log("Video capture error: ", error.code);
                };

            // 添加video 监听器
            if (navigator.getUserMedia) { // 标准
                navigator.getUserMedia(videoObj, function (stream) {
                    video.src = stream;
                    video.play();
                }, errBack);
            } else if (navigator.webkitGetUserMedia) { // WebKit 前缀
                navigator.webkitGetUserMedia(videoObj, function (stream) {
                    video.src = window.webkitURL.createObjectURL(stream);
                    video.play();
                }, errBack);
            }
            else if (navigator.mozGetUserMedia) { // Firefox 前缀
                navigator.mozGetUserMedia(videoObj, function (stream) {
                    video.src = window.URL.createObjectURL(stream);
                    video.play();
                }, errBack);
            }
            else {
                alert("浏览器不支持HTML5！");
                //console.log('your browser not support getUserMedia');
            }

            document.getElementById("btn_snap").addEventListener("click", function () {
                context.drawImage(video, 0, 0, 320, 200);
            });
     
        },
        getDevice() {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
            this.flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                     this.flag = false;
                    break;
                }
            }
            return  this.flag;
        },
        //拉取摄像头 和 相册 
        afterRead(file) {
            this.files.push(file.file);
            let formData = new FormData();
            formData.append("file", this.files[0]);
            let config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
          
            console.log(formData);
            console.log(formData.get("files"));
            let fParams = formData;
            axios.post(
                "http://www.lizsh.net/bgApi/uploadQRCode",
                fParams,
                config
                )
                .then(res => {
                  
                    if(res.data.code == "200"){
                        this.showDialog = true;
                        this.codeId = res.data.data;
                    }else if(res.data.code == "400"){
                        alert("商铺已经绑定");
                    }else if(res.data.code == "500"){
                        alert("错误的二维码");
                    }else if(res.data.code == "300"){
                        alert("codeId不存在");
                    }



                    console.log(this.fileUrl);
                    let tparams = {
                        filePath:this.fileUrl
                    }
               
                 
                });
        


        //     console.log(file.file);
         
        //     this.files.push(file.file);
        //     console.log(this.files[0])
        //     let fd = new FormData();
        //     fd.append('file', this.files[0]);
            
        //     console.log(fd);
        //     let config = {
        //         headers: { "Content-Type": "multipart/form-data" }
        //     };
        //    axios.post("http://www.lizsh.net/bgApi/uploadQRCode",{file:fd},config).then(res=>{
        //         let tUrl = res.data;
        //         this.picUrl = "http://www.lizsh.net/static/" + tUrl;
        //         this.$http.post("/analysis",{filePath:tUrl}).then(res=>{
        //         let shopUrl = res.data;
        //         this.$http.post("/analysisQrCode",{filePath:shopUrl}).then(res=>{
        //             if(res.code == "200"){
        //                 this.showDialog = true;
        //                 this.codeId = res.codeId;
        //             }else if(res.code == "400"){
        //                 alert("商铺已经绑定");
        //             }else if(res.code == "500"){
        //                 alert("错误的二维码");
        //             }else if(res.code == "300"){
        //                 alert("codeId不存在");
        //             }
        //         })
        //     })
        //    })
        },
        //查询手机号绑定商家
        handleBind(){   
            this.$http.post("/findTShopInfoByMobile",{mobile:this.mobile}).then(res=>{
                if(res.code == "200"){
                    this.showShop = true;
                    this.showDialog = false;
                    this.shopInfo = Object.assign({},res.data);
                }else if(res.code == "400"){
                    alert("没有该店铺信息");
                }
            })
        },
   
        ok(){

        },
        cancel(){

        },
        resetShop(){
            this.showShop = false;
        },
        closeShop(){
            this.showShop = false;
            let params = {
                shopId:this.shopInfo.id,
                codeId:this.codeId
            }
            this.$http.post("/bindingShop",params).then(res=>{
                 alert("绑定成功");
            })
           
        }
    }
}
</script>
<style scoped>
#camera {
    width: 320px;
    height: 300px;
    margin:auto;
    margin-top:30px;
    position: relative;
    border: 1px solid #f0f0f0;
    -moz-border-radius: 4px 4px 0 0;
    -webkit-border-radius: 4px 4px 0 0;
    border-radius: 4px 4px 0 0;
    -moz-box-shadow: 0 0 4px rgba(0,0,0,0.6);
    -webkit-box-shadow: 0 0 4px rgba(0,0,0,0.6);
    box-shadow: 0 0 4px rgba(0,0,0,0.6);
}
    #buttons {
        margin-top:20px;
        text-align: center;
    }

    .btn {
        width: 99px;
        height: 38px;
        line-height: 32px;
        margin: 0px 4px 0px 0px;
        border: 1px solid #fff;
        -moz-border-radius: 5px; /* Gecko browsers */
        -webkit-border-radius: 5px; /* Webkit browsers */
        border-radius: 5px; /* W3C syntax */
        cursor: default;
        text-align: center;
        font-size: 14px;
        color: #fff;
    }
    .btn_blue {
        background-color: #5CACEE;
    }
    .btn_green {
        background-color: #00EE00;
    }
    .hidden{ display:none }


    .camera-box{
        width:600px;
        margin:auto;
        height: 400px;
        border:1px solid #ccc;
    }
    #canvasPC{
        display: block;
        margin:auto;
        border:1px solid #ccc;
    }
    .media-title{
        text-align: center;
        margin:20px auto;
    }
    .cameraPc-btn{
        text-align: center;
        overflow: hidden;
        margin-top:30px;
    }
    .cameraPc-btn button{
        display: inline-block;
        width: 100px;
        margin:0 10px;
    }
    #image-camera{
        display: none;
    }
    #image-album{
        display: none;
    }
    .van-dialog{
        top:10%;
        width:320px;
    }
    .van-popup{
        width:50%;
        top:15%;
    }
    .title{
        height: 40px;
        line-height: 40px;
        text-align: center;
        
    }
    .van-button--normal{
        position: relative;
        float: right;
        height: 30px;
        line-height: 30px;
        margin:20px;
    }
    .shopRe{

    }
    .shopSb{

    }
    #showimg{
       width:320px;
       height: 300px; 
       display: block;
    }
</style>

