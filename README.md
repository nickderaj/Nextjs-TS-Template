## Table of Contents

1. [Introduction](#introduction)
2. [Project Setup](#project-setup)
3. [Images](#images)

## Introduction

This is a Next.js app with TypeScript that protects uses Firebase Authentication to handle users and protect routes.

- Redux Tookit: To store and manage global state,
- Firebase: To authenticate the user based on an email + password,
- Jest: To run unit/integration tests,
- Tailwind CSS: for quick development without the need of CSS classes,
- ESlint + Prettier + Husky Git Hooks: to format the code and ensure that no matter who works on the code, it will stay formatted the same way,

## Project Setup

- To run the app, run `yarn install` and `yarn dev`.
- You'll need to include your own environment variables from youre Firebase Project, check `env.example` for the required env. variables.
- To run Jest, run `yarn test`.
- The lint and formatting functions are `yarn lint` and `yarn prettier` respectively.
- The lint function will auto-run when you try to commit to a git repo, set up in the .husky folder.

Note: This app was designed to only be used with yarn to prevent a `package-lock.json` from being created which can cause conflicts - change the `engines` in `package.json` if you want to use npm instead.

## Images

| <img src="public\docs\1. Unauthenticated.png" width="500"> |
| :--------------------------------------------------------: |
|              **Figure 1.** _Unauthenticated_               |

| <img src="public\docs\2. Log In with Feedback.png" width="500"> |
| :-------------------------------------------------------------: |
|             **Figure 2.** _Log In (with feedback)_              |

| <img src="public\docs\3. Protected Route.png" width="500"> |
| :--------------------------------------------------------: |
|              **Figure 3.** _Protected Route_               |

| <img src="public\docs\4. Log Out.png" width="500"> |
| :------------------------------------------------: |
|           **Figure 4.** _Log Out Modal_            |

| <img src="public\docs\5. Sign Up.png" width="500"> |
| :------------------------------------------------: |
|           **Figure 5.** Sign Up Modal\_            |
