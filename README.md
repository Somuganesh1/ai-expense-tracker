# AI Expense Tracker

AI Expense Tracker is a full-stack web application that allows users to track expenses, analyze spending patterns, and gain insights using machine learning algorithms. It is built with a Flask backend and a React (TypeScript) frontend, and deployed on AWS EC2.

## Features

- **Expense Management:** Add, view, and manage expenses.
- **Spending Analysis:** Analyze spending patterns using K-Means clustering.
- **Responsive UI:** A user-friendly interface built with React (TypeScript) and Vite.
- **Database Integration:** Uses SQLite for storing expenses.
- **Machine Learning:** Implements clustering with Scikit-learn for insights.
- **Deployed on AWS EC2:** A cloud-hosted application accessible from anywhere.

## Technologies Used

### Backend
- **Flask**: Backend framework
- **Flask-SQLAlchemy**: ORM for database interactions
- **Flask-CORS**: Enables Cross-Origin Resource Sharing
- **SQLite**: Lightweight database for storing expenses
- **Scikit-learn**: Machine learning library for clustering analysis

### Frontend
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Strongly typed superset of JavaScript
- **Vite**: Frontend build tool for development and production

### Deployment
- **AWS EC2**: Cloud server for hosting the application

## Installation and Setup

### Prerequisites
- Python 3.7+
- Node.js 16+
- npm or Yarn
- AWS EC2 instance (if deploying)

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/somuganesh1/ai-expense-tracker.git
   cd ai-expense-tracker/backend

---

Create and activate a virtual environment:

``` bash
python3 -m venv myenv
source myenv/bin/activate  # On Windows: myenv\Scripts\activate
```
Install dependencies:
```bash
pip install -r requirements.txt
```
Run the backend server:
```bash
python app.py
```
---
Frontend Setup
Navigate to the frontend directory:
```bash
cd ../frontend/vite-project
```
Install dependencies:
```bash
npm install
```
Run the frontend development server:
```bash
npm run dev
```

Open the app in browser at http://localhost:5173.
---
## Deployment
-- Deploy the backend to AWS EC2 using the Flask deployment guide provided. Serve the frontend using npm run build and host the production build on a static file server or AWS S3.
