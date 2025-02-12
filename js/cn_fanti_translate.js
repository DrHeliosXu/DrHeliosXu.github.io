// 当前语言状态
let currentLanguage = '简体';

// 页面加载时初始化选框状态
window.addEventListener('DOMContentLoaded', function () {
    initializeLanguage();
    updateSelectBox();
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
    } else {
        // 切换到其他语言或简体中文
        if (selectedValue !== '') {
            currentLanguage = select.options[select.selectedIndex].textContent.trim();
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
    script.src = 'https://rawgit.com/skofkyo/userChromeJS/master/UserScriptLoader/bookmarklet_tw.js';
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