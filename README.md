# ApplyTrack

## 📌 Project Overview
ApplyTrack is a full-stack web application that helps users **track and manage their job applications** throughout the hiring process. Instead of relying on spreadsheets or notes, users can store applications in one centralized dashboard, update their status, view salary information, and discover new job opportunities using a third-party job listings API.

This project was built as a **team-based full-stack application** using React, Flask, PostgreSQL, and an external API as part of a 4Geeks Academy final project.

---

## 🚀 Features
- User authentication (register, login, logout)
- Add job applications with company, role, location, salary, and status
- View all applications in a centralized dashboard
- Update application status (Applied, Interview, Offer, Rejected)
- Delete outdated or rejected applications
- Search real job listings using a third-party API (JSearch)
- Save jobs directly from search results into the tracker
- Simple and intuitive navigation

---

## 🧑‍💻 Key User Stories (MVP)
- As a user, I want to create an account so I can securely store my job applications.
- As a user, I want to log in and log out so only I can access my data.
- As a user, I want to add a job application so I can track where I applied.
- As a user, I want to view all my job applications in one dashboard so I can see my progress.
- As a user, I want to update the status of a job application so I can track my hiring stage.
- As a user, I want to search for jobs using a third-party API so I can find new opportunities.
- As a user, I want to save jobs from search results so I don’t have to manually enter details.

---

## 🔌 Third-Party API
ApplyTrack integrates the **JSearch API**, which provides real job listings based on keyword and location. When available, salary information is displayed. Only essential job details are stored locally in the database to support application tracking.

---

## 🏗 Tech Stack
- **Frontend:** React, JavaScript, HTML, CSS  
- **Backend:** Python, Flask  
- **Database:** PostgreSQL  
- **Third-Party API:** JSearch (Job Listings)

---

## 📂 Project Structure...



# WebApp boilerplate with React JS and Flask API

Build web applications using React.js for the front end and python/flask for your backend API.

- Documentation can be found here: https://4geeks.com/docs/start/react-flask-template
- Here is a video on [how to use this template](https://www.loom.com/share/f37c6838b3f1496c95111e515e83dd9b)
- Integrated with Pipenv for package managing.
- Fast deployment to Render [in just a few steps here](https://4geeks.com/docs/start/deploy-to-render-com).
- Use of .env file.
- SQLAlchemy integration for database abstraction.

### 1) Installation:

> If you use Github Codespaces (recommended) or Gitpod this template will already come with Python, Node and the Posgres Database installed. If you are working locally make sure to install Python 3.10, Node 

It is recomended to install the backend first, make sure you have Python 3.10, Pipenv and a database engine (Posgress recomended)

1. Install the python packages: `$ pipenv install`
2. Create a .env file based on the .env.example: `$ cp .env.example .env`
3. Install your database engine and create your database, depending on your database you have to create a DATABASE_URL variable with one of the possible values, make sure you replace the valudes with your database information:

| Engine    | DATABASE_URL                                        |
| --------- | --------------------------------------------------- |
| SQLite    | sqlite:////test.db                                  |
| MySQL     | mysql://username:password@localhost:port/example    |
| Postgress | postgres://username:password@localhost:5432/example |

4. Migrate the migrations: `$ pipenv run migrate` (skip if you have not made changes to the models on the `./src/api/models.py`)
5. Run the migrations: `$ pipenv run upgrade`
6. Run the application: `$ pipenv run start`

> Note: Codespaces users can connect to psql by typing: `psql -h localhost -U gitpod example`

### Undo a migration

You are also able to undo a migration by running

```sh
$ pipenv run downgrade
```

### Backend Populate Table Users

To insert test users in the database execute the following command:

```sh
$ flask insert-test-users 5
```

And you will see the following message:

```
  Creating test users
  test_user1@test.com created.
  test_user2@test.com created.
  test_user3@test.com created.
  test_user4@test.com created.
  test_user5@test.com created.
  Users created successfully!
```

### **Important note for the database and the data inside it**

Every Github codespace environment will have **its own database**, so if you're working with more people eveyone will have a different database and different records inside it. This data **will be lost**, so don't spend too much time manually creating records for testing, instead, you can automate adding records to your database by editing ```commands.py``` file inside ```/src/api``` folder. Edit line 32 function ```insert_test_data``` to insert the data according to your model (use the function ```insert_test_users``` above as an example). Then, all you need to do is run ```pipenv run insert-test-data```.

### Front-End Manual Installation:

-   Make sure you are using node version 20 and that you have already successfully installed and runned the backend.

1. Install the packages: `$ npm install`
2. Start coding! start the webpack dev server `$ npm run start`

## Publish your website!

This boilerplate it's 100% read to deploy with Render.com and Heroku in a matter of minutes. Please read the [official documentation about it](https://4geeks.com/docs/start/deploy-to-render-com).

### Contributors

This template was built as part of the 4Geeks Academy [Coding Bootcamp](https://4geeksacademy.com/us/coding-bootcamp) by [Alejandro Sanchez](https://twitter.com/alesanchezr) and many other contributors. Find out more about our [Full Stack Developer Course](https://4geeksacademy.com/us/coding-bootcamps/part-time-full-stack-developer), and [Data Science Bootcamp](https://4geeksacademy.com/us/coding-bootcamps/datascience-machine-learning).

You can find other templates and resources like this at the [school github page](https://github.com/4geeksacademy/).
