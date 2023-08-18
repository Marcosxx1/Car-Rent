# Car Rental App

## Table of Contents
- [Functional Requirements (FR)](#functional-requirements-fr)
- [Non-Functional Requirements (NFR)](#non-functional-requirements-nfr)
- [Business Rules (BR)](#business-rules-br)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Categories](#categories)
  - [Specifications](#specifications)
  - [Users](#users)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)


## Functional Requirements (FR)

### Car Registration
- It should be possible to register a new car.
- Car registration should require attributes like make, model, year, etc.
- Cars should be registered with availability status by default.
- Only administrators should be able to register cars.

### Car Listing
- It should be possible to list all available cars.
- Users should be able to filter available cars by category name, manufacturer, and name.
- Users do not need to be logged in to list all cars.

### Car Specification Registration
- It should be possible to register specifications for a car.
- Specifications could include engine type, fuel efficiency, etc.
- Specifications must not be registered for non-existing cars.
- Users should be administrators to register car specifications.
- It should be possible to list all specifications.
- It should be possible to list all cars along with their specifications.

### Car Image Registration
- It must be possible to register images for cars.
- Users can upload more than one image for the same car.
- Users responsible for registration should be administrators.
- Multer should be used to handle image uploads.
- It should be possible to list all cars along with their images.

### Car Rent
- It should be possible to register a car rental.
- Car rental details should include start date, end date, user ID, etc.
- Rentals must be for a minimum of 24 hours.
- Users should not be able to register a new rental if they already have one.
- Users should not be able to register a new rental for a car that is already rented.

## Non-Functional Requirements (NFR)

- Validation mechanisms must be in place for user inputs.
- Error handling should be robust and user-friendly.
- User authentication and authorization should be implemented.
- Documentation should be provided for codebase, APIs, and setup instructions.
- Performance, security, and scalability aspects should be considered and addressed.

## Business Rules (BR)

### Car Registration
- Car registration must not be possible with an existing license plate.
- Changing the license plate of an already registered car should not be allowed.
- Cars must be registered with availability status by default.
- Only administrators can register cars.

### Car Specification Registration
- Specifications must not be registered for non-existing cars.
- Registering the same specification for the same car should not be allowed.
- Only administrators can register car specifications.

### Car Image Registration
- Users can upload multiple images for the same car.
- Users responsible for registration should be administrators.

### Car Rent
- Rentals must be for a minimum of 24 hours.
- Users must not be able to register a new rental if they already have one.
- Users must not be able to register a new rental for a car that is already rented.

# Car Rental App

This is a Node.js-based car rental app that allows users to rent cars and manage car-related operations.

## Installation

1. Clone this repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd car-rental-app`
3. Install dependencies: `npm install`

## Usage

1. Run the app: `npm start`
2. The app will be accessible at: `http://localhost:3000`

## API Endpoints

### Authentication

- POST `/sessions` - Authenticate a user and receive an authentication token.

### Categories

- POST `/categories` - Create a new car category.
- GET `/categories` - List all car categories.
- POST `/categories/import` - Import car categories from a file.

### Specifications

- POST `/specifications` - Create a new car specification (requires authentication).

### Users

- POST `/users` - Create a new user.
- PATCH `/users/avatar` - Update user avatar (requires authentication).

## Folder Structure

- `src/`
  - `middlewares/` - Middleware functions for authentication.
  - `modules/`
    - `accounts/`
      - `useCases/`
        - `authenticateUser/` - Use case for user authentication.
        - `createUser/` - Use case for user creation.
        - `updateUserAvatar/` - Use case for updating user avatar.
      - `repositories/` - Data repositories for user-related operations.
    - `cars/`
      - `useCases/`
        - `CreateCategory/` - Use case for creating car categories.
        - `importCategory/` - Use case for importing car categories from a file.
        - `ListCategories/` - Use case for listing car categories.
        - `CreateSpecification/` - Use case for creating car specifications.
      - `repositories/` - Data repositories for car-related operations.
  - `routes/`
    - `authenticate.routes.js` - Routes for user authentication.
    - `categories.routes.js` - Routes for car categories.
    - `specifications.routes.js` - Routes for car specifications.
    - `users.routes.js` - Routes for user-related operations.
    - `index.js` - Main router that combines all route modules.
  - `server.js` - Entry point for the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.


