# VoiceAI-Agent: AI-Powered Telephony Assistant

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
**Version:** 0.1.0 (Initial Development)
**Author:** whiteye (Aaryan)
**Date:** 2025-04-20

## SYNOPSIS

VoiceAI-Agent is a comprehensive system designed to handle telephony interactions using Artificial Intelligence. It leverages Twilio for Programmable Voice capabilities and Google's Gemini AI for generating dynamic, context-aware responses. The system comprises a Python-based backend using Flask and a modern web interface built with Next.js and React.

## DESCRIPTION

The project provides functionalities for both receiving incoming calls and initiating outgoing calls.

* **Incoming Call Handling:** The backend server listens for incoming calls via a Twilio webhook. Upon receiving a call, it interacts with the Google Gemini API to generate an introductory message, which is then synthesized into speech and played back to the caller using Twilio TwiML. It is configured to gather subsequent speech input, although current implementation does not process this input further.
* **Outgoing Call Initiation:** A separate Python script allows for programmatic initiation of outbound calls via the Twilio REST API.
* **Web Interface:** A Next.js frontend (details in `web/README.md`) provides a user interface for interacting with the system (specific features depend on frontend implementation).

## ARCHITECTURE

The system is composed of the following key components:

1.  **Backend API (`backend/`)**:
    * **Framework**: Flask (Python)
    * **Core Logic**: Handles Twilio webhooks, interacts with Google Gemini API, generates TwiML responses.
    * **External Services**: Twilio API, Google Gemini API.
2.  **Frontend Application (`web/`)**:
    * **Framework**: Next.js (React)
    * **UI Components**: Utilizes Radix UI, shadcn/ui (implied), Tailwind CSS.
    * **Features**: Provides user interaction points (details TBD based on implementation). Assumed features may include initiating calls, viewing call logs, configuration.
    * **Database**: Prisma (likely for user data, call logs, etc.)
    * **Authentication**: NextAuth.js
3.  **External Services**:
    * **Twilio**: For voice call functionality (incoming/outgoing calls, TwiML).
    * **Google AI Platform**: For accessing the Gemini language model.

## DIRECTORY STRUCTURE
```
.
├── backend/
│   ├── .env.example        # Example environment variables for backend
│   ├── main.py             # Flask application for handling incoming calls
│   ├── outgoing.py         # Script for initiating outgoing calls
│   └── requirements.txt    # Python dependencies
├── web/
│   ├── README.md           # Frontend specific README
│   ├── bun.lock            # Frontend dependencies lock file (Bun)
│   ├── next.config.mjs     # Next.js configuration
│   ├── package.json        # Frontend package definition
│   ├── prisma/             # Prisma schema and migrations
│   ├── src/                # Frontend source code (Next.js app router structure likely)
│   └── ...                 # Other frontend files (components, pages, styles, etc.)
├── .gitignore
├── LICENSE                 # Project License (MIT)
└── README.md               # This file

```
## PREREQUISITES

Ensure the following software is installed on your system:

* **Python**: Version 3.8 or higher.
* **pip**: Python package installer.
* **Bun**: JavaScript runtime and package manager (for the frontend). Alternatively, Node.js (v18+) and npm/yarn can be used by adjusting commands.
* **Git**: Version control system.
* **Twilio Account**: With SID, Auth Token, and a purchased phone number.
* **Google Cloud Platform Account**: With access to the Gemini API and an API Key.

## INSTALLATION & CONFIGURATION

Follow these steps to set up the project locally:

1.  **Clone the Repository:**
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Backend Setup (`backend/`)**:
    * Navigate to the backend directory:
        ```bash
        cd backend
        ```
    * Create and activate a Python virtual environment:
        ```bash
        python -m venv venv
        source venv/bin/activate  # On Windows use `venv\Scripts\activate`
        ```
    * Install Python dependencies:
        ```bash
        pip install -r requirements.txt
        ```
    * Configure environment variables. Copy the example file:
        ```bash
        cp .env.example .env
        ```
    * Edit the `.env` file and add your credentials:
        ```dotenv
        # .env
        BITCH=<Your_Google_Gemini_API_Key> # Note: Code uses 'BITCH', consider renaming for clarity.
        SID=<Your_Twilio_Account_SID>
        AUTH=<Your_Twilio_Auth_Token>
        ```
        * **Important:** The backend code (`main.py`) currently expects the Google API key under the variable name `BITCH`. It is recommended to rename this variable in both the `.env` file and the Python code (e.g., to `GOOGLE_API_KEY`) for better maintainability and professionalism.
        * The `outgoing.py` script expects `SID` and `AUTH`.

3.  **Frontend Setup (`web/`)**:
    * Navigate to the frontend directory:
        ```bash
        cd ../web  # Assuming you are in the backend directory
        ```
    * Install JavaScript dependencies using Bun:
        ```bash
        bun install
        ```
    * Configure frontend environment variables. Create a `.env.local` file (refer to Next.js, Prisma, and NextAuth documentation for required variables). Potential variables include:
        ```dotenv
        # web/.env.local (Example - check frontend code for actual needs)
        DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require" # Example for PostgreSQL
        NEXTAUTH_URL="http://localhost:3000"
        NEXTAUTH_SECRET="<generate_a_strong_secret>"
        # Add any other required API keys or configuration
        ```
    * Set up the database using Prisma (if applicable):
        ```bash
        # Ensure your DATABASE_URL is correctly set in web/.env.local
        bunx prisma migrate dev --name init # Or appropriate migration command
        # bunx prisma db seed # If you have seed data
        ```

## USAGE

1.  **Run the Backend Server:**
    * Ensure you are in the `backend/` directory with the virtual environment activated.
    * Start the Flask development server:
        ```bash
        flask run --port 5000 # Or python main.py
        ```
    * For production, use a WSGI server like Gunicorn:
        ```bash
        # Example: gunicorn --bind 0.0.0.0:5000 main:app
        ```
    * The backend API will be available, typically at `http://localhost:5000`.

2.  **Configure Twilio Webhook:**
    * You need a way to expose your local backend server to the internet so Twilio can reach it. Tools like `ngrok` are useful for development:
        ```bash
        ngrok http 5000
        ```
    * Copy the `https` forwarding URL provided by ngrok (e.g., `https://<unique_id>.ngrok.io`).
    * Go to your Twilio console, navigate to the settings for your Twilio phone number.
    * Under "Voice & Fax", configure "A CALL COMES IN" to be a `Webhook`.
    * Paste the ngrok URL followed by `/answer` into the webhook field (e.g., `https://<unique_id>.ngrok.io/answer`).
    * Set the HTTP method to `POST`.
    * Save the configuration.

3.  **Run the Frontend Application:**
    * Navigate to the `web/` directory.
    * Start the Next.js development server:
        ```bash
        bun dev
        ```
    * The frontend will be accessible, typically at `http://localhost:3000`.

4.  **Make an Incoming Call:**
    * Call your Twilio phone number from any phone.
    * Twilio will forward the call to your backend's `/answer` endpoint via the ngrok tunnel.
    * You should hear the AI-generated introduction.

5.  **Initiate an Outgoing Call:**
    * Ensure you are in the `backend/` directory with the virtual environment activated.
    * **Modify `backend/outgoing.py`**: Change the hardcoded `to` and `from_` phone numbers to your desired destination and your Twilio number, respectively. You might also want to change the `url` parameter to point to your `/answer` endpoint or another TwiML source.
    * Run the script:
        ```bash
        python outgoing.py
        ```
    * This will trigger an outbound call via Twilio.

## API REFERENCE (Backend)

### `POST /answer`

* **Description:** Handles incoming voice calls forwarded by Twilio. Generates an AI introductory message and speaks it to the caller. Gathers subsequent speech input.
* **Request Type:** `POST`
* **Parameters:** Standard Twilio voice request parameters (e.g., `CallSid`, `From`, `To`).
* **Returns:** TwiML (`application/xml`) containing `<Say>` and `<Gather>` verbs.
* **Behavior:**
    1.  Receives call webhook from Twilio.
    2.  Calls Google Gemini API (`gemini-2.0-flash`) with a predefined prompt to generate an introduction.
    3.  Constructs a TwiML `VoiceResponse`.
    4.  Uses `<Say>` to speak the generated text (Voice: `Polly.Amy`).
    5.  Uses `<Gather input="speech">` to listen for speech input after the message (Note: gathered input is not currently processed).
    6.  Returns the TwiML response to Twilio for execution.

## ENVIRONMENT VARIABLES

The following environment variables are required for configuration:

**Backend (`backend/.env`):**

* `BITCH`: Your Google Gemini API Key. ( **Recommendation:** Rename to `GOOGLE_API_KEY` in code and `.env`).
* `SID`: Your Twilio Account SID.
* `AUTH`: Your Twilio Auth Token.

**Frontend (`web/.env.local`):**

* `DATABASE_URL`: Connection string for your database (used by Prisma).
* `NEXTAUTH_URL`: The canonical URL of your site (e.g., `http://localhost:3000` for development).
* `NEXTAUTH_SECRET`: A secret string used for signing tokens/cookies by NextAuth.js. Generate using `openssl rand -base64 32`.
* *(Potentially others depending on frontend features and integrations)*

## CONTRIBUTING

Contributions are welcome! Please follow standard fork-and-pull-request workflow. Ensure code is well-formatted and includes relevant tests where applicable.

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -am 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Create a new Pull Request.

## LICENSE

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ACKNOWLEDGEMENTS

* Twilio - For providing robust communication APIs.
* Google - For the powerful Gemini language model.
* Flask, Next.js, React, and all other open-source libraries used.
