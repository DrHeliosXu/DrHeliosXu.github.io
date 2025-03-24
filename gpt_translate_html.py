import os
import tkinter as tk
from tkinter import filedialog, messagebox, ttk
from bs4 import BeautifulSoup
import openai  # 导入 openai 库

# 配置常量
LANGUAGES = {
    'en': '英语',
    'th': '泰语',
    'zh': '中文',
    'fr': '法语',
    'es': '西班牙语',
    'de': '德语',
    'it': '意大利语',
    'ja': '日语',
    'ko': '韩语',
    'pt': '葡萄牙语',
    'ru': '俄语',
    'ar': '阿拉伯语',
    'hi': '印地语',
    'bn': '孟加拉语',
    'pl': '波兰语',
    'tr': '土耳其语',
    'sv': '瑞典语',
    'da': '丹麦语',
    'no': '挪威语',
    'fi': '芬兰语',
    'nl': '荷兰语',
    'cs': '捷克语',
    'ro': '罗马尼亚语',
    'hu': '匈牙利语',
    'uk': '乌克兰语'
}

API_KEY = "sk-xKkgUxbNSe2oauF114F37c7eE4A14f559fDaCb7a00EbF687"  # 替换为您的API密钥
API_BASE = "https://free.v36.cm"  # 使用您提供的 API Base 地址
MODEL = "gpt-3.5-turbo-0125"  # 使用 GPT-3.5 模型

# 设置 OpenAI API 密钥和 API Base
openai.api_key = API_KEY
openai.api_base = API_BASE  # 设置 API Base 地址

class TranslatorGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("智能网页翻译工具")
        
        # 创建界面组件
        self.file_path = tk.StringVar()
        self.target_lang = tk.StringVar(value='th')
        
        # 文件选择框架
        file_frame = ttk.Frame(self.root, padding=10)
        file_frame.pack(fill=tk.X)
        
        ttk.Button(file_frame, text="选择文件", command=self.select_file).pack(side=tk.LEFT, padx=5)
        ttk.Label(file_frame, textvariable=self.file_path).pack(side=tk.LEFT, padx=5, expand=True)

        # 语言选择框架
        lang_frame = ttk.Frame(self.root, padding=10)
        lang_frame.pack(fill=tk.X, pady=5)

        ttk.Label(lang_frame, text="目标语言:").pack(side=tk.LEFT, padx=5)

        # Create Combobox for selecting languages
        lang_dropdown = ttk.Combobox(lang_frame, textvariable=self.target_lang, values=list(LANGUAGES.values()))
        lang_dropdown.pack(side=tk.LEFT, padx=5)

        # Optionally, set default selection from LANGUAGES dictionary
        lang_dropdown.set(LANGUAGES[self.target_lang.get()])

        # 翻译按钮
        ttk.Button(self.root, text="开始翻译", command=self.start_translation, state=tk.DISABLED).pack(pady=10)

        # 进度条
        self.progress = ttk.Progressbar(self.root, orient=tk.HORIZONTAL, length=300)
        self.progress.pack(pady=10)

    def select_file(self):
        """文件选择对话框"""
        file_path = filedialog.askopenfilename(
            filetypes=[("HTML文件", "*.html")]
        )
        if file_path:
            self.file_path.set(file_path)
            self.enable_button()

    def enable_button(self):
        """启用翻译按钮"""
        self.root.winfo_toplevel().title(f"翻译中 - {os.path.basename(self.file_path.get())}")
        self.root.after(100, self.start_translation)

    def get_output_filename(self, input_path):
        """生成符合规范的输出文件名"""
        base, ext = os.path.splitext(os.path.basename(input_path))
        parts = base.rsplit('-', 1)
        if len(parts) > 1:
            return f"{parts[0]}-{self.target_lang}{ext}"
        else:
            return f"{self.target_lang}{ext}"

    def translate_file(self, input_path):
        """核心翻译逻辑"""
        try:
            with open(input_path, 'r', encoding='utf-8') as f:
                html_content = f.read()

            # 提取可翻译文本
            texts = self.extract_translatable_text(html_content)
            
            # 分块翻译
            chunks = self.chunk_text(texts)
            
            # 并行翻译（需要根据API限制调整线程数）
            translations = []
            for chunk in chunks:
                translated = self.translate_chunk(chunk)
                # 解析翻译结果
                for item in chunk['texts']:
                    translations.append({
                        'original': item['original'],
                        'translated': translated.split('\n')[item['position']].strip(),
                        'position': item['position']
                    })

            # 重建HTML
            self.rebuild_html(translations, input_path)
            return True
        except Exception as e:
            messagebox.showerror("翻译错误", f"发生错误：{str(e)}")
            return False

    def extract_translatable_text(self, html_content):
        """提取需翻译文本（保留标签结构）"""
        soup = BeautifulSoup(html_content, 'html.parser')
        texts = []
        
        for tag in soup.find_all(text=True):
            if not tag.strip() or tag.parent.name in ['style', 'script', 'noscript']:
                continue
            texts.append({
                'original': tag.strip(),
                'parent_tags': str(tag.parents),
                'position': len(texts)
            })
        return texts

    def chunk_text(self, texts):
        """智能分块算法"""
        chunks = []
        n = len(texts)
        context_window = 3  # 根据API性能调整
        
        for i in range(n):
            start = max(0, i - context_window)
            end = min(n, i + context_window + 1)
            chunk = texts[start:end]
            context = "\n".join(t['original'] for t in chunk)
            chunks.append({
                'texts': chunk,
                'context': context
            })
        return chunks

    def translate_chunk(self, chunk):
        """调用GPT API翻译"""
        prompt = f"""
        专业翻译要求：
        1. 严格保留所有HTML标签结构
        2. 专有名词/术语保持原文（如品牌名、技术术语）
        3. 使用正式书面语体
        4. 保持原有排版格式（段落间距、列表符号等）
        
        上下文：{chunk['context']}
        待翻译内容：
        {"".join(t['original'] for t in chunk['texts'])}
        """
        
        response = openai.Completion.create(
            model=MODEL,
            prompt=prompt,
            temperature=0.1,
            max_tokens=1500,
            top_p=0.9,
            frequency_penalty=0.2
        )
        
        return response['choices'][0]['text'].strip()

    def rebuild_html(self, translations, input_path):
        """重建HTML文件"""
        soup = BeautifulSoup(open(input_path), 'html.parser')
        text_map = {t['position']: t for t in translations}
        
        for tag in soup.find_all(text=True):
            if not tag.strip():
                continue
            translated = next(
                (t['translated'] for t in text_map.values() if t['original'] == tag.strip()),
                tag.text
            )
            tag.string = translated

        output_path = self.get_output_filename(input_path)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        
        self.progress.destroy()
        messagebox.showinfo("完成", f"翻译成功！\n输出文件：{output_path}")

    def start_translation(self):
        """启动翻译流程"""
        self.progress.pack(fill=tk.X)
        self.progress['value'] = 0
        self.root.after(0, self.translate_file, self.file_path.get())

if __name__ == "__main__":
    root = tk.Tk()
    app = TranslatorGUI(root)
    root.mainloop()