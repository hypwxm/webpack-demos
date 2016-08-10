//下面用于图片上传预览功能
function setImagePreview(avalue, ele) {
    var docObj=document.querySelector(".sendfilepic");

    var imgObjPreview=document.querySelector("#pic_file");
    if(docObj.files &&docObj.files[0])
    {
//火狐下，直接设img属性
        imgObjPreview.style.display = 'block';
        imgObjPreview.style.width = '3rem';
        imgObjPreview.style.height = '3rem';
//imgObjPreview.src = docObj.files[0].getAsDataURL();

//火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
        
        var img = document.createElement("img");
        img.src = window.URL.createObjectURL(docObj.files[0]);
        imgObjPreview.appendChild(img);
    }
    else
    {
//IE下，使用滤镜
        docObj.select();
        var imgSrc = document.selection.createRange().text;
        console.log(document.selection.createRange())
        var localImagId = document.querySelector(".pic_file");
//必须设置初始大小
        localImagId.style.width = "150px";
        localImagId.style.height = "180px";
//图片异常的捕捉，防止用户修改后缀来伪造图片
        try{
            localImagId.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
        }
        catch(e)
        {
            alert("您上传的图片格式不正确，请重新选择!");
            return false;
        }
        imgObjPreview.style.display = 'none';
        document.selection.empty();
    }
    return true;
}
