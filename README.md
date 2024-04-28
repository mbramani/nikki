# Nikki

Whether you want to remember a special moment, reflect on your growth, or simply clear your mind, our website makes it easy to do so. Start journaling today and enjoy the benefits of a more mindful, intentional life.

## Tech Stack

**Client:** React, Redux, React_Router, TailwindCSS, Twin.macro, Vite, Styled Components, Formik

**Server:** Node, Express, Jsonwebtoken, Mongoose, Morgan, Nodemailer, Winston, Bcrypt

## Features

- **Cross Platform:** Write from any internet-connected device, with pages optimized for all screen sizes
- **Export:** Download all of your journal entries at any time for backup or safekeeping
- **Encrypted Data:** All journal entries are encrypted by converting them into a secret code that only the user can read
- **Dark Mode:** Take it easy on your eyes, with an easily accessible toggle from all screens and detection of night hours to turn on automatically

## Run Locally

Clone the project

```bash
  git clone https://github.com/mbramani/Nikki
```

### For Client Side Code

```bash
  # Go to the project directory
  cd client

  # Install dependencies
  npm install

  # Start the server
  npm run dev

```

### For Server Side Code

Go to the project directory

```bash
  # Go to the project directory
  cd server

  # Install dependencies
  npm install

  # Start the server
  npm run dev

```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file (using the `.env.sample` file as a reference)

### For Client

```env
VITE_CF_TURNSTILE_KEY=<cloud_fare_turnstile_key>
VITE_BASE_URL=<server_url>
```

### For Server

```env
WEBSITE=<website_url>
SERVER=<server_url>
PORT=5000
DB_NAME=<database name>
MONGODB_URI=mongodb+srv://<user_name>:<password>@<cluster_url>/<database_name>?retryWrites=true&w=majority
DATA_ENCRYPT_SECRET=<encryption_key>
JWT_SECRET=
JWT_LIFETIME=
REFRESH_TOKEN_LIFETIME=
RESET_PASSWORD_TOKEN_LIFETIME=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
TEST_SMTP_USER=<user_name>@ethereal.email
TEST_SMTP_PASSWORD=<ethereal_email_password>
```

## Screenshots

<!-- ![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here) -->
<p float="left">
 <img src="https://github.com/mbramani/Nikki/blob/main/client/screenshots/main.png?raw=true" width="400">
 <img src="https://github.com/mbramani/Nikki/blob/main/client/screenshots/features.png?raw=true" width="400">
</p>
<p float="left">
 <img src="https://github.com/mbramani/Nikki/blob/main/client/screenshots/app.png?raw=true" width="400">
 <img src="https://github.com/mbramani/Nikki/blob/main/client/screenshots/year.png?raw=true" width="400">
</p>
<p float="left">
 <img src="https://github.com/mbramani/Nikki/blob/main/client/screenshots/month.png?raw=true" width="400">
 <img src="https://github.com/mbramani/Nikki/blob/main/client/screenshots/day.png?raw=true" width="400">
</p>

## Authors

- [@mbramani](https://github.com/mbramani)

## License

[MIT](https://github.com/mbramani/Nikki/blob/main/LICENSE)
