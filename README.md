# Mergington High School Activities API

A FastAPI application for managing extracurricular activities at Mergington High School. Students can view available activities and sign up or unregister from them through a simple web interface or REST API.

## Features

- 📋 View all available extracurricular activities with details
- ✍️ Sign up for activities using student email
- ❌ Unregister from activities
- 🔄 Prevent duplicate signups
- 🖥️ Interactive web interface
- 📚 Auto-generated API documentation (Swagger/ReDoc)

## Prerequisites

- Python 3.7 or higher
- pip (Python package manager)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cx-demo/skills-getting-started-with-github-copilot.git
   cd skills-getting-started-with-github-copilot
   ```

2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

### Running the Application

Start the FastAPI server:

```bash
uvicorn src.app:app --reload
```

The application will be available at:
- **Web Interface**: http://localhost:8000/
- **API Documentation (Swagger)**: http://localhost:8000/docs
- **API Documentation (ReDoc)**: http://localhost:8000/redoc

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Redirect to the web interface |
| `GET` | `/activities` | Get all activities with details and participants |
| `POST` | `/activities/{activity_name}/signup?email=<email>` | Sign up a student for an activity |
| `POST` | `/activities/{activity_name}/unregister?email=<email>` | Remove a student from an activity |

### Example API Usage

**Get all activities:**
```bash
curl http://localhost:8000/activities
```

**Sign up for an activity:**
```bash
curl -X POST "http://localhost:8000/activities/Chess%20Club/signup?email=student@mergington.edu"
```

**Unregister from an activity:**
```bash
curl -X POST "http://localhost:8000/activities/Chess%20Club/unregister?email=student@mergington.edu"
```

## Project Structure

```
skills-getting-started-with-github-copilot/
├── src/
│   ├── app.py              # FastAPI application with API endpoints
│   ├── static/
│   │   ├── index.html      # Web interface
│   │   ├── app.js          # Frontend JavaScript
│   │   └── styles.css      # Styling
│   └── README.md           # Additional documentation
├── tests/
│   └── test_app.py         # Test suite
├── requirements.txt        # Python dependencies
├── pytest.ini             # Pytest configuration
└── README.md              # This file
```

## Available Activities

The application includes the following extracurricular activities:

- **Academic**: Chess Club, Programming Class, Math Olympiad, Science Club
- **Sports**: Gym Class, Soccer Team, Basketball Club
- **Arts**: Drama Club, Art Workshop

Each activity has:
- Description
- Schedule
- Maximum participant capacity
- List of registered participants

## Testing

Run the test suite using pytest:

```bash
pytest
```

The test suite includes:
- Activity listing tests
- Signup and unregister flow tests
- Duplicate signup prevention tests
- Error handling tests
- Redirect tests

## Data Storage

The application uses in-memory storage for simplicity. All data (activities and registrations) will be reset when the server restarts. This is suitable for development and learning purposes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

## 🎉 GitHub Skills Exercise Complete! 🎉

<img src="https://octodex.github.com/images/welcometocat.png" height="150px" />

**This project was created as part of the "Getting Started with GitHub Copilot" exercise.**

### 🚀 Share Your Success!

<a href="https://twitter.com/intent/tweet?text=I%20just%20completed%20the%20%22Getting%20Started%20with%20GitHub%20Copilot%22%20GitHub%20Skills%20hands-on%20exercise!%20%F0%9F%8E%89%0A%0Ahttps%3A%2F%2Fgithub.com%2Fcx-demo%2Fskills-getting-started-with-github-copilot%0A%0A%23GitHubSkills%20%23OpenSource%20%23GitHubLearn" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/Share%20on%20X-1da1f2?style=for-the-badge&logo=x&logoColor=white" alt="Share on X" />
</a>
<a href="https://bsky.app/intent/compose?text=I%20just%20completed%20the%20%22Getting%20Started%20with%20GitHub%20Copilot%22%20GitHub%20Skills%20hands-on%20exercise!%20%F0%9F%8E%89%0A%0Ahttps%3A%2F%2Fgithub.com%2Fcx-demo%2Fskills-getting-started-with-github-copilot%0A%0A%23GitHubSkills%20%23OpenSource%20%23GitHubLearn" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/Share%20on%20Bluesky-0085ff?style=for-the-badge&logo=bluesky&logoColor=white" alt="Share on Bluesky" />
</a>
<a href="https://www.linkedin.com/feed/?shareActive=true&text=I%20just%20completed%20the%20%22Getting%20Started%20with%20GitHub%20Copilot%22%20GitHub%20Skills%20hands-on%20exercise!%20%F0%9F%8E%89%0A%0Ahttps%3A%2F%2Fgithub.com%2Fcx-demo%2Fskills-getting-started-with-github-copilot%0A%0A%23GitHubSkills%20%23OpenSource%20%23GitHubLearn" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/Share%20on%20LinkedIn-0077b5?style=for-the-badge&logo=linkedin&logoColor=white" alt="Share on LinkedIn" />
</a>

### 🎯 Continue Learning

[![](https://img.shields.io/badge/Return%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/cx-demo/skills-getting-started-with-github-copilot/issues/1)
[![GitHub Skills](https://img.shields.io/badge/Explore%20GitHub%20Skills-000000?style=for-the-badge&logo=github&logoColor=white)](https://learn.github.com/skills)

</div>

---

&copy; 2025 GitHub &bull; [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) &bull; [MIT License](https://gh.io/mit)

