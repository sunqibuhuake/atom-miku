var MikuView;
var $ = require('jquery');

module.exports = MikuView = ( function() {
    function MikuView(serializedState) {
        this.randomId = Math.random().toString().split('.')[1];
        this.miku = null;
        /*
        * 创建超时空结界空间
        * */
        this.element = document.createElement('div');
        this.element.classList.add('mmdContainer');
        this.element.id = 'container_' + this.randomId;

        /*
        * 使用iframe导通器连接异次元，WHY?
        *   ①我懒
        *   ②我懒
        *   ③我懒
        * */
        var iframe = document.createElement('iframe');
        iframe.src = 'http://7xptga.com1.z0.glb.clouddn.com/index.v3.html' + '?num=' + Math.random;
        iframe.classList.add('mmdIframe');
        this.iframeName = 'iframe_' + this.randomId;
        iframe.id = this.iframeName;
        iframe.name = this.iframeName;
        this.element.appendChild(iframe);

        var loading = document.createElement('div');
        loading.classList.add('miku_loading');
        loading.id = 'loading_' + this.randomId;
        loading.innerHTML = 'loading...';
        this.element.appendChild(loading);

        /*
        * 添加负离子防御罩，启用时空拖拽
        * */
        var overlay = document.createElement('div');
        overlay.classList.add('mmdOverlay');
        overlay.id = 'overlay_' + this.randomId;

        //按钮组
        var btnGroup = document.createElement('div');
        btnGroup.classList.add('btnGroup');
        btnGroup.id = 'btnGroup_' + this.randomId;

        //静音
        var mute = document.createElement('div');
        mute.classList.add('miku_mute');
        mute.classList.add('miku_btn');
        mute.id = 'mute_' + this.randomId;
        mute.innerHTML = '静音';
        mute.setAttribute('name', 'mute');
        this.muteBtn = $('#' + mute.id);
        btnGroup.appendChild(mute);


        //恒定音乐
        var constantMusic = document.createElement('div');
        constantMusic.classList.add('miku_constantMusic');
        constantMusic.classList.add('miku_btn');
        constantMusic.id = 'constantMusic' + this.randomId;
        constantMusic.setAttribute('name', 'music');
        constantMusic.innerHTML = '音乐恒率';
        this.musicBtn = $('#' + constantMusic.id);
        btnGroup.appendChild(constantMusic);

        //恒定舞蹈
        var constantDance = document.createElement('div');
        constantDance.classList.add('miku_constantDance');
        constantDance.classList.add('miku_btn');
        constantDance.id = 'constantDance_' + this.randomId;
        constantDance.innerHTML = '看妹模式';
        constantDance.setAttribute('name', 'dance');


        this.danceBtn = $('#' + constantDance.id);
        btnGroup.appendChild(constantDance);

        overlay.appendChild(btnGroup);
        this.element.appendChild(overlay);
    }

    MikuView.prototype.serialize = function() {};

    MikuView.prototype.destroy = function() {

        return this.element.remove();
    };

    MikuView.prototype.getElement = function() {
        return this.element;
    };
    MikuView.prototype.setCount = function(count) {
        var displayText;
        displayText = "There are " + count + " words.";
        return this.element.children[0].textContent = displayText;
    }
    MikuView.prototype.initEventBind = function() {
        var that = this;
        that.iframe = $('#' + that.iframeName);
        that.container = $('#container_' + that.randomId);
        that.btnGroup = $('#btnGroup_' + that.randomId);
        that.overlay = $('#overlay_' + that.randomId);
        that.loading = $('#loading_' + that.randomId);
        that.iframe.load(function() {
            that.loading.css({
                display: 'none'
            })

        })
        $(document).mousemove(function(e) {
            if (!!this.move) {
                var posix = !document.move_target ? {
                        'x': 0,
                        'y': 0
                    } : document.move_target.posix,
                    callback = document.call_down || function() {
                            $(this.move_target).css({
                                'top': e.pageY - posix.y,
                                'left': e.pageX - posix.x
                            });
                        };

                callback.call(this, e, posix);
            }
        }).mouseup(function(e) {
            if (!!this.move) {
                var callback = document.call_up || function() {};
                callback.call(this, e);
                $.extend(this, {
                    'move': false,
                    'move_target': null,
                    'call_down': false,
                    'call_up': false
                });
            }
        });

        /*
        * 绑定时空转移事件
        * */
        that.container.mousedown(function(e) {
            console.log('mousedown');
            var offset = $(this).offset();
            this.posix = {
                'x': e.pageX - offset.left,
                'y': e.pageY - offset.top
            };
            $.extend(document, {
                'move': true,
                'move_target': this
            });
        });
        /*
        * TODO 缩放支持
        * */

        that.overlay.hover(function() {
            if (that.loading.is(':hidden')) {
                that.btnGroup.css({
                    display: 'block'
                });

            }
        }, function() {
            that.btnGroup.css({
                display: 'none'
            });
        });
        $('.miku_btn').click(function() {
            var elem = $(this);
            var name = elem.attr('name');
            console.log(name);
            if (elem.hasClass('miku_active')) {
                elem.removeClass('miku_active');
                that[name](false);
            } else {
                elem.addClass('miku_active');
                that[name](true);
            }
        })
    }
    /*
    * 增加帧数
    * */
    MikuView.prototype.addFrame = function(s) {
        if (this.miku && this.miku.control) {
            this.miku.control.addFrame(s);
        }
    }
    MikuView.prototype.play = function() {
        if (this.miku && this.miku.control) {
            this.miku.control.play();
        }
    }
    MikuView.prototype.pause = function() {
        if (this.miku && this.miku.control) {
            this.miku.control.pause();
        }
    }
    MikuView.prototype.mute = function(flag) {
        if (this.miku && this.miku.control) {
            this.miku.control.mute(flag);
        }
    }
    MikuView.prototype.music = function(flag) {
        if (this.miku && this.miku.control) {
            this.miku.control.music(flag);
        }
    }
    MikuView.prototype.dance = function(flag) {
        if (this.miku && this.miku.control) {
            this.miku.control.dance(flag);
        }
    }
    return MikuView;

} )();

