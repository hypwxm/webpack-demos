//下面用于图片上传和文件上传预览功能
//opts为可以传入的文件类型

var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame;


/*
* @params
*   @####opts
*  ********resource  file类型的元素  .类名或 #id********  必须
*  *  ********target  放置预览图区域  .类名或 #id********  可选
*  *  ********fullSize  总文件尺寸大小********  默认不限制
*  *  ********size  单文件尺寸大小限制********   默认不限制
*  *  ********num  上传最大文件总数********  默认不限制
*  *  ********allowedType********  限制文件类型
*  *  ********allowedExtensions********   限制文件扩展名
*  *  ********drag********   是否允许拖拽  （true时可拖拽）
*  *  ********exFilter********   方法，扩展的过滤器，必须返回一个数组，否则会报错
*  *  ********bigView********   是否允许用户放大图片
* */

function SetUploaderFilesPreview(opts) {
    this.files = [];  //单前页面预览图的所有可以上传成功的图片数组
    this.filesNameType = []; //单前页面预览图的所有可以上传成功的图片信息，防止重名添加格式为 （file.name + “，” + file.type）
    this.allSize = 0; //单前页面预览图的所有可以上传成功的图片总大小，有error属性的不会算入其中
    this.allNum = 0; //单前页面预览图的所有可以上传成功的图片总数，有error属性的不会算入其中
    this.index = 0; //页面中存在的预览区的图片的索引标识符，
    this.errors = 0; //为每个错误对象指定一个标识符
    this.opts = opts; //实例化后的传入参数
    this.init();
    this.cancelFile();
    this.cancelAll();
    this.allowedDrag();
    this.show();
}




//初始化参数
SetUploaderFilesPreview.prototype.init = function() {

    var self = this;

    //如果没有指定图片的放置区域，会自动生成，如果页面存在默认指定的类名，就使用。
    if (typeof self.opts.target == "undefined") {
        if (!document.querySelector(".filePreviewZone")) {
            var filePreviewZone = document.createElement("div");
            filePreviewZone.className = "filePreviewZone";
            document.body.appendChild(filePreviewZone);
        }

        //重新执行target的赋值
        self.opts.target = ".filePreviewZone";
    }

    //resource必须存在
    if (typeof self.opts.resource == "undefined") {
        throw new Error("You need a input with type of file.")
    }

    //resource的值必须是类名或id
    if(!/^[\.|#]/.test(self.opts.resource)) {
        throw new Error("You need set resource with a classname or id.")
    }

    self.change.call(self);
};

//是否开启拖拽
SetUploaderFilesPreview.prototype.allowedDrag = function() {
    var self = this;
    if(self.opts.drag = true) {
        self.fileDragEnter();
        self.fileDragLeave();
        self.fileDrop();
    }
}

SetUploaderFilesPreview.prototype.change = function () {

    var self = this;

    document.addEventListener("change", function (event) {
        var target = event.target;
        if (target.classList.contains(self.opts.resource.slice(1))) {
            var filesZone = document.querySelector(self.opts.resource);
            var filesPreview = document.querySelector(self.opts.target);
            if (filesZone.files && filesZone.files[0]) {

                //获取所有文件列表
                var allFiles = Array.prototype.slice.call(filesZone.files);

                if (allFiles.length == 0) {
                    return false;
                }


                allFiles = self.filterFiles(self, allFiles);

                if(!allFiles) {
                    return false;
                }

                var fileHTML = document.createDocumentFragment();

                for (var _file = 0, len = allFiles.length; _file < len; _file++) {
                    self.putFilesZone(allFiles[_file], fileHTML);
                }

                filesPreview.appendChild(fileHTML)
            }

            self.clearFile();
        }
    }, false);

};



//限制文件类型
SetUploaderFilesPreview.prototype.allowedType = function(allFiles) {
    var self = this;
    if(self.opts.allowedType) {
        if(!Array.isArray(self.opts.allowedType)) {
            throw new Error("AllowedType need to be an array");
        }
        if(self.opts.allowedType.length != 0) {
            var notAllowed = allFiles.some(function(ele) {
                return self.opts.allowedType.indexOf(ele.type.toLowerCase()) < 0;
            });

            if(notAllowed) {
                self.createLitTip("存在不允许的文件类型，请重新选择");
                alert("存在非法文件，请重新添加");
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    } else {
        return true;
    }
};


//限制文件扩展名
SetUploaderFilesPreview.prototype.allowedFileExtensions = function(allFiles) {
    var self = this;
    if(self.opts.allowedFileExtensions) {
        if(!Array.isArray(self.opts.allowedFileExtensions)) {
            throw new Error("AllowedType need to be an array");
        }
        if(self.opts.allowedFileExtensions.length != 0) {
            var notAllowed = allFiles.some(function(ele) {
                return self.opts.allowedFileExtensions.indexOf(ele.name.slice(ele.name.lastIndexOf(".") + 1, ele.name.length).toLowerCase()) < 0;
            });

            if(notAllowed) {
                self.createLitTip("存在不允许的文件扩展名，请重新选择");
                alert("存在非法扩展名，请重新添加");
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    } else {
        return true;
    }
};



//同文件判断
SetUploaderFilesPreview.prototype.sameFileHere = function(_self, newFiles) {
    var allFiles = newFiles.filter(function (ele) {

        if (_self.filesNameType.indexOf(ele.name + "," + ele.type) > -1) {
            _self.createLitTip(ele.name + "文件已存在。")
        }

        console.log(_self.filesNameType.indexOf(ele.name + "," + ele.type));

        return _self.filesNameType.indexOf(ele.name + "," + ele.type) < 0;
    });
    allFiles.forEach(function (ele) {
        _self.filesNameType.push(ele.name + "," + ele.type);
    });
    return allFiles;
};


//在设定了fullSize属性后，对新拉入的文件总大小进行判断，
SetUploaderFilesPreview.prototype.ifFilesTooBig = function(allFiles) {
    var self = this;
    if (self.opts.fullSize) {
        //文件总大小
        if (!/^\d+$/.test(self.opts.fullSize)) {
            throw new Error("Size need to be a number")
        } else {
            var allSize = 0;
            allFiles.forEach(function (ele) {
                if (self.opts.size && (Number(ele.size) <= Number(self.opts.size))) {
                    //单文件大小
                    if (!/^\d+$/.test(self.opts.size)) {
                        throw new Error("Size need to be a number")
                    } else {
                        allSize += Number(ele.size);
                    }
                } else {
                    allSize += Number(ele.size);
                }

            });
            if (self.allSize + allSize > self.opts.fullSize) {
                alert("文件大于" + self.opts.fullSize / 1024 / 1024 + "MB，无法完成上传。");
                self.createLitTip("文件大于" + self.opts.fullSize / 1024 / 1024 + "MB，添加失败。");

                var newNameType = [];
                allFiles.forEach(function(ele) {
                    newNameType.push(ele.name + "," + ele.type);
                });
                self.filesNameType = self.filesNameType.filter(function(ele) {
                    if(newNameType.indexOf(ele) < 0) {
                        return ele;
                    }
                });
                allFiles = [];
                self.clearFile();
                return false;
            } else {
                return true;
            }
        }
    } else {
        return true;
    }

};


//如果有size属性，判断单文件大小
SetUploaderFilesPreview.prototype.ifFileTooBig = function(_file) {
    var self = this;
    if (self.opts.size) {
        //单文件大小
        if (!/^\d+$/.test(self.opts.size)) {
            throw new Error("Size need to be a number")
        } else {

            if (Number(_file.size) > Number(self.opts.size)) {
                _file.error = "fileError" + self.errors;
                self.errors++;
                self.createLitTip(_file.name + "大小超过了" + self.opts.size / 1024 / 1024 + "MB，该文件不会上传。", _file.error);
            }

        }
    }
};


//如果有num属性，判断可上传文件总数
SetUploaderFilesPreview.prototype.allowedNumber = function(allFiles) {
    var self = this;
    if (self.opts.num) {
        if (!/^\d+$/.test(self.opts.num)) {
            throw new Error("num need to be a number")
        } else {
            if (Number(allFiles.length) + self.allNum > Number(self.opts.num)) {
                alert("最多只能上传" + self.opts.num + "个文件。");
                self.createLitTip("文件数量超过了" + self.opts.num + "个。");
                var newNameType = [];
                allFiles.forEach(function(ele) {
                    newNameType.push(ele.name + "," + ele.type);
                });
                self.filesNameType = self.filesNameType.filter(function(ele) {
                    if(newNameType.indexOf(ele) < 0) {
                        return ele;
                    }
                });
                self.clearFile();
                return false;
            } else {
                //self.allNum = self.allNum + Number(allFiles.length);
                return true;
            }
        }
    } else {
        return true;
    }
};

//清空file文本域
SetUploaderFilesPreview.prototype.clearFile = function () {
    var self = this;
    var filesZone = document.querySelector(self.opts.resource);
    var filesZoneClone = filesZone.cloneNode(true);
    filesZone.parentNode.insertBefore(filesZoneClone, filesZone);
    filesZoneClone.value = "";
    filesZone.parentNode.removeChild(filesZone);
};

//新增图片放入预览区
SetUploaderFilesPreview.prototype.putFilesZone = function (_file, target) {
    var self = this;
    _file.index = self.index;
    self.index++;
    var uploadFiles = document.createElement("a");
    uploadFiles.className = "uploadfiles";
    uploadFiles.setAttribute("name", _file.name);
    uploadFiles.setAttribute("type", _file.type);
    self.cancelFileDOM(uploadFiles);
    self.isFileLoadedDOM(uploadFiles)

    if (/image/.test(_file.type)) {
        var img = document.createElement("img");
        img.src = window.URL.createObjectURL(_file);


        uploadFiles.appendChild(img);

        if(self.opts.bigView == true) {
            self.bigView(uploadFiles);
        }

    } else {
        uploadFiles.appendChild(document.createTextNode(_file.name));
    }

    self.cancelAllDOM();

    if (_file.error && _file.error.indexOf("fileError") > -1) {
        uploadFiles.classList.add("fileError");
        uploadFiles.classList.add(_file.error);
    } else {
        self.allNum++;
        self.allSize += _file.size;
        self.files.push(_file);
    }

    self.fileInfo(uploadFiles, _file);

    uploadFiles.setAttribute("index", self.index - 1);
    uploadFiles.classList.add("uploadFiles" + (self.index - 1))
    target.appendChild(uploadFiles);
};

//取消按钮dom'
SetUploaderFilesPreview.prototype.cancelFileDOM = function (uploadFiles) {
    //取消上传
    var cancelfile = document.createElement("input");
    cancelfile.type = "button";
    cancelfile.className = "cancelfile";
    cancelfile.value = "";
    uploadFiles.appendChild(cancelfile);
};


//取消功能
SetUploaderFilesPreview.prototype.cancelFile = function () {
    var self = this;
    document.addEventListener("click", function (event) {
        var target = event.target;
        if (/cancelfile/.test(target.className)) {

            self.clearFile();
            if (document.querySelectorAll(".uploadfiles").length == 1) {
                self.files = [];
                self.filesNameType = [];
                document.querySelector(self.opts.target).innerHTML = "";
                self.allNum = 0;
                return;
            }

            if (!target.parentNode.classList.contains("fileError")) {

                self.files = self.files.filter(function (file) {
                    if (file.index == target.parentNode.getAttribute("index")) {
                        self.remove = file;
                    }
                    return file.index != target.parentNode.getAttribute("index");
                });
                if (self.remove) {
                    self.allSize -= Number(self.remove.size);
                    self.allNum--;
                    self.remove = null;
                }

            } else {
                var _class = target.parentNode.className.match(/(fileError\d+)/)[1];
                self.deleteOneTip(_class);
            }

            var _uploader = target.parentNode;
            var name = _uploader.getAttribute("name");
            var type = _uploader.getAttribute("type");
            self.filesNameType.splice(self.filesNameType.indexOf(name + "," + type), 1);

            target.parentNode.parentNode.removeChild(target.parentNode);
        }
    }, false)
};


//取消所有DOM
SetUploaderFilesPreview.prototype.cancelAllDOM = function () {
    var self = this;
    if (!document.querySelector(".cancelAll")) {
        var cancelAll = document.createElement("div");
        cancelAll.className = "cancelAll";
        document.querySelector(self.opts.target).appendChild(cancelAll);
    }
};

//取消所有
SetUploaderFilesPreview.prototype.cancelAll = function () {
    var self = this;
    document.addEventListener("click", function (event) {
        var target = event.target;
        if (target.classList.contains("cancelAll")) {
            self.clearFile();
            document.querySelector(self.opts.target).innerHTML = "";
            self.filesNameType = [];
            self.files = [];
            self.allNum = 0;
        }
    }, false)
};


//是否上传dom
SetUploaderFilesPreview.prototype.isFileLoadedDOM = function (uploadFiles) {
    //显示是否已经上传
    var fileloaded = document.createElement("span");
    fileloaded.title = "还未上传";
    fileloaded.className = "fileloaded";
    fileloaded.innerText = "no";
    uploadFiles.appendChild(fileloaded);
};


//放大镜DOM
SetUploaderFilesPreview.prototype.bigViewDOM = function() {
    if(document.querySelector(".showView")) return;
    var showView = document.createElement("div");
    showView.className = "showView";
    var closeView = document.createElement("span");
    closeView.className = "closeView";
    closeView.innerHTML = "close";
    showView.appendChild(closeView);
    document.body.appendChild(showView);
};


//可选的左右切换按钮
SetUploaderFilesPreview.prototype.viewChangeBtnDOM = function() {
    var self = this;
    var changeBtn = document.createElement("div");
    changeBtn.className = "changeBtn";
    if(document.querySelector(".showView")) {
        document.querySelector(".showView").appendChild(changeBtn);
    } else {
        self.bigViewDOM();
        arguments.callee();
    }
};


//放大镜
SetUploaderFilesPreview.prototype.bigView = function (uploadFiles) {
    var bigview = document.createElement("span");
    bigview.title = "点击放大图片";
    bigview.className = "bigview";
    //bigview.innerText = "";
    uploadFiles.appendChild(bigview);
};


//点击放大镜，点击事件
SetUploaderFilesPreview.prototype.show = function() {
    var self = this;
    document.addEventListener("click", function(event) {
        self.disableMove();
        var target = event.target;
        if(target.classList.contains("bigview")) {
            self.showBegin(target, self);
            var showView = document.querySelector(".showView");
            showView.classList.add("openedview");
            showView.classList.add("viewinit");
            setTimeout(function() {
                showView.classList.remove("openedview");
                showView.style.cssText = "height:90%;width:90%;left:5%;top:5%;";
            }, 600);
            self.closeView(self);
        }
    }, false)
};


//阻止默认事件
SetUploaderFilesPreview.prototype.prevent = function(event) {
    event.preventDefault();
};


//图片放大，禁止屏幕拖动
SetUploaderFilesPreview.prototype.disableMove = function() {
    var self = this;
    document.addEventListener("touchmove", self.prevent, false)
};


//关闭预览图，打开可拖动
SetUploaderFilesPreview.prototype.enableMove = function() {
    var self = this;
    document.removeEventListener("touchmove", self.prevent, false)
};


//预览图放大
SetUploaderFilesPreview.prototype.showBegin = function(img, self) {
    self.bigViewDOM();
    var showView = document.querySelector(".showView");
    var viewimgbox = document.createElement("div");
    viewimgbox.className = "viewimgbox";
    var innerBox = document.createElement("div");
    innerBox.className = "innerBox";
    viewimgbox.appendChild(innerBox);
    showView.appendChild(viewimgbox);
    var sourceimg = img.previousSibling;
    var sourcesec = sourceimg.src;
    var viewimg = document.createElement("img");
    viewimg.className = "viewimg";
    viewimg.src = sourcesec;
    var viewposition = sourceimg.getBoundingClientRect();
    var viewleft = viewposition.left;
    var viewtop = viewposition.top;
    var viewHeight = sourceimg.clientHeight;
    var viewWidth = sourceimg.clientWidth;
    innerBox.appendChild(viewimg);
    showView.style.left = viewleft + "px";
    showView.style.top = viewtop + "px";
    showView.style.width = viewWidth + "px";
    showView.style.height = viewHeight + "px";
};


//关闭预览图
SetUploaderFilesPreview.prototype.closeView = function(self) {
    document.addEventListener("click", function(event) {
        var target = event.target;
        if(target.classList.contains("closeView")) {
            self.enableMove();
            var showView = document.querySelector(".showView");
            showView.classList.add("thisviewclose");
            setTimeout(function() {
                showView.parentNode.removeChild(showView);
            }, 600);

            document.removeEventListener("click", arguments.callee, false);
        }
    }, false)
};


//错误放置处
SetUploaderFilesPreview.prototype.createErrorTips = function () {
    var self = this;
    if (!document.querySelector(".errortips")) {
        var errorTips = document.createElement("div");
        errorTips.className = "errortips";
        document.querySelector(self.opts.target).appendChild(errorTips);

        //绑定提示删除事件，用的事件委托，所以绑定一次就行了。
        self.deleteOneTip();
    }

    return !!errorTips ? errorTips : document.querySelector(".errortips");
};

//错误小提示dom
SetUploaderFilesPreview.prototype.createLitTip = function (text, _class) {
    var self = this;
    var litTip = document.createElement("span");
    litTip.className = "litTip";
    litTip.innerText = text;
    var deltip = document.createElement("em");
    deltip.className = "deltip";
    if (typeof _class != "undefined") {
        litTip.classList.add(_class);
    }
    litTip.appendChild(deltip);
    self.createErrorTips().appendChild(litTip);
};


//删除一条错误提示
SetUploaderFilesPreview.prototype.deleteOneTip = function (_class) {

    var tamptime = 300;

    if (typeof _class != "undefined" && /fileError/.test(_class)) {
        document.querySelector("." + _class).style.cssText = "opacity:0;transition: opacity " + tamptime + "ms;-webkit-transition:opacity " + 2000 + "ms";
        setTimeout(function () {
            document.querySelector("." + _class).parentNode.removeChild(document.querySelector("." + _class));
        }, tamptime);
    } else {
        document.addEventListener("click", function (event) {
            var target = event.target;
            if (target.classList.contains("deltip")) {
                target.parentNode.style.cssText = "opacity:0;transition: opacity " + tamptime + "ms;-webkit-transition:opacity " + 2000 + "ms";
                setTimeout(function () {
                    target.parentNode.parentNode.removeChild(target.parentNode);
                }, tamptime)

            }
        })
    }
};


//上传进度
SetUploaderFilesPreview.prototype.progress = function (xhr, _extend) {
    var self = this;
    if (!document.querySelector(".progressView")) {
        var progressView = document.createElement("div");
        progressView.className = "progressView";
    }
    progressView = progressView ? progressView : document.querySelector(".progressView");
    xhr.upload.addEventListener("progress", function (event) {
        if (typeof _extend == "function") {
            _extend(event, xhr);
        } else {
            var up = document.querySelector(self.opts.target);
            up.appendChild(progressView);
            var upH = up.clientHeight;
            var inittop = 0;
            if (event.lengthComputable) {
                var percentage = (event.loaded * 100) / event.total;
                progressView.innerHTML = percentage.toFixed(2) + "%";
                //progressView.style.transform = "translate3d(0," + upH * percentage/100 + "px,0)";
                //progressView.style.transition = "all 1s";
                progressView.style.top = upH * percentage / 100 + "px";
                if (percentage == 100) {
                    self._evloaded = true;
                }
            }
        }
    }, false)
};


//上传结束
SetUploaderFilesPreview.prototype.loaded = function (xhr, _extend) {
    var self = this;
    xhr.upload.addEventListener("load", function (event) {
        if (typeof _extend == "function") {
            _extend(event, xhr)
        } else {
            if (event.lengthComputable) {
                var isloadedDOM = Array.prototype.slice.call(document.querySelectorAll(".fileloaded"));
                for (var i = 0; i < isloadedDOM.length; i++) {
                    if(!isloadedDOM[i].parentNode.classList.contains("fileError")) {
                        isloadedDOM[i].innerHTML = "yes"
                    }

                }
                if (self._evloaded == true) {
                    if (document.querySelector(".progressView")) {
                        var view = document.querySelector(".progressView");
                        view.parentNode.removeChild(view);
                    }
                    self._evloaded = false;
                }

            }
        }
    })
};


//上传出错
SetUploaderFilesPreview.prototype.error = function(xhr, _extend) {
    var self = this;
    xhr.upload.addEventListener("error", function (error) {
        if (typeof _extend == "function") {
            _extend(error, xhr)
        } else {
            if(error) {
                alert("error:" + error)
            }
        }
    })
};


//文件大小提示
SetUploaderFilesPreview.prototype.fileInfo = function (uploadFiles, _file) {
    var self = this;
    var fileTip = document.createElement("span");
    fileTip.className = "fileTip";
    fileTip.innerText = _file.size / 1024 / 1024 >= 1 ? (_file.size / 1024 / 1024).toFixed(2) + "MB" : (_file.size / 1024).toFixed(2) + "KB";
    uploadFiles.appendChild(fileTip);
};


//文件拖拽
//进入
SetUploaderFilesPreview.prototype.fileDragEnter = function() {
    var self = this;
    var filesPreview = document.querySelector(self.opts.target);
    filesPreview.addEventListener("dragenter", function(event) {
        event.stopPropagation();
        event.preventDefault();

        filesPreview.classList.add("filedragenter");
    }, false)

};


//过滤，将过滤的方法总结起来,,在原来的判断基础上，支持扩展，扩展必须返回一个允许的数组，否则会报错
SetUploaderFilesPreview.prototype.filterFiles = function(self, allFiles, exFilter) {


    //判断类型
    if(!self.allowedType.call(self, allFiles)) {
        return false;
    }

    //判断扩展名
    if(!self.allowedFileExtensions.call(self, allFiles)) {
        return false;
    }

    //判断同名
    var newDragFiles = self.sameFileHere(self, allFiles);


    //判断总文件大小
    if(!self.ifFilesTooBig.call(self, allFiles)) {
        return false;
    }


    //判断文件总数
    if(!self.allowedNumber.call(self, allFiles)) {
        return false;
    }

    //判断单个文件大小
    for(var _file = 0; _file < allFiles.length; _file++) {
        -function(file) {
            self.ifFileTooBig.call(self, file);
        }(allFiles[_file])
    }


    var newFiles = [];

    exFilter = self.opts.exFilter;

    if(typeof exFilter == "function") {
        if(!Array.isArray(exFilter(allFiles))) {
            throw new Error("Callback need return a data with type of array.");
        } else {
            newFiles = exFilter(allFiles);
        }
    } else {
        newFiles = newDragFiles;
    }

    return newFiles;
};


//获取目标dom

SetUploaderFilesPreview.prototype.getTargetDOM = function(_self) {
    return document.querySelector(_self.opts.target);
};

//dragover  不对drogover进行preventdefault。drop事件无法触发，，并且还要return，不然浏览器会奔溃
SetUploaderFilesPreview.prototype.fileDragEnter = function() {
    var self = this;
    var filesPreview = self.getTargetDOM(self);
    filesPreview.addEventListener("dragover", function(event) {
        event.stopPropagation();
        event.preventDefault();
        return false;
    }, false)
};

//文件拖拽
//出去drag
SetUploaderFilesPreview.prototype.fileDragLeave = function() {
    var self = this;
    var filesPreview = self.getTargetDOM(self);
    filesPreview.addEventListener("dragleave", function(event) {
        event.preventDefault();
        event.stopPropagation();
        filesPreview.classList.remove("filedragenter");
    }, false)

};


//文件拖拽
//放入
SetUploaderFilesPreview.prototype.fileDrop = function() {
    var self = this;
    var filesPreview = self.getTargetDOM(self);
    filesPreview.addEventListener("drop", function(event) {
        event.stopPropagation();
        event.preventDefault();
        var dragFiles = Array.prototype.slice.call(event.dataTransfer.files);

        var newDragFiles = self.filterFiles(self, dragFiles);

        if(!newDragFiles) {
            return false;
        }

        for(var _file = 0; _file < newDragFiles.length; _file++) {
            self.putFilesZone(newDragFiles[_file], filesPreview);
        }

    }, false)

};