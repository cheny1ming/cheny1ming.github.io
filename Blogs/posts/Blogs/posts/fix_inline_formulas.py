import re

with open("优化器解析.md", "r", encoding="utf-8") as f:
    content = f.read()

# 定义需要替换的模式
# 将段落中的短变量从 $$...$$ 改为 $...$

# 1. 单个希腊字母和变量（在句子中）
replacements = [
    # 单个字母变量
    (r'其中\$\$([a-zA-Z])\$\$为', r'其中$\1$为'),
    (r'，\$\$([a-zA-Z])\$\$为', r'，$\1$为'),
    (r'，\$\$([a-zA-Z])\$\$是', r'，$\1$是'),
    (r'变量\$\$([a-zA-Z])\$\$', r'变量$\1$'),
    (r'参数\$\$([a-zA-Z])\$\$', r'参数$\1$'),

    # 常见的希腊字母组合
    (r'\$\$\\theta\$\$', r'$\\theta$'),
    (r'\$\$\\eta\$\$', r'$\\eta$'),
    (r'\$\$\\lambda\$\$', r'$\\lambda$'),
    (r'\$\$\\beta\$\$', r'$\\beta$'),
    (r'\$\$\\epsilon\$\$', r'$\\epsilon$'),
    (r'\$\$\\gamma\$\$', r'$\\gamma$'),
    (r'\$\$\\nabla\$\$', r'$\\nabla$'),

    # 下标变量（在句子中的）
    (r'\$\$([xy])_i\$\$', r'$\1_i$'),
    (r'\$\$([tv])_t\$\$', r'$\1_t$'),
    (r'\$\$([mbgv])_t\$\$', r'$\1_t$'),
    (r'\$\$L_([t])\$\$', r'$L_\1$'),
    (r'\$\$\\theta_([t])\$\$', r'$\\theta_\1$'),
    (r'\$\$\\theta_\{t\+1\}\$\$', r'$\\theta_{t+1}$'),
    (r'\$\$\\theta_\{t-1\}\$\$', r'$\\theta_{t-1}$'),
    (r'\$\$v_\{t-1\}\$\$', r'$v_{t-1}$'),
    (r'\$\$m_\{t-1\}\$\$', r'$m_{t-1}$'),
]

for pattern, replacement in replacements:
    content = re.sub(pattern, replacement, content)

with open("优化器解析.md", "w", encoding="utf-8") as f:
    f.write(content)

print("✅ 已完成公式格式转换")
print("行内简短变量：$...$")
print "独立完整公式：$$...$$"
