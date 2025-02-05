from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import pandas as pd
from sklearn.cluster import KMeans

# Initialize the Flask app
app = Flask(__name__)
CORS(app)

# Configure the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///expenses.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Expense model
class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.String(20), nullable=False)

# Initialize the database (Ensure this is only run once)
with app.app_context():
    db.create_all()

# Add a new expense
@app.route('/add-expense', methods=['POST'])
def add_expense():
    try:
        data = request.json
        new_expense = Expense(category=data['category'], amount=data['amount'], date=data['date'])
        db.session.add(new_expense)
        db.session.commit()
        return jsonify({"message": "Expense added successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Fetch all expenses
@app.route('/get-expenses', methods=['GET'])
def get_expenses():
    try:
        expenses = Expense.query.all()
        result = [{"id": exp.id, "category": exp.category, "amount": exp.amount, "date": exp.date} for exp in expenses]
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Analyze spending patterns
@app.route('/analyze', methods=['GET'])
def analyze_expenses():
    try:
        expenses = Expense.query.all()
        df = pd.DataFrame([{"category": exp.category, "amount": exp.amount} for exp in expenses])

        if len(df) > 1:
            kmeans = KMeans(n_clusters=2, n_init=10).fit(df[['amount']])
            df['cluster'] = kmeans.labels_
            insights = df.groupby('cluster').mean().to_dict()
            return jsonify({"clusters": insights})
        return jsonify({"message": "Not enough data for analysis."})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Root endpoint
@app.route('/')
def home():
    return "Flask App Running"

# Run the app
if __name__ == '__main__':
    app.run(debug=True, port=5002)
