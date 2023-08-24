# Car Rental App(WORK IN PROGRESS)

The Car Rental App is a Node.js-based application using typescript designed to provide users with a seamless car rental experience, allowing them to rent cars and efficiently manage car-related operations.

## Car Rental App Architecture Explanation

The **Car Rental App** follows a modular and organized approach, emphasizing separation of concerns and encapsulation of functionalities. The architecture leverages the Hexagonal Architecture (also known as Ports and Adapters Architecture) to achieve this goal.

### Hexagonal Architecture

The Hexagonal Architecture focuses on isolating the core business logic from external dependencies like frameworks, databases, and UI components. Key components include:

- **Core Business Logic**: The core of the application houses use cases and domain entities, free from technology-specific implementations.
- **Ports**: Interfaces that define interactions between the core and external components. Ports act as gateways for input and output.
- **Adapters**: Implementations of interfaces defined by ports. Adapters bridge the gap between the core and external resources.

This architecture enables enhanced modularity, testability, and maintainability.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Categories](#categories)
  - [Specifications](#specifications)
  - [Users](#users)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [Functional Requirements (FR)](#functional-requirements-fr)
- [Non-Functional Requirements (NFR)](#non-functional-requirements-nfr)
- [Business Rules (BR)](#business-rules-br)

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd car-rental-app`
3. Install dependencies: `npm install`
4. The project supports Docker for containerization. Alternatively, you can run it locally with PostgreSQL. Note that while using Docker, if you have PGAdmin installed, you'll have to change the default port of Postgres

## Usage locally

1. Run the application: `npm start` (to run locally)
2. Access the app at: `http://localhost:3000`


## Usage with docker
1. [Docker Postgres Image](https://hub.docker.com/_/postgres)
   - This link takes you to the Docker Hub page for the official PostgreSQL Docker image.
   
2. [Docker Node Image](https://hub.docker.com/_/node/)
   - This link takes you to the Docker Hub page for the official Node.js Docker image.

1. After `npm install` be sure to have the PostgreSQL and Node images runing on docker
2. run `docker-compose build` to build the project in the containers
3. Run `docker-compose up` to run the project and it will be accessible at  `http://localhost:3000`


## API Endpoints

The application offers various API endpoints catering to different functionalities:

### Authentication

- `POST /sessions`: Authenticates a user and provides an authentication token.

### Categories

- `POST /categories`: Creates a new car category.
- `GET /categories`: Lists all available car categories.

### Specifications

- `POST /specifications`: Creates a new car specification (requires authentication).

### Users

- `POST /users`: Registers a new user.

## Folder Structure
<pre><details>
<summary>Folder structure, click here</summary>
┣ api/
┣ @types/
 ┃ ┗ express/
 ┃   ┗ index.d.ts
 ┣ adapters/
 ┃ ┣ in/
 ┃ ┃  ┗ http/
 ┃ ┃  ┣ container/
 ┃ ┃  ┃ ┗ index.ts
 ┃ ┃  ┣ controller/
 ┃ ┃  ┃ ┣ car-controller.ts
 ┃ ┃  ┃ ┣ login-controller.ts
 ┃ ┃  ┃ ┗ user-controller.ts
 ┃ ┃  ┣ middlewares/
 ┃ ┃  ┃ ┗ ensure-authenticated.ts
 ┃ ┃  ┣ utils/
 ┃ ┃  ┃ ┣ file.ts
 ┃ ┃  ┃ ┣ get-error.ts
 ┃ ┃  ┃ ┗ validate-data.ts
 ┃ ┃  ┣ validation/
 ┃ ┃  ┗ server.ts
 ┃ ┗ out/
 ┃   ┗ type-orm/
 ┃    ┣ migrations/
 ┃    ┃ ┣ 1690050815716-CreateCategories.ts
 ┃    ┃ ┣ 1690394856042-CreateSpecifications.ts
 ┃    ┃ ┣ 1690410227042-CreateUser.ts
 ┃    ┃ ┣ 1690828322698-addAvatarColumn.ts //yet to be implemented
 ┃    ┃ ┗ 1692364652563-CreateCar.ts
 ┃    ┣ postgres-adapter/
 ┃    ┃ ┣ models/
 ┃    ┃ ┃ ┣ car-model.ts
 ┃    ┃ ┃ ┣ specification-model.ts
 ┃    ┃ ┃ ┗ user-model.ts
 ┃    ┃ ┣ car-repository-adapter.ts
 ┃    ┃ ┣ specification-repository-adapter.ts
 ┃    ┃ ┗ user-repository-adapter.ts
 ┃    ┗ index.ts
 ┗ business/
   ┣ core/
   ┃ ┣ authenticate-user.ts
   ┃ ┣ car-create.ts
   ┃ ┣ car-delete.ts
   ┃ ┣ car-list.ts
   ┃ ┣ car-update.ts
   ┃ ┣ specification-create.ts
   ┃ ┣ specification-list.ts
   ┃ ┗ user-create.ts
   ┣ entities/
   ┃ ┣ Car.ts
   ┃ ┣ User.ts
   ┃ ┗ Specification.ts
   ┗ ports/
     ┣ car-ports.ts
     ┣ specification-ports.ts
     ┗ user-port.ts
</details>
</pre>



## Functional Requirements (FR)

### Car Registration
- Ability to register a new car.
- Car registration requires attributes like make, model, and year.
- Cars are registered with an availability status by default.
- Car registration limited to administrators.

### Car Listing
- Ability to list all available cars.
- Users can filter available cars by category, manufacturer, and name.
- User authentication not required for listing all cars.
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

- Validation mechanisms ensure accurate user inputs.
- Robust error handling enhances user experience.
- User authentication and authorization ensure secure operations.
- Comprehensive documentation covers codebase, APIs, and setup.
- Focus on performance, security, and scalability enhances application quality.

## Business Rules (BR)

### Car Registration
- Prevent car registration with an existing license plate.
- Disallow changing license plates of already registered cars.
- Register cars with an availability status by default.
- Only administrators can perform car registration.

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
## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for improvements or bug fixes.

The Car Rental App's architecture provides clarity, modularity, and scalability. This documentation offers insights into installation, usage, functionalities, and requirements, fostering a better understanding of the application's ecosystem.
## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.


