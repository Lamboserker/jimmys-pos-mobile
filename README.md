# Jimmy's POS Mobile App

This is a mobile frontend application for Jimmy's Point of Sale (POS) system. It is designed to interact with the POS backend server to manage items, sales, and users. The app provides a user-friendly interface for employees to handle sales, view items, and manage their tasks efficiently.

## Features

- **Sales Management**: Record and view sales with options to filter and search.
- **Item Management**: Browse items and their details.
- **User Authentication**: User login and session management.
- **Pfand Handling**: Support for Pfand (deposit) on orders.

## Technologies Used

- **React Native**: For building cross-platform mobile applications.
- **Redux**: For state management.
- **React Navigation**: For handling navigation and routing.
- **Axios**: For making HTTP requests to the backend API.
- **React Hook Form**: For managing forms and validation.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (version 16 or higher)
- React Native CLI
- Android Studio (for Android development) or Xcode (for iOS development)
- Expo CLI (if using Expo for development)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/Lamboserker/jimmys-pos-mobile.git
   cd jimmys-pos-mobile

2. Install the dependencies:

   ```
   npm install

3. Set up environment variables by creating a .env file in the root of the project and adding the following:
   ```
   API_URL=<your_backend_api_url>

4. Start the development server:
   ```
   npm start

  Follow the instructions provided by Expo CLI or React Native CLI to run the app on a simulator/emulator or physical device.

  ## Usage

  - **Sales Management:** Navigate to the sales screen to record and view sales. Use filters to search by product, date, or user.
  - **Item Management:** Browse and view details of items available in the inventory.
  - **User Authentication:** Log in to access the app's features and manage your sessions.
