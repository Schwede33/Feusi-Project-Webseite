# Quickstart Webtechnologien Projekt






## Setup database and REST API
Open a terminal in the VM and run the following commands:

```bash
git clone https://github.com/Schwede33/Feusi-Project-Webseite
cd w3schools-database  # Wechselt in den neuen Ordner w3schools-database
git pull  # update repository
docker-compose up -d  # (wenn es probleme gibt, system neustarten)
code .  # Startet Visual Studio Code im aktuellen Ordner
```



### Troubleshooting
If you encounter any issues, ensure that Docker is running and that the containers are up. You can check the status of the containers with:
```bash
docker ps
```
If the containers are not running, you can start them with:
```bash
docker-compose up -d
```

## Web Application with Next.js
### Install Node.js and npm
Make sure Node.js and npm are installed in your VM. You can install them using the following commands:

```bash
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"
# Download and install Node.js:
nvm install 24
# Verify the Node.js version:
node -v # Should print "v24.13.0".
# Verify npm version:
npm -v # Should print "11.6.2".
```


### Run the Next.js app
Navigate to the Next.js app folder and start the development server:

```bash
cd web-app
npm run dev
```

Open your web browser and navigate to:
```
http://localhost:3001
```
You should see my WEBSITE




