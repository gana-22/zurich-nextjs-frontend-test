# Zurich Customer Portal

This project is a customer portal built with Next.js, NextAuth, and Redux.
This is a customer portal for their customers to create an account, purchase and/or renew their insurance, check their insurance portfolio, and submit a claim.

## Features

-   User authentication with Google OAuth2.
-   Display of a filtered user list from an external API.
-   Email masking with a "Show/Hide Email" toggle.
-   Pagination of the user list.
-   Inactivity logout.
-   Responsive design.

## Technologies Used

-   Next.js
-   NextAuth
-   Redux Toolkit
-   React Testing Library
-   Jest
-   MUI
-   Styled-components

## Installation

1. Clone the repository:
  ```sh
  git clone https://github.com/gana-22/zurich-nextjs-frontend-test.git
  cd zurich-nextjs-frontend-test
  ```

2. Install dependencies:
  ```sh
  npm install
  ```
  
3. Copy the `.env.example` file and rename it as `.env.local` then fill in the required credentials.
```sh
mv .env.example .env.local
```

4.  Run the development server: `npm run dev`.


## Testing
Run the unit tests using jest:
```sh
npm run test
```


## Linting
Lint the code using ESLint:
```sh
npm run lint
```


## Coverage
The test coverage is 90% and above
```sh
npm run coverage
```