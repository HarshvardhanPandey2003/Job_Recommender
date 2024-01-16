# Job Recommendation System

A simple web application that provides job recommendations based on the input of a user's job position and state. The project is built using Flask for the backend and React for the frontend.

## Table of Contents
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User-friendly interface to input job position and state.
- Integration with a recommendation system backend built with Flask.
- Displays recommended job options based on the provided input.

## Requirements

Make sure you have the following installed before running the application:

- Python 3.x
- Node.js
- npm (Node Package Manager)

## Installation

### Backend (Flask)

1. Clone the repository:

    ```bash
    git clone https://github.com/HarshvardhanPandey2003/job-recommendation-system.git
    ```

2. Navigate to the backend folder:

    ```bash
    cd job-recommendation-system/backend
    ```

3. Install Python dependencies:

    ```bash
    pip install -r requirements.txt
    ```

### Frontend (React)

4. Navigate to the frontend folder:

    ```bash
    cd ../frontend
    ```

5. Install Node.js dependencies:

    ```bash
    npm install
    ```

## Usage

1. Start the Flask backend:

    ```bash
    python app.py
    ```

   The backend will run on `http://localhost:5000`.

2. Start the React frontend:

    ```bash
    npm start
    ```

   The frontend will run on `http://localhost:3000`.

3. Open your browser and visit `http://localhost:3000` to use the Job Recommendation System.

## Contributing

Contributions are welcome! If you want to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
