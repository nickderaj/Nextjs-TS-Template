## Table of Contents

1. [Introduction](#introduction)
2. [Project Setup](#project-setup)
3. [Dev Tools](#dev-tools)
4. [Images](#images)

## Introduction

This is a Next.js app with TypeScript that performs simple CRUD operations using Firebase as the backend.

- Redux Tookit: To store and manage global state,
- Firebase: To perform CRUD operations without the need for a backend,
- Jest: To run unit/integration tests,
- Tailwind CSS: for quick development without the need of CSS classes,
- ESlint + Prettier + Husky Git Hooks: to format the code and ensure that no matter who works on the code, it will stay formatted the same way,
- Template Components (Buttons, Layouts and Modals with React Portals + Redux ) to easily replicate.

## Project Setup

- To run the app, run `yarn install` and `yarn dev`.
- You'll need to include your own environment variables from youre Firebase Project, check `env.example` for the required env. variables.
- To run Jest, run `yarn test`.
- The lint and formatting functions are `yarn lint` and `yarn prettier` respectively.
- The lint function will auto-run when you try to commit to a git repo, set up in the .husky folder.

Note: This app was designed to only be used with yarn to prevent a `package-lock.json` from being created which can cause conflicts - change the `engines` in `package.json` if you want to use npm instead.

## Dev Tools

I added a "Dev" button on the top right which allows you to seed and delete all data from the frontend itself - obviously this would be removed in a production app and is just there for testing purposes.

## Images

| <img src="public\docs\1. No Friends.png" width="500"> |
| :---------------------------------------------------: |
|      **Figure 1.** _Front Page Without Friends_       |

| <img src="public\docs\2. With Friends.png" width="500"> |
| :-----------------------------------------------------: |
|         **Figure 2.** _Front Page With Friends_         |

| <img src="public\docs\3. Create.png" width="500"> |
| :-----------------------------------------------: |
|        **Figure 3.** _Create Friend Modal_        |

| <img src="public\docs\4. Update.png" width="500"> |
| :-----------------------------------------------: |
|         **Figure 4.** _Edit Friend Modal_         |

| <img src="public\docs\5. Delete.png" width="500"> |
| :-----------------------------------------------: |
|        **Figure 5.** Delete Friend Modal_        |

| <img src="public\docs\6. Pagination.png" width="500"> |
| :---------------------------------------------------: |
|              **Figure 6.** _Pagination_               |

| <img src="public\docs\7. Dev Tools.png" width="500"> |
| :--------------------------------------------------: |
|               **Figure 7.** Dev Tools                |
