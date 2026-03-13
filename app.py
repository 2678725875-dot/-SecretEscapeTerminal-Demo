from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app) # 开启跨域，允许前端存数据
DB_PATH = '/var/www/danmaku.db'

@app.route('/api/danmaku', methods=['GET', 'POST'])
def handle_danmaku():
    if request.method == 'POST':
        content = request.json.get('content')
        if content:
            with sqlite3.connect(DB_PATH) as conn:
                conn.execute('INSERT INTO danmaku (content) VALUES (?)', (content,))
            return jsonify({"status": "saved"})

    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.execute('SELECT content FROM danmaku ORDER BY id DESC LIMIT 200')
        return jsonify([row[0] for row in cursor.fetchall()])

if __name__ == '__main__':
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute('CREATE TABLE IF NOT EXISTS danmaku (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)')
    app.run(host='0.0.0.0', port=5000)