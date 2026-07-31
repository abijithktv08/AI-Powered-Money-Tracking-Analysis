# 💰 AI-Powered Money Tracking & Analysis

An intelligent personal finance web application that helps users **track income and expenses, analyze spending patterns, and gain AI-powered financial insights**.

The goal of this project is to make personal money management simple by combining traditional expense tracking with **Artificial Intelligence** to help users better understand their financial habits.

## 🚀 Features

* 💵 Track income and expenses
* 📊 View financial summaries and spending patterns
* 🗂️ Categorize transactions
* 🤖 AI-powered analysis of financial data
* 💡 Personalized spending and saving suggestions
* 📈 Analyze income vs. expenses
* 🎯 Help users understand where their money is going
* 📱 Simple and user-friendly interface

## 🤖 AI-Powered Analysis

The AI analyzes the user's financial data and can provide insights such as:

* Major spending categories
* Unnecessary or unusually high expenses
* Overall spending behavior
* Areas where expenses can be reduced
* Personalized saving suggestions
* Financial summaries in easy-to-understand language

### Example

> **AI Analysis:**
> Your highest spending category this month is Food. You spent approximately 35% of your total expenses on food. Reducing food expenses by 10% could help you save more each month.

## 🛠️ Tech Stack

**Frontend**

* HTML
* CSS
* JavaScript
  
**Database**

* Database for storing income and expense transactions

**AI Integration**

* AI API for analyzing financial data and generating personalized insights

## ⚙️ How It Works

1. The user adds an **income or expense transaction**.
2. Transaction information is stored in the database.
3. The application calculates total income, expenses, and balance.
4. Transactions are grouped into different categories.
5. Financial data is sent for AI analysis.
6. The AI identifies spending patterns and generates useful insights.
7. The results are displayed to the user through the dashboard.

## 📂 Project Structure


AI-Money-Tracker/
├── api
│   └── analyze.js
├── css/
│   └── style.css
├── js/
│   └── ai.js
│   └── login.js
│   └── script.js
│
├── server/
│   └── server.js
│   └── .env
│   └── package.json
│
├──index.html
├──login.html
├── requirements.txt
├── .gitignore
└── README.md


> The project structure may vary depending on the current implementation.

## 💻 Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Open the project directory

```bash
cd AI-Money-Tracker
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file and add the required API key.

```env
AI_API_KEY=your_api_key_here
```

**Never upload your `.env` file or API keys to GitHub.**

Add it to `.gitignore`:

```text
.env
```

### 5. Run the application (if you want to run in this local pc)

```bash
node server.js 
```

Open the local URL shown in the terminal in your browser.

## 📊 Example Dashboard

The dashboard can display:

```text
Total Income      ₹25,000
Total Expenses    ₹16,500
Current Balance   ₹8,500

Top Spending Category
Food              ₹5,200

AI Insight
"Food and transportation make up a large
portion of your monthly expenses. Reducing
food spending could improve your monthly
savings."
```

## 🔮 Future Improvements

* User authentication
* Monthly budget limits
* Automatic expense categorization
* Advanced AI financial assistant
* Expense prediction using Machine Learning
* Savings goal tracking
* Interactive charts and reports
* Export financial reports
* Recurring transaction support
* Mobile-friendly dashboard

## 🎯 Project Objective

The objective of this project is to demonstrate how **AI can be integrated with personal finance applications** to transform raw transaction data into meaningful and actionable financial insights.

Instead of only recording expenses, the application helps users **understand their spending behavior and make better financial decisions**.

## 🔐 Security

Financial information is sensitive. API keys and other credentials should always be stored using environment variables and should never be committed directly to the repository.

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes.
5. Push the branch.
6. Create a Pull Request.

## 📜 License

This project is created for **educational and learning purposes**.

## 👨‍💻 Author

**Abijith K T V**

If you found this project useful, consider giving the repository a ⭐.
