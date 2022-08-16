## Table of Contents

1. [Introduction](#introduction)
2. [Project Setup](#project-setup)
3. [API Routes](#api-routes)

## Introduction

This is a Next.js + TypeScript simple app to upload and filter through a specific type of CSV file.

- Redux Tookit: To store and manage global state
- Jest: To run frontend and api tests
- Tailwind CSS: for quick development without the need of CSS classes,
- ESlint + Prettier + Husky Git Hooks: to format the code and ensure that no matter who works on the code, it will stay formatted the same way.

## Project Setup

- To run the app, run `yarn install` and `yarn dev`.
- To run Jest, run `yarn test`.
- The lint and formatting functions are `yarn lint` and `yarn prettier` respectively.
- The lint function will auto-run when you try to commit to a git repo, set up in the .husky folder.

Note: This app was designed to only be used with yarn to prevent a `package-lock.json` from being created which can cause conflicts - change the `engines` in `package.json` if you want to use npm instead.

## API Routes

- As this is a Next.js app, the API routes are integrated under `pages/api/v1` and are run on the server-side as Node.js code.
- They are called by the frontend which are the other `pages` files, not nested under `/api`.
