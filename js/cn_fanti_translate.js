// 当前语言状态
let currentLanguage = '简体';

// 页面加载时初始化选框状态
window.addEventListener('DOMContentLoaded', function () {
    initializeLanguage();
    updateSelectBox();
    updateLogo(); // 初始化时更新 logo

    // ✅ 根据localStorage执行简繁切换，保证新页面保持上次选择
    if (currentLanguage === '繁体') {
        runFanTiJavaScript();
    } else if (currentLanguage === '简体') {
        runJianTiJavaScript();
    }
});

// 初始化语言状态
function initializeLanguage() {
    // 优先读取 localStorage
    const savedLang = localStorage.getItem('langMode');
    if (savedLang) {
        currentLanguage = savedLang;
    } else {
        const selectBox = document.getElementById('languages');
        const selectedOption = selectBox.querySelector('option[selected]');
        if (selectedOption) {
            currentLanguage = selectedOption.textContent.trim();
        } else {
            console.error('未找到默认选项，确保HTML正确配置');
        }
    }
}

// 处理语言切换
function handleChange(select) {
    const selectedValue = select.value;

    if (selectedValue === 'javascript:runFanTiJavaScript();') {
        // 切换到繁体中文
        currentLanguage = '繁体';
        localStorage.setItem('langMode', currentLanguage); // ✅ 提前保存
        runFanTiJavaScript();
        updateSelectBox();
        updateLogo();
    } else {
        // 切换到其他语言或简体中文
        if (selectedValue !== '') {
            currentLanguage = select.options[select.selectedIndex].textContent.trim();
            localStorage.setItem('langMode', currentLanguage); // ✅ 提前保存
            updateLogo();
            window.location.href = selectedValue; // ✅ 跳转放最后，确保localStorage已写入
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

    if (currentLanguage === '繁体') {
        selectBox.value = 'javascript:runFanTiJavaScript();';
    } else if (currentLanguage === '简体' && currentValue) {
        selectBox.value = currentValue;
    }

    if (!selectBox.value) {
        console.error('选框值未正确设置，检查 updateSelectBox 中的逻辑');
    }
}

// 更新 logo 和国旗的函数
function updateLogo() {
    const logoImage = document.querySelector('.site-logo img');
    const logoLink = document.querySelector('.site-logo');
    const flagImage = document.querySelector('.flag img');
    if (!logoImage || !logoLink || !flagImage) {
        console.error('未找到 logo 或 flag 元素，检查 HTML 配置');
        return;
    }

    if (currentLanguage === '繁体') {
        logoImage.src = 'images/logo-full-tw.png';
        logoLink.href = 'cn.html';
        flagImage.src = 'images/flag_hk.png';
    } else if (currentLanguage === '简体') {
        logoImage.src = 'images/logo-full-cn.png';
        logoLink.href = 'cn.html';
        flagImage.src = 'images/flag_cn.png';
    }
}

// 监听点击事件，切换简体和繁体 logo
document.getElementById('switch-cn').addEventListener('click', function() {
    currentLanguage = '简体';
    localStorage.setItem('langMode', currentLanguage); // ✅ 记住选择
    runJianTiJavaScript();
    updateLogo();
});

document.getElementById('switch-tw').addEventListener('click', function() {
    currentLanguage = '繁体';
    localStorage.setItem('langMode', currentLanguage); // ✅ 记住选择
    runFanTiJavaScript();
    updateLogo();
});


