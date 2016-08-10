DS.$(function() {
    $$(".headnav").onclick = function() {
        $$(".navlist").classList.toggle("show");
    };

    AddTeam();

    scrollLoadingImg(0, document.documentElement.clientHeight);
});

window.addEventListener("scroll", function() {
    scrollLoadingImg(document.body.scrollTop, document.documentElement.clientHeight);
});


function AddTeam() {

    $$(".sendfilepic").onchange = function() {
        setImagePreview($$('.sendfilepic'), $$('#pic_file'), ['image'], {size: 1024 * 1024, num: 2})
    };

    $$(".sub").onclick = function() {
        var xhr = new XMLHttpRequest();
        xhr.open("post", "/user/api/userInfo", true);
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && /2\d{2}/.test(xhr.status)) {
                if (xhr.response == "ok") {
                    var img=document.createElement("img");
                    img.src=xhr.response;
                    document.body.appendChild(img);
                    //browserHistory.push(`user/${self.refs.name.value}`)
                }
            }
        };

        var _form = document.forms[0];

        var params = {
            name: _form.elements[0].value,
            phone: _form.elements[2].value,
            headimg: $$(".sendfilepic").files
        };

        var formdata = new FormData();
        formdata.append("name", _form.elements[0].value);
        formdata.append("phone", _form.elements[2].value);
        var headimg = _form.elements[1];

        var allFiles = $$(".sendfilepic").files;
        for(var i = 0; i < allFiles.length; i++) {
            formdata.append("headPortrait", allFiles[i]);
        }



        //formdata.append("headimg", $$(".sendfilepic").files[0], "2");
        //xhr.setRequestHeader("Content-Type", "multipart/form-data");
        xhr.send(formdata)
    };
}



function foucesRemoveError() {
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function(ele) {
        ele.oninput = function() {
            if(ele.classList.contains("inputerror")) {
                ele.classList.remove("inputerror")
            }
        }
    });
}