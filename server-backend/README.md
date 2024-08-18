# Mini Task Management System

## About This Project
This is a Mini Task Management System designed to manage tasks efficiently. Users can create, update, and delete tasks, and manage various aspects of their task lists.

## Run This Project

### Clone It
Clone the repository to your local machine:
```bash
git clone https://github.com/ajaykumar776/deep-dive-media-task.git

````

2. Install dependencies:
``` bash
composer install
```

3. Set up environment variables:
```bash
cp .env.example .env
php artisan key:generate

```
4. Run migrations:

```bash
php artisan migrate --seed

```
5. Run migrations:

```bash
php artisan serve

```