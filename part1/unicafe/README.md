# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

```mermaid
---
title: anecdotes
---
sequenceDiagram
    participant User
    participant Browser
    participant Database   
    User->>Browser: Fetch data using randomise function
    Browser->> Database: Provide data 
    Database->> Browser: Here is the data
    Browser->> User: Data as per request
    User->>Browser: Display data

```
