(function($, undefined) {
    var noSupport = ["GT-P7"];
    var appVersion = navigator.appVersion.toLowerCase();
    var isSupport = true;
    for (var j = 0; j < noSupport.length; j++) {
        if (appVersion.indexOf(noSupport[j].toLowerCase()) > 0) {
            isSupport = false
        }
    }
    $(document).bind("mobileinit", function() {
        $.mobile.defaultPageTransition = "slide";
        $.mobile.transitionFallbacks.slideout = "none";
        $.mobile.page.prototype.options.domCache = false
    });
    $(document).on("click", ".getMsgcode", function(event) {
        var dataForm = $(this).parents(".formbox");
        var flag = checkValidateBeforGetToken(dataForm);
        if (flag) {
            var url = $("#sendMobileTokenUrl").val();
            var option = {};
            dataForm.find("input[type='hidden']").each(function() {
                eval("option." + $(this).attr("name") + "='" + $(this).val() + "'")
            });
            dataForm.find("input[type='text'],input[type='password'],input[type='tel'],input[type='hidden'],input[type='checkbox']").each(function() {
                eval("option." + $(this).attr("name") + "='" + $(this).val() + "'");
                if ($(this).attr("id") != "text-vcode") {
                    if ($(this).attr("check-disabled") != "false") {
                        $(this).addClass("ui-disabled").attr("readonly", "readonly")
                    }
                }
            });
            var quickOption = dataForm.find("#checkbox-1a");
            if (quickOption.length == 1) {
                var acceptQuickpay = "off";
                if (quickOption.is(":checked")) {
                    acceptQuickpay = "on"
                }
                eval("option.supportQuickPay='" + acceptQuickpay + "'")
            }
            getMobileToken($(this), url, option, dataForm)
        } else {
            var info = dataForm.parents("#content_c").next(".info-layer");
            info.css("display", "block")
        }
        event.stopPropagation();
        return false
    });
    $(document).on("click", ".addMoreCard", function() {
        $(".moreCardList").toggle();
        $(this).find(".ui-icon").toggleClass("ui-icon-arrow-d")
    });
    $(document).on("focus", "input[type='text'],input[type='password'],input[type='tel']", function() {
        var obj = $(this);
        obj.css("color", "#000");
        obj.removeClass("error_placeholder");
        obj.prev("span").css("color", "#000");
        $(".info-layer").css("display", "none")
    });
    $(document).on("click", ".stepBtn", function(e) {
        e.preventDefault();
        var btn = $(this);
        var flag = true;
        if (btn.hasClass("ui-disabled") || btn.hasClass("btn_nor")) {
            return
        }
        btn.parents("form").find("input[type='text'],input[type='password'],input[type='tel']").each(function() {
            var val = $(this).val();
            var vtpe = $(this).data("validtype");
            var validText = $(this).data("validtext");
            var formBox = $(this).parents(".formbox");
            var itemBox = $(this).parents("li");
            if (val == "" || !validate(val, vtpe)) {
                flag = false;
                $(this).css("color", "#f54d4f");
                $(this).prev("span").css("color", "#f54d4f");
                $(this).addClass("error_placeholder")
            }
        });
        if (flag) {
            btn.parents("form").submit();
            btn.addClass("btn_nor cc").removeClass("btn_im")
        } else {
            var info = btn.parents("form").parents("#content_c").next(".info-layer");
            info.css("display", "block")
        }
    });
    $(document).on("blur", "#text_cardNumber", checkCard);
    $(document).on("input propertychange", "#text_cardNumber", function() {
        var _val = this.value;
        _val = _val.replace(/\s/g, "");
        var _before = this.value;
        if (_val.length > 19) {
            this.value = subStrLen(_before, _before.length - 1)
        }
    });
    $(document).on("blur", "#text-id", checkId);
    function checkCard(checkCard) {
        var _val = this.value.replace(/\D/g, "");
        var _valList = [];
        for (var k = 0; k < _val.length; k++) {
            if (_val.charAt(k) != " ") {
                _valList.push(_val.charAt(k))
            }
        }
        if (_valList.length >= 19 && $(this).attr("data-validtext") == "bank card number") {
            this.style.fontSize = "0.9em"
        } else {
            this.style.fontSize = "1em"
        }
        var _tempList = [];
        for (var i = 0; i < _valList.length; i++) {
            _tempList.push(_valList[i]);
            if ((i != 0) && ((i % 4) == 3)) {
                _tempList.push(" ")
            }
        }
        var _trimTempList = subStrLen($.trim(_tempList.join("")), 23);
        this.value = _trimTempList
    }
    function checkId(checkId) {
        var _val = this.value.replace(/\s/g, "");
        var _valList = [];
        for (var k = 0; k < _val.length; k++) {
            if (_val.charAt(k) != " ") {
                _valList.push(_val.charAt(k))
            }
        }
        var _tempList = [];
        for (var i = 0; i < _valList.length; i++) {
            if (i >= 5) {
                _tempList.push(_valList[i]);
                if (((i - 6) % 4) == 3 || ((i - 5) == 0)) {
                    _tempList.push(" ")
                }
            } else {
                _tempList.push(_valList[i])
            }
        }
        _trimTempList = subStrLen($.trim(_tempList.join("")), 21);
        this.value = _trimTempList
    }
    function locatePoint(obj, position) {
        if (obj.setSelectionRange) {
            setTimeout(function() {
                obj.setSelectionRange(position, position);
                obj.focus()
            }, 0)
        } else {
            if (obj.createTextRange) {
                var txt = obj.createTextRange();
                txt.move("character", position);
                txt.select()
            }
        }
    }
    function subStrLen(str, len) {
        if (str.length > len) {
            return str.substr(0, len)
        } else {
            return str
        }
    }
    $(document).on("keyup", "#text-name", function(e) {
        changeSize(this);
        var v = $(this).val();
        var reg = (/^[0-9a-zA-Z]*$/g);
        if (reg.test(v)) {
            lengthControl(this, v, 20)
        } else {
            lengthControl(this, v, 16)
        }
    });
    $(document).on("blur", "#mobile,#text-tel ", function() {
        var v = $(this).val();
        lengthControl(this, v, 11)
    });
    $(document).on("blur", "#text-cvv2", function() {
        var v = $(this).val();
        lengthControl(this, v, 4)
    });
    $(document).on("blur", "#text-validTime,#expiredDate", function() {
        var v = $(this).val();
        lengthControl(this, v, 4)
    });
    $(document).on("keyup", "#text-cvv2", function(e) {
        var reg = (/^[0-9]*$/g);
        var v = $(this).val();
        if (!reg.test(v)) {
            v = v.replace(/\D/g, "")
        }
        if (v.length > 4) {
            v = v.substring(0, v.length - 1)
        }
        $(this).val(v)
    });
    $(document).on("keyup", "#text-validTime", function(e) {
        changeSize(this);
        var reg = (/^[0-9]*$/g);
        var v = $(this).val();
        if (!reg.test(v)) {
            $(this).val($(this).val().replace(/\D/g, ""))
        }
        v = $(this).val();
        lengthControl(this, v, 4)
    });
    $(document).on("keyup", "#expiredDate", function(e) {
        changeSize(this);
        var reg = (/^[0-9]*$/g);
        var v = $(this).val();
        if (!reg.test(v)) {
            $(this).val($(this).val().replace(/\D/g, ""))
        }
        v = $(this).val();
        reg = /\d$/;
        if (!reg.test(v)) {
            v = v.substring(0, v.length - 1);
            $(this).val(v)
        }
        lengthControl(this, v, 4)
    });
    $(document).on("keyup", "#text-tel", function(e) {
        changeSize(this);
        var reg = (/^[0-9]*$/g);
        var v = $(this).val();
        if (!reg.test(v)) {
            $(this).val($(this).val().replace(/\D/g, ""))
        }
        v = $(this).val();
        lengthControl(this, v, 11)
    });
    $(document).on("keyup", "#mobile", function(e) {
        changeSize(this);
        var reg = (/^[0-9]*$/g);
        var v = $(this).val();
        if (!reg.test(v)) {
            $(this).val($(this).val().replace(/\D/g, ""))
        }
        v = $(this).val();
        lengthControl(this, v, 11)
    });
    $(document).on("keyup", "#text-vcode", function(e) {
        var reg = (/^[0-9]*$/g);
        var v = $(this).val();
        if (!reg.test(v)) {
            $(this).val($(this).val().replace(/\D/g, ""))
        }
        v = $(this).val();
        lengthControl(this, v, 6)
    })
}
)(jQuery);
function changeSize(obj) {
    var t = $(obj);
    if (t.val() == "") {
        t.css("font-size", "0.875em")
    } else {
        t.css("font-size", "1em")
    }
}
function lengthControl(obj, v, len) {
    if (v.length > len) {
        v = v.substring(0, v.length - 1);
        $(obj).val(v)
    }
}
function backToFirst(obj) {
    var fullUrl = $(obj).attr("url");
    $.mobile.changePage(fullUrl, {
        type: "post",
        changeHash: true
    });
    return false
}
function errorBox(title, msg, callback) {
    if (msg == "null") {
        return
    }
    if (mobile_lan == 2) {
        $.confirm({
            "title": title,
            "message": msg,
            "buttons": {
                "OK": {
                    "class": "btnRed",
                    "action": callback
                }
            }
        })
    } else {
        $.confirm({
            "title": title,
            "message": msg,
            "buttons": {
                "确定": {
                    "class": "btnRed",
                    "action": callback
                }
            }
        })
    }
}
function checkForm(obj) {
    pass = true;
    if (obj.find(".form_error_tip").length != 0) {
        pass = false
    } else {
        obj.find("input[type='text'],input[type='password'],input[type='tel']").each(function() {
            if ($(this).val() == "") {
                if (mobile_lan == 2) {
                    var tip = "Please fill in "
                } else {
                    var tip = "请输入"
                }
                $(this).parents(".li").after('<div class="form_error_tip">' + tip + $(this).data("validtext") + "</div>");
                $(this).focus();
                pass = false;
                return false
            }
        })
    }
    return pass
}
function checkValidateBeforGetToken(dataForm) {
    var pass = true;
    dataForm.find("input[type='text'],input[type='password'],input[type='tel']").each(function() {
        var obj = $(this);
        var cm = obj.attr("check-mobilecode");
        if (obj.attr("name") == "vcode" || cm == "false") {} else {
            if (obj.val() == "" || !validate(obj.val(), obj.data("validtype"))) {
                pass = false;
                obj.css("color", "#f54d4f");
                obj.addClass("error_placeholder");
                obj.prev("span").css("color", "#f54d4f")
            }
        }
    });
    return pass
}
function validate(v, t) {
    var reg;
    switch (t) {
    case "cardNum":
        v = v.replace(/\s/g, "");
        reg = /^(\d{14,20})$/;
        if (!reg.test(v)) {
            return false
        } else {
            return true
        }
        break;
    case "idCard":
        var arrVerifyCode = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
        var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var Checker = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1];
        var v = v.toUpperCase().replace(/\s/g, "");
        if (v.length != 15 && v.length != 18) {
            return false
        }
        var Ai = v.length == 18 ? v.substring(0, 17) : v.slice(0, 6) + "19" + v.slice(6, 16);
        if (!/^\d+$/.test(Ai)) {
            return false
        }
        var yyyy = Ai.slice(6, 10)
          , mm = Ai.slice(10, 12) - 1
          , dd = Ai.slice(12, 14);
        var d = new Date(yyyy,mm,dd)
          , now = new Date();
        var year = d.getFullYear()
          , mon = d.getMonth()
          , day = d.getDate();
        if (year != yyyy || mon != mm || day != dd || d > now || year < 1940) {
            return false
        }
        for (var i = 0, ret = 0; i < 17; i++) {
            ret += Ai.charAt(i) * Wi[i]
        }
        Ai += arrVerifyCode[ret %= 11];
        return v.length == 18 && v != Ai ? false : true;
        break;
    case "validTime":
        reg = /^(\d{4})$/;
        var firstNum = v.substring(0, 2) - 0;
        if (!reg.test(v) || firstNum > 12) {
            return false
        } else {
            return true
        }
        break;
    case "cvv2":
        reg = /^(\d{3,4})$/;
        if (!reg.test(v)) {
            return false
        } else {
            return true
        }
        break;
    case "tel":
        var patrn = /(^1[3|4|5|6|7|8|9][0-9]{9}$)/;
        if (!patrn.exec(v)) {
            return false
        }
        return true;
        break;
    case "pName":
        var reg = (/^[0-9a-zA-Z]*$/g);
        if (reg.test(v)) {
            if (v.length > 20) {
                return false
            }
        } else {
            if (v.length > 16) {
                return false
            }
        }
        return true;
        break;
    case "vcode":
        var reg = (/^[0-9]*$/g);
        if (reg.test(v)) {
            if (v.length == 6) {
                return true
            }
        }
        return false;
        break;
    default:
        return true
    }
}
function getMobileToken(obj, url, option, dataForm) {
    obj.addClass("ui-disabled btn_nor").removeClass("btn_im");
    if (mobile_lan == 2) {
        obj.text("Processing...")
    } else {
        obj.text("请求发送中...")
    }
    jQuery.post(url + "&lan=" + mobile_lan + "&date=" + new Date(), option, function(data) {
        if (data.indexOf("<!-- sessionTimeOut") != -1) {
            $.mobile.changePage("mobileSessionExpired.htm", {
                type: "get"
            });
            return
        } else {
            data = eval("(" + data + ")")
        }
        if (data.errorCode == 0) {
            countDown(obj, 59);
            dataForm.find("input[type='button']").removeClass("ui-disabled btn_nor").addClass("btn_im")
        } else {
            if (mobile_lan == 2) {
                errorBox("Note", data.errorMessage)
            } else {
                errorBox("提示", data.errorMessage)
            }
            dataForm.find("input[type='text'],input[type='password'],input[type='tel'],input[type='checkbox']").each(function() {
                $(this).removeClass("ui-disabled").removeAttr("readonly")
            });
            obj.removeClass("ui-disabled btn_nor").addClass("btn_im");
            if (mobile_lan == 2) {
                obj.find(".ui-btn-text").text("Retrieve")
            } else {
                obj.text("重新获取")
            }
        }
    }, "text")
}
function countDown(obj, second) {
    if (mobile_lan == 2) {
        if (second > 0) {
            obj.text("Retry after " + second + "s");
            second--;
            setTimeout(function() {
                countDown(obj, second)
            }, 1000)
        } else {
            obj.text("Retrieve");
            obj.removeClass("ui-disabled btn_nor").addClass("btn_im")
        }
    } else {
        if (second > 0) {
            obj.text(second + "秒后重发");
            second--;
            setTimeout(function() {
                countDown(obj, second)
            }, 1000)
        } else {
            obj.text("重新获取");
            obj.removeClass("ui-disabled btn_nor").addClass("btn_im")
        }
    }
}
function showSupportCard(obj) {
    var url = $(obj).attr("url") + "&time=" + (new Date()).getTime();
    $.mobile.changePage(url, {
        type: "get"
    })
}
function footHeight() {
    var f = $(".test");
    f.each(function() {
        $(this).css({
            display: "block"
        })
    })
}
function footHide() {
    var f = $(".test");
    f.each(function() {
        $(this).css({
            display: "none"
        })
    })
}
(function($) {
    $.confirm = function(params) {
        if ($("#confirmOverlay").length) {
            return false
        }
        var buttonHTML = "";
        $.each(params.buttons, function(name, obj) {
            buttonHTML += '<a href="#" class="button ' + obj["class"] + '">' + name + "<span></span></a>";
            if (!obj.action) {
                obj.action = function() {}
            }
        });
        var markup = ['<div id="confirmOverlay">', '<div id="confirmBox">', "<h3>", params.title, "</h3>", "<p>", params.message, "</p>", '<div id="confirmButtons">', buttonHTML, "</div></div></div>"].join("");
        $(markup).hide().appendTo("body").fadeIn();
        var buttons = $("#confirmBox .button")
          , i = 0;
        $.each(params.buttons, function(name, obj) {
            buttons.eq(i++).click(function() {
                obj.action();
                $.confirm.hide();
                return false
            })
        })
    }
    ;
    $.confirm.hide = function() {
        $("#confirmOverlay").fadeOut(function() {
            $(this).remove()
        })
    }
}
)(jQuery);
(function($) {
    i18n_cn = {
        "back": "返回",
        "pro_name": "商品名称：",
        "pro_price": "应付金额 　",
        "mer_name": "商户名称：",
        "ord_time": "订单时间：",
        "ord_num": "订单编号：",
        "price_1": "¥ ",
        "card_p": "卡号",
        "card_v": "银行卡号",
        "name": "姓名",
        "num": "身份证号",
        "valid_v": "卡正面有效期",
        "valid_p": "月份/年份 如 0819",
        "valid": "卡有效期",
        "code_v": "cvv2",
        "code_p": "卡验证码",
        "mobile": "银行预留手机号",
        "mobile2": "短信发送手机号码",
        "code": "验证码",
        "getCode": "获取验证码",
        "pay": "确认支付",
        "protocol": "《快钱快捷支付协议》",
        "agree": "同意 ",
        "addcard": "添加新银行卡",
        "number2": "手机号",
        "othercard": "使用其他银行卡",
        "codetip": "银行会向您预留的手机号码发送验证码",
        "msgtip": "您的交易短信将发送到本手机号中",
        "number": "手机号码",
        "credit": "信用卡",
        "debit": "储蓄卡",
        "hot": "热门",
        "change1": "更换本行其他卡",
        "change2": "更换其他卡",
        "goBack": "返回上一页",
        "edit": "编辑",
        "do": "完成",
        "card": "卡号",
        "vali": "有效期",
        "dycode": "验证码",
        "cvv2": "卡背面签名栏后三位",
        "cvv": "CVV2",
        "null": ""
    };
    i18n_en = {
        "back": "Back",
        "pro_name": "Goods:",
        "pro_price": "Price: ",
        "mer_name": "Merchant:",
        "ord_time": "Time:",
        "ord_num": "Order No:",
        "price_1": "RMB ",
        "card_p": "Enter bank card number",
        "card_v": "bank card number",
        "name": "Name",
        "num": "ID",
        "valid_v": "Expiration Date",
        "valid_p": "Expiration Date,mmYY.",
        "valid": "Expiration Date",
        "code_v": "cvv2",
        "code_p": "CVV2",
        "mobile": "Registered Mobile Number",
        "mobile2": "mobile number",
        "code": "Verification code",
        "getCode": "Get SMS Code",
        "pay": "Confirm",
        "protocol": "99Bill express payment",
        "agree": "Agree ",
        "addcard": "Add new card",
        "number2": "Phone",
        "othercard": "Use other card",
        "codetip": "The bank will send verification code to your reserved mobile number",
        "msgtip": "Your transaction message will be sent to this phone",
        "number": "Mobile number",
        "credit": "Credit Card",
        "debit": "Debit Card",
        "hot": "HOT",
        "change1": "Replace other cards",
        "change2": "Replace other cards",
        "goBack": "Back",
        "edit": "Edit",
        "do": "Done",
        "card": "Card No.",
        "vali": "Validity",
        "dycode": "SMS Code",
        "cvv2": "",
        "cvv": "CVV2",
        "null": ""
    }
}
)(jQuery);
function i18nReplace(event, data) {
    if (typeof (mobile_lan) == "undefined" || typeof (data.nextPage) == "undefined") {
        return true
    }
    var page = $(data.nextPage);
    var langFlag = $("#langFlag", page);
    if (langFlag.length == 1) {
        var lan_flag = langFlag[0].value;
        if (lan_flag == mobile_lan) {
            return true
        }
        langFlag[0].value = mobile_lan;
        var $lan_btn = $("#lan_btn", page);
        if (mobile_lan == 1) {
            $lan_btn.text("EN")
        } else {
            $lan_btn.text("中")
        }
        if (mobile_lan == 1) {
            var i18nMap = i18n_cn
        } else {
            var i18nMap = i18n_en
        }
        var $pro_price = $("#pro_price", page);
        if ($pro_price.length == 1) {
            $pro_price.text(i18nMap["pro_price"]);
            var price = $pro_price.attr("value");
            $pro_price.next(".price").text(i18nMap["price_1"] + price)
        }
        var $btns = $("input[type=button]", page);
        $btns.each(function() {
            var $btn = $(this);
            if (typeof ($btn.attr("i18n")) != "undefined") {
                $btn.val(i18nMap[$btn.attr("i18n")])
            }
        });
        var $inputs = $("input[p_i18n]", page);
        $inputs.each(function() {
            var $input = $(this);
            if (typeof ($input.attr("p_i18n")) != "undefined") {
                $input.attr("placeholder", i18nMap[$input.attr("p_i18n")]);
                $input.data("validtext", i18nMap[$input.attr("v_i18n")])
            }
        });
        var $links = $("[i18n2]", page);
        $links.each(function() {
            var $link = $(this);
            $link.text(i18nMap[$link.attr("i18n2")])
        });
        var tips = $(".form_error_tip", page);
        tips.each(function() {
            $(this).remove()
        })
    }
}
function agreement(callback) {}
var supportsOrientationChange = "onorientationchange"in window
  , orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
window.addEventListener(orientationEvent, function() {
    $(window).width("100%");
    var ua = navigator.userAgent;
    var deviceType = "";
    if (ua.indexOf("iPad") > 0) {
        deviceType = "isIpad"
    } else {
        if (ua.indexOf("Android") > 0) {
            deviceType = "isAndroid"
        } else {
            return
        }
    }
    setTimeout('$(window).scrollLeft(0);document.getElementsByTagName("body")[0].scroll="no"; ', 500);
    if ("isAndroid" == deviceType) {
        $(".jsAgreementWrap").width("100%");
        $(window).scrollTop(0)
    }
}, false);
$(function() {});
$(document).on("pageshow", 'div[data-role="page"]', function() {
    $(".editForm").on("click", ".form_li", function(event) {
        if (!$(this).hasClass("focus_input")) {
            if (($(this).find("input").length == 1) && (!($(this).find("input").hasClass("ui-disabled")))) {
                $(this).find("input").focus()
            }
        }
    })
});
