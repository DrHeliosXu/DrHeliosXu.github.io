// 定义当前语言的状态
let currentLanguage = '简体';

// 页面加载时检查当前语言状态
window.onload = function () {
updateSelectBox();
};

// 切换语言的处理函数
function handleChange(select) {
var selectedOption = select.options[select.selectedIndex];
var value = selectedOption.value;

if (value.startsWith("javascript:")) {
    eval(value.substring(11));
    currentLanguage = '繁体';
    updateSelectBox();
} else {
    currentLanguage = '简体';
    window.location.href = value;
}
}

// 切换为繁体中文的函数
function runFanTiJavaScript() {
var s = document.getElementById("tongwenlet_tw");
if (s != null) {
    document.body.removeChild(s);
}
var s = document.createElement("script");
s.language = "javascript";
s.type = "text/javascript";
s.src = "https://rawgit.com/skofkyo/userChromeJS/master/UserScriptLoader/bookmarklet_tw.js";
s.id = "tongwenlet_tw";
document.body.appendChild(s);
}

// 更新 select 选框显示状态
function updateSelectBox() {
const selectBox = document.getElementById('languages');

if (currentLanguage === '繁体') {
    selectBox.value = 'javascript:runFanTiJavaScript();'; // 设置为繁体中文
} else {
    selectBox.value = 'cn.html'; // 设置为简体中文
}
}