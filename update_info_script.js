// updateInfo.js

const data = {
    "age": new Date().getFullYear() - 1993 ,
    "web_update_year": 2025,
    "web_update_month": "09",  // 两位数，01-09
    "web_update_day": 1,
    "born_year": 1993,
    "year_of_experience": 8,
    "no_of_papers": 15,
    "google_scholar_citation": 430,
    "h_index": 10,
    "no_of_journals_for_review": 10,
    "no_of_reviews": 55,
    "no_of_patents": 3,
    "no_of_patents_in_review": 2,
    "no_of_patents_sum": 5,
    "patent_citation": 18,
    "no_of_books": 0,
    "phd_thesis_views": 2200,
    "phd_thesis_downloads": 660,
    "zhihu_followers": 13800,
    "linkedin_followers": 1900,
    "xiaohongshu_followers": 3200,
    "visited_countries": 40
};

// 更新指定类名的 <span> 内容的函数
function updateContent() {
    for (const key in data) {
        const elements = document.getElementsByClassName(key);
        for (const element of elements) {
            element.innerText = data[key]; // 更新每个元素
        }
    }
}

// 调用更新函数
updateContent();


// block save as, copy, and developer tools 
window.onload = function () {
  // Disable right-click context menu
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  // Disable text selection
  document.addEventListener('selectstart', function (e) {
    e.preventDefault();
  });

  // Disable drag and drop
  document.addEventListener('dragstart', function (e) {
    e.preventDefault();
  });

  // Disable common keyboard shortcuts
  document.addEventListener('keydown', function (e) {
    // Block F12
    if (e.keyCode === 123) {
      e.preventDefault();
    }
    // Block Ctrl+Shift+I (DevTools)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
      e.preventDefault();
    }
    // Block Ctrl+Shift+C (Element Inspector)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
      e.preventDefault();
    }
    // Block Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
      e.preventDefault();
    }
    // Block Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode === 85) {
      e.preventDefault();
    }
    // Block Ctrl+S (Save)
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault();
    }
    // Block Ctrl+P (Print)
    if (e.ctrlKey && e.keyCode === 80) {
      e.preventDefault();
    }
    // Block Ctrl+C (Copy)
    if (e.ctrlKey && e.keyCode === 67) {
      e.preventDefault();
    }
    // Block Ctrl+X (Cut)
    if (e.ctrlKey && e.keyCode === 88) {
      e.preventDefault();
    }
    // Block Ctrl+V (Paste)
    if (e.ctrlKey && e.keyCode === 86) {
      e.preventDefault();
    }
    // Block Ctrl+A (Select All)
    if (e.ctrlKey && e.keyCode === 65) {
      e.preventDefault();
    }
    // Block Shift+F10 (Context Menu)
    if (e.shiftKey && e.keyCode === 121) {
      e.preventDefault();
    }
  });
}
