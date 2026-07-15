# Job Application Tracker

A full-stack web application built using Spring Boot and MySQL to manage job applications. The application helps users keep track of applications by allowing them to add, update, search, filter, and delete records.

## Technologies Used

- Java
- Spring Boot
- Spring Data JPA
- MySQL
- HTML
- CSS
- JavaScript

## Features

- Add a new job application
- Update existing applications
- Delete applications
- Track application status (Applied, Interview, Rejected, Offer)
- Search by company name
- Filter applications based on status
- Sort applications by company name
- Automatically store the application date
- Input validation
- Duplicate company entry prevention
- Custom exception handling

## API Endpoints

- `GET /api/jobs` - Get all job applications
- `POST /api/jobs` - Add a new job application
- `PUT /api/jobs/{id}` - Update a job application
- `DELETE /api/jobs/{id}` - Delete a job application
- `GET /api/jobs/search?company={name}` - Search by company name

## How to Run

1. Clone this repository.
2. Create a MySQL database named `jobtracker`.
3. Update the database username and password in `application.properties`.
4. Run the Spring Boot application.
5. Open the frontend in your browser.

## Future Improvements

- Add user authentication
- Export application data
- Add pagination
- Improve UI design

## Author

**Harshytha Dumala**
