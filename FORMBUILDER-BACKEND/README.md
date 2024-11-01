# ContactUsWidget-Backend

<h2>Setup Instructions</h2>
<ol>
    <li><strong>Open PostgreSQL pgAdmin</strong></li>
    <li><strong>Create a Database</strong></li>
    <li><strong>Create <code>.env</code> file in the backend directory</strong></li>
    <li><strong>Copy <code>.env.example</code> file and paste it in <code>.env</code> file</strong></li>
    <li><strong>Fill database fields with the created database configurations</strong></li>
    <li><strong>Update the remaining fields as follows:</strong>
        <ul>
            <li><code>DEBUG=1</code></li>
            <li><code>ALLOWED_HOSTS=127.0.0.1,localhost</code></li>
            <li><code>CORS_ALLOWED_ORIGINS=http://localhost:8080/,http://127.0.0.1:5500/</code></li>
            <li><code>FRONTEND_URL=http://localhost:8000/</code></li>
        </ul>
    </li>
    <li><strong>Run the following commands:</strong>
        <pre>
<code>python manage.py makemigrations
python manage.py migrate
python manage.py runserver</code>
        </pre>
    </li>
</ol>
