# Web Application Using OpenAI's Large Language Models GPT3.5

A web application that allows users to interact with OpenAI's modles through a simple and user-friendly interface.
This Application to Support Student Learning that enhances the learning process, making it more engaging and effective.


## Features
- User-friendly interface for making requests to the OpenAI API
- Responses are displayed in a chat-like format
- Select Models (DALL·E, GPT35TURBO, GPT35TURBO16K, ADA) based on your needs
- Create AI Images (DALL·E)
- Highlight code syntax

## Technologies Used
- For Front End, We have used Reactjs and Vite.
- For Back End, We used Nodejs and Redis with MySQL as the Database Management System.

## Setup
### Prerequisites
- Node.js
- Redis, MySQL
- OpenAI API Key
### Installation
#### Back End: Note.js, Redis, MySQL
1. Install the Node.js and npm:
Ensure that Node.js and npm (Node Package Manager) are installed on your machine. You can download and install them from the official website: <a href="https://nodejs.org/en" target="_blank">Node.js</a>.
2. Clone the repository:
```sh
git clone https://github.com/idaka123/Virtual_Assistant_Raine
```
3. Install the dependencies:
```sh
npm install
```
4. Install Redis:
##### On MacOS:
```sh
brew install redis
```
##### On Windows:
- Download Redis from the <a href="https://redis.io/download/" target="_blank">official Redis download page</a>.
- Extract the downloaded file and run redis-server.exe.
5. Install MySQL:
##### On MacOS:
```sh
brew install mysql
brew services start mysql
```
##### On Windows:
- Download MySQL Installer from the <a href="https://www.mysql.com/downloads/" target="_blank">official MySQL download page</a>.
- Run the installer and follow the installation instructions.
6. Create a .env file in the root folder and add your API keys in the following format:
```sh
NODE_ENV=statging
 
# OPENAI_API
OPENAI_API_KEY=YOUR_API_KEY
 
# AZURE OPENAI_API
AZURE_OPENAI_API_KEY="YOUR_API_KEY"
AZURE_OPENAI_API_URL="YOUR_API_URL"
AZURE_OPENAI_API_INSTANCE_NAME="YOUR_INSTANCE_NAME"
AZURE_OPENAI_API_VERSION="YOUR_VERSION"
 
TEMPLATE_GPT=0.5
 
# WEATHER_API
WEATHER_ORIGIN_URL="http://api.weatherapi.com/v1"
WEATHER_API_KEY="YOUR_API_KEY"
 
# DISCORD_BOT_TOKEN
DISCORD_BOT_TOKEN="YOUR_BOT_TOKEN"
OWNER_ID="YOUR_DISOCRD_ID"
RAINE_ID="Bot_ID"
CHANNEL_CRON_ID="YOUR_CHANNEL_DISCORD_ID"
 
SERVER_PORT="YOUR_SERVER_PORT"
ORIGIN_URL="YOUR_ORIGIN_URL"
 
REDIS_PORT=6379
REDIS_URL="YOUR_REDIS_URL"
 
TRANSLATE_PROMPT="you are suppose to be an translator, your's job is to translate the text into english, with 5 explaination and usage examples of that case in Japanese, and you are a loyal assistant of Raine"
 
# DATABASE
 
DATABASE_ID="Your_Database_ID"
DATABASE_USERNAME="YOUR_DATABASE_USERNAME"
DATABASE_NAME="YOUR_DATABASE_NAME"
DATABASE_PASSWORD="YOUR_DATABASE_PASSWORD"
FORWARD_DB_PORT=3306
DATABASE_URL="YOUR_DATABASE_URL"
 
# SERPER
SERPER_API_KEY="YOUR_API_KEY"
 
# BROWERLESS
BROWERLESS_API_KEY="YOUR_API_KEY"

```
7. Run the project:
```sh
npm run build:dev
```
Or
```sh
npm run dev :production
```

#### Front End: React.js + Vite
1. Clone the repository:
```sh
git clone https://github.com/idaka123/studyIO
```
2. Install the dependencies:
```sh
npm install
```
3. Run the project:
```sh
npm run dev
```
4. Now when you navigate to http://localhost:3001 you will see web response.


## Contributing

This project welcomes contributions and suggestions for improvements. If you have any ideas, please feel free to open an issue or create a pull request.

Thank you for your consideration.

