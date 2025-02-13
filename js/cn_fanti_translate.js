// 当前语言状态
let currentLanguage = '简体';

// 页面加载时初始化选框状态
window.addEventListener('DOMContentLoaded', function () {
    initializeLanguage();
    updateSelectBox();
    updateLogo(); // 初始化时更新 logo
});

// 初始化语言状态
function initializeLanguage() {
    const selectBox = document.getElementById('languages');
    const selectedOption = selectBox.querySelector('option[selected]');
    if (selectedOption) {
        currentLanguage = selectedOption.textContent.trim();
    } else {
        console.error('未找到默认选项，确保HTML正确配置');
    }
}

// 处理语言切换
function handleChange(select) {
    const selectedValue = select.value;

    if (selectedValue === 'javascript:runFanTiJavaScript();') {
        // 切换到繁体中文
        runFanTiJavaScript();
        currentLanguage = '繁体';
        updateSelectBox(); // 确保选框同步状态
        updateLogo(); // 切换语言时更新 logo
    } else {
        // 切换到其他语言或简体中文
        if (selectedValue !== '') {
            currentLanguage = select.options[select.selectedIndex].textContent.trim();
            updateLogo(); // 切换语言时更新 logo
            window.location.href = selectedValue; // 跳转页面
        }
    }
}

// 繁体中文切换函数
function runFanTiJavaScript() {
    console.log('切换到繁体中文...');
    const scriptId = 'tongwenlet_tw';
    let script = document.getElementById(scriptId);

    if (script) {
        document.body.removeChild(script);
    }

    script = document.createElement('script');
    script.language = 'javascript';
    script.type = 'text/javascript';
    script.src = 'js/bookmarklet_tw.js';
    script.id = scriptId;
    document.body.appendChild(script);
}

// 简体中文切换函数
function runJianTiJavaScript() {
    console.log('切换到簡體中文...');
    const scriptId = 'tongwenlet_cn';
    let script = document.getElementById(scriptId);

    if (script) {
        document.body.removeChild(script);
    }

    script = document.createElement('script');
    script.language = 'javascript';
    script.type = 'text/javascript';
    script.src = 'js/bookmarklet_cn.js';
    script.id = scriptId;
    document.body.appendChild(script);
}

// 更新选框显示状态
function updateSelectBox() {
    const selectBox = document.getElementById('languages');
    const currentValue = selectBox.querySelector('option[selected]')?.value;

    // 确保 currentLanguage 与 selectBox.value 映射一致
    if (currentLanguage === '繁体') {
        selectBox.value = 'javascript:runFanTiJavaScript();';
    } else if (currentLanguage === '简体' && currentValue) {
        selectBox.value = currentValue; // 使用默认选项值
    }

    // 检查是否成功设置了选项
    if (!selectBox.value) {
        console.error('选框值未正确设置，检查 updateSelectBox 中的逻辑');
    }
}

// 更新 logo 的函数
function updateLogo() {
    const logoImage = document.querySelector('.site-logo img');
    const logoLink = document.querySelector('.site-logo');
    if (!logoImage || !logoLink) {
        console.error('未找到 logo 元素，检查 HTML 配置');
        return;
    }

    if (currentLanguage === '繁体') {
        logoImage.src = 'images/logo-full-tw.png'; // 繁体中文 logo
        logoLink.href = 'cn.html'; // 繁体中文链接
    } else if (currentLanguage === '简体') {
        logoImage.src = 'images/logo-full-cn.png'; // 简体中文 logo
        logoLink.href = 'cn.html'; // 简体中文链接
    }
}

// 监听点击事件，切换简体和繁体 logo
document.getElementById('switch-cn').addEventListener('click', function() {
    // 执行简体转换
    runJianTiJavaScript();

    // 切换语言并更新 logo
    currentLanguage = '简体';
    updateLogo();
});

document.getElementById('switch-tw').addEventListener('click', function() {
    // 执行繁体转换
    runFanTiJavaScript();

    // 切换语言并更新 logo
    currentLanguage = '繁体';
    updateLogo();
});