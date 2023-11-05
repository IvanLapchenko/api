from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

def create_table():
    conn = sqlite3.connect('tasks.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

create_table()

@app.route('/tasks', methods=['GET', 'POST'])
def tasks():
    if request.method == 'GET':
        conn = sqlite3.connect('tasks.db')
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM tasks')
        tasks = cursor.fetchall()
        conn.close()

        task_list = [{'id': task[0], 'title': task[1]} for task in tasks]
        return jsonify(task_list)
    if request.method == 'POST':
        data = request.get_json()
        new_task_title = data['title']

        conn = sqlite3.connect('tasks.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO tasks (title) VALUES (?)', (new_task_title,))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Task created successfully'})

if __name__ == '__main__':
    app.run(debug=True)
