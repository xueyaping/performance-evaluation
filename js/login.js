/**
 * Created by xue on 2016/7/2.
 * https://cdn.wilddog.com/sdk/js/2.1.0/wilddog.js"
 * js/jquery.min.js
 * layer/layer.js
 */
var config = {
   authDomain: "pes.wilddog.com",
    syncURL: "https://pes.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref('https://pes.wilddogio.com');
//初始化

var authData;
var users=new Array();
var reguser=new Array();

var i;
var e;

/*ref.set({

    admin:{
        scoring:{agree:0,degree:0},
        depMag:{
            name:"zengxiaochao",id:""
        },
        info: {
            prdGroup: {
                zhufeng: {name: "zhufeng", id: "p_photology", score: 0},
                fengyunfeng: {name: "fengyunfeng", id: "p_p001", score: 0}
            },
            techGroup: {
                fengxiaoyun: {name: "fengxiaoyun", id: "t_s001", score: 0},
                xue: {name: "xue", id: "t_001", score: 0},
                wangjianping: {name: "wangjianping", id: "t_s001", score: 0}
            },
            manager:{
                qlg: {name: "qiulonggang", id: "m_s001", score: 0},
                fyf: {name: "fengxiaoyun", id: "m_p001", score: 0},
                ghg:{name: "guohaogang", id: "m_p001", score: 0},
                lh:{name: "lihui", id: "m_p001", score: 0}
            }
        }
    }
});*/
function logIn(){
    oemail=$('#em').val();
    opassword=$('#pd').val();
    ref.auth.signInWithEmailAndPassword({email:oemail,password:opassword}.then(
        function(err){

        if(err==null){
            top.location = "./panel.html";
            $('#logInForm').submit();

        }else if(oemail.length==0||opassword.length==0){
            console.log("邮箱或密码不能为空", err);

        }else{
            $('#login-alert').show();
            $('#txtChange').text("邮箱或密码有误");
            console.log("",err)
        }

    })
    )
}//用户登录

function regInfo(){
    nemail=$('#em').val();
    nname = $('#user_name').val();
    selval = $('#group').val();
    var regRef=ref.child("admin/info");
    if(selval=="prd_g"){
        regRef.child("prdGroup/"+nname).update({name:nname,email:nemail,password:npassword})

    }
    if(selval=="tech_g"){
        regRef.child("techGroup/"+nname).update({name:nname,email:nemail,password:npassword})

    }
    if(selval=="manager"){
        regRef.child("manager/"+nname).update({name:nname,email:nemail,password:npassword})

    }

}//用户注册住息写入数据库。

function register(){
    nemail=$('#em').val();
    npassword=$('#pd').val();
    tip=$('#reg-alert');
    tiptxt=$('#txtChange');
    //nname=$('#user_name').val();
   // selval=$('#group').val();

    wilddog.auth().createUserWithEmailAndPassword ({email:nemail,password:npassword}).then(function(){
            $("#regForm").submit();
           // tip.show();
           // tiptxt.text(nemail+"注册成功!");// alert("注册成功"+"<br>"+nemail+"<br>"+npassword);
            regInfo();
            //弹出层
            layer.alert('恭禧，您已注册成功!',{
                skin: 'layui-layer-molv' //样式类名
                ,closeBtn:0},
                function() {
                top.location = './login.html' ;//iframe的url
                });

    }).catch(function(error){
            if (error.code == "email_taken") {

                //tip.show();
                // $('#txtChange').text('邮箱已经被注册');
                layer.msg('此邮箱已经被注册');
            }
            else if (error.code == "invalid_email"){
                //tip.show();
                //tiptxt.text('邮箱或密码不合法');
                layer.msg('邮箱或密码不合法');
            }else{
                /*tip.show();
                 tiptxt.text("注册失败!")*/
                layer.msg('很遗憾，注册失败');
            }
    })

}//用户注册

function logOut(){

    /*    if (confirm("您确定要退出控制面板吗？")==true){
     ref.unauth(function(err){
     if(err==null){
     top.location = "./login.html";
     }

     })
     }else{
     return false;
     }*/
}//退出登录

function addUser(){
    newName=$("#inputName").val();
    newEmail=$("#inputEmail").val();
    newPd=$("#inputPassword").val();

    if(authData.password.email=="xyp@gsola.cn"){
        ref.createUser({email:newEmail,password:newPd},function(err){
            if(err==null){
                ref.child('uid').push({name:newName,email:newEmail,password:newPd});
                $("#alarm_add").text('创建用户成功！');
                console.log('用户信息已上传');
                location.reload();
                /*ref.child('uid').on('child_added',function(snap){
                    snap.forEach(function(snapshot){
                        userKey = snapshot.key();
                        userVal = snapshot.val();

                        td1="<td id='td1'>"+ userVal .user+"</td>";
                        td2="<td id='td2'>"+ userVal .email+"</td>";
                        td3="<td id='td3'>"+"</td>";
                        $("#userList").append("<tr id='"+userKey+"'>"+td1+td2+td3+"</tr>");
                        e = document.createElement("input");
                        e.type = "button";
                        e.id = "removeBtn";
                        e.class = userKey;
                        e.value = "删除";
                        $("#"+userKey).find("#td3").append((e));
                        //------为按钮创建样式------------
                        var style = document.createElement('style');
                        style.type = 'text/css';
                        style.innerHTML="#removeBtn{ background-color:#24B432;color:white;width: 60px; height:30px;text-align:center;border: 1px solid #efefef }";
                        document.getElementsByTagName('HEAD').item(0).appendChild(style);
                    });

                });*/
            }else if(authData.password.email==newEmail||authData.password.name==newName){
                $("#alarm_add").text('用户已存在');
            } else if(newEmail.length==0||newPd.length==0){
                $("#alarm_add").text("邮箱或密码不能为空！");
            }else {
                $("#alarm_add").text('创建用户失败！');

            }
        });//创建用户
    }else{
        $('#adduser-btn').attr("disabled",true)
    }

}//创建用户并上传用户信息

function userList(){//读取数据


        ref.child('admin/info').once('value',function(snap) {
            snap.forEach(function (snapshot) {
                userKey = snapshot.key();
                prdVal = snapshot.child('prdGrop').val();
                tecVal= snapshot.child('techGrop').val();
                manager = snapshot.child('manager').val();

            users={user:userVal.name,email:userVal.email,id:userKey,password:userVal.password};
           if(authData){

                td1="<td id='td1'>"+users.user+"</td>";
                td2="<td id='td2'>"+users.email+"</td>";
                td3="<td id='td3'>"+"</td>";
                $("#userList").append("<tr id='"+userKey+"'>"+td1+td2+td3+"</tr>");
                e = document.createElement("input");
                e.type = "button";
                e.id = "removeBtn";
                e.class = userKey;
                e.value = "删除";
                $("#"+userKey).find("#td3").append((e));
                //------为按钮创建样式------------
                var style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML="#removeBtn{ background-color:#24B432;color:white;width: 60px; height:30px;text-align:center;border: 1px solid #efefef }";
                document.getElementsByTagName('HEAD').item(0).appendChild(style);

            }
        })
    })
}

function g(o){return document.getElementById(o);}

function HoverLi(m,n,counter){
    for(var i=1;i<=counter;i++){
        g('tab_'+m+i).className='';
        g('tabs_'+m+i).className='undis';
    }
    g('tabs_'+m+n).className='dis';
    g('tab_'+m+n).className='on';
}//侧边标签页

function alert_div(){
    alertShow= $('#alert_div');
    alertShow.show();
    login='<a href="./login.html">'+"登录"+'</a>';
    alertShow.children('p').append(login)
}//弹出层警告
$(document).ready(function(){ //------------------------------表单验证---------------------------//
    $('#logInForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {

            email: {
                validators: {
                    emailAddress: {
                        message: '输入不是有效的电子邮件地址'
                    },
                    stringLength:{
                        min:3,
                        max:30,
                        message:'字符长度在6-16位之间'
                    },
                    notEmpty: {
                        message: '邮箱地址不能为空'
                    }

                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength:{
                        min:6,
                        max:16,
                        message:'字符长度在6-16位之间'
                    }
                }
            }
        }
    });
    $('#regForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {

            email: {
                validators: {
                    emailAddress: {
                        message: '输入不是有效的电子邮件地址'
                    },
                    stringLength:{
                        min:3,
                        max:30,
                        message:'字符长度在6-16位之间'
                    },
                    notEmpty: {
                        message: '邮箱地址不能为空'
                    }

                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength:{
                        min:6,
                        max:16,
                        message:'字符长度在6-16位之间'
                    }
                }
            },
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength:{
                        min:2,
                        max:16,
                        message:'请输入真实姓'
                    }
                }
            }
        }
    });

    //Validate the form manually------点击按钮验证表单，实现用户登录
    $("#btn-logIn").click(function() {
        $('#logInForm').bootstrapValidator('validate');
        logIn();
    });
    $("#btn-reg").click(function(){
        $('#regForm').bootstrapValidator('validate');
        register();
    });

   // authData=wilddog.auth().currentUser;
    if(authData){

        $('#userName').text(authData.password.email);

        //-----------用户管理------------------
        userList();

        $(document).delegate('#removeBtn', 'click', function(trKey){

            trKey=this.class;
            trKeystr = String(trKey);
            trAll=$("#"+trKeystr);
            if(authData.password.email=="xyp@gsola.cn")
                r_ref=ref.removeUser({password:userVal.password,email:userVal.email},function(err,data){
                    if(err==null){
                        trAll.remove();
                        console.log(err,'用户已移除')}
                });
            /*tdKey=this.id;
             tdKeystr=String(tdKey);
             tdAll=$("#"+tdKeystr);
             tdAll.remove();*/

            removeUser(trKey);
        });//删除已存在用户

    }else{
        alert_div();


    }
    $("#logout-btn").click(function(){
        logOut()
    })
});