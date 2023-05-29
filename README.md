# Auction House Application

This repository contains a web application developed for an
university project. The Auction House Application is built
using Spring Boot for the backend and React with Tailwind
CSS and Shadcn UI for the frontend.

The application simulates an auction house where users can
bid on various items listed for auction. It provides a
user-friendly interface for both buyers and sellers to
interact with the auction system.

## Features

- User authentication: Users can log in to the
  application. Only the email is required for login.
- Item listing: Sellers can create auctions by providing
  item details, starting bid, and auction duration.
- Bidding: Buyers can place bids on items that are up for
  auction.
- Search and filtering: Users can search for specific items
  and filter the auction list based on various criteria.

## Technologies Used

- **Spring Boot**: Used to build the backend RESTful API,
  handle authentication, and manage database interactions (
  H2).
- **Vite**: A fast build tool for modern web applications.
  Used for the frontend development server and build
  process.
- **React**: Used for building the dynamic and responsive
  user interface.
- **Tailwind CSS**: A utility-first CSS framework for
  styling the frontend components.
- **Shadcn UI**: A UI component library for React that
  provides pre-designed components and styles.

## Prerequisites

To run this application locally, you need to have the
following installed:

- Java Development Kit (JDK) 8 or later
- Node.js and npm (Node Package Manager)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/seya12/auction-house-spring.git
   ```
2. Backend Setup
    - Open the backend folder:
      ```bash
      cd auction-house-spring/backend
      ```
    - Build and run the backend application using Maven:
      ```bash
      mvn spring-boot:run
      ```
3. Frontend setup:
    - Open the frontend folder:
      ```bash
      cd ../frontend
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Start the frontend development server:
      ```bash
      npm run dev
      ```

4. Access the application:
    - Open your web browser and
      visit `http://localhost:5173/` to access the Auction
      House Application.

## Configuration

The application configuration can be found in the following
files:

- `backend/src/main/resources/application.properties`:
  Contains the backend configuration properties, such as
  database connection settings and server port.
- `frontend/vite.config.ts`: Contains the frontend
  configuration, such
  as API endpoint URL.