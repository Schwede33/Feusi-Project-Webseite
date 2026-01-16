# W3Schools Database in Docker

Forked from https://github.com/leandrolerena/w3schools-database for academic purposes.

This repository provides:

- a docker compose which sets up the DB on port 3309 (non-default, no clashes)
- initializes the database data from w3schools (provided by @AndrejPHP) 
- Visual Studio Code config

## Setup 

- Setup is as easy as:

```bash
docker compose up -d
```

-  Data is stored in the data directory


## Tables

When the docker container starts, it creates database named __w3schools__ with the following tables

    categories
    customers
    employees
    orders
    order_details
    products
    shippers
    suppliers
    
and inserts the respective data. 

## How to reset?

Execute:

```bash
docker compose down
rm -rf data
docker compose up -d
```

## Features
1. Get and list all categories
2. Create a new category
3. Update an existing category
4. Delete a category
5. Give an error message to the user when trying to delete a category that can't be deleted

## Journal
### 14.09.2024
The project setup was quite difficult, as I am missing some linux and docker experience.
After some try and errors and support from ChatGPT I made it finally work

### 17.09.2024
With some try-and-error I could finally create a new page with a list of all categories. 

## 18.09.2024
Today I created the "Create new category" page.
I had some problems with the form submission, as I forgot the method="post" attribute in the form tag.
Also I had some problems with the redirection after the category creation, as I forgot to add the leading slash in the header location.

## 19.09.2024
Today I created the "Update category" page.
The main problem was to get the category id from the url and to prefill the form with the existing data.

