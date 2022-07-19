![gophish logo](https://raw.github.com/gophish/gophish/master/static/images/gophish_purple.png)

# OwaSpoof

Open-Source Phishing Site built with Node JS

OwaSpoof by [FortieHack](https://fortiehack.com) is an open-source phishing site designed for businesses and penetration testers. It uses a fake OWA Login page to collect credentials from users and store in MongoDB database. It can easily be setup in a matter of minutes. Follow the steps below to get started

### Create Virtual Instance

You can create an ubuntu instance with any cloud provider of your choice. For AWS, you can follow [this guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html) to set it up. Ensure to expose port 80, 443 and 27017 on the instance.

### Install Dependencies

Install the following dependencies needed for your environment setup.

```sh
sudo su
apt update
apt install docker.io -y
apt install nodejs -y
apt install npm -y
apt install build-essential
apt install nginx -y
apt install certbot python3-certbot-nginx -y
```

### Clone this Repo

I have edited the config.js and other files to make it easier for you to get started.

```sh
git clone https://github.com/FortieHack/owaspoof.git /src/owaspoof
cd /src/owaspoof
```

### Docker Image Build

Now we will build the image for our mongodb and for our web server. Ensure to change the credentials for the mongodb. The default credential here is root:toor1234. You can as well use your desired tag for the docker images.

```sh
docker pull mongo
docker run -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=toor1234 -p 27017:27017 mongo
```

Now end the docker command that is currently running. And follow this next step to start the mongodb container you have created. It will now run in the background. You will get the id for your container after running the `docker ps -a` command.

NB: You can always edit the ```config.js``` in your root directory before the build to put the connection string of your mongodb if you have it hosted at a different location.

```sh
docker start <CONTAINER-ID>
docker build -t fortiehack/owaspoof .
docker run -d -p 8080:8080 fortiehack/owaspoof
```

### Configure Reverse Proxy

Currently if you visit your site, you will still be seeing the default nginx welcome page. Let's change that by doing a simple redirect.
We are going to tell nginx to forward all requests coming from port 80 to our localhost running at port 8080. Type the below command to edit your nginx default config.

```sh
vim /etc/nginx/sites-available/default
```

The config should look like below:

```sh
...
server_name example.com;
...
```

```sh
...
server {
...
    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
...
}
...
```

Test the configuration with:

```sh
nginx -t
```

Now, Restart Nginx and your site should now show the OWA Login Page. 

```sh
systemctl restart nginx
```

However, you might be experiencing issues with some styles and scripts not loading. This is due to a browser restriction. To fix this we are going to setup our site to run on https.

### Set up Letsencrypt

We will now create a certificate for our domain. Ensure that you have set this instance IP as an A Record in your DNS. It should map to the URL that you want to generate a certificate for.

Type this command and follow the instructions. You should have successfully set up HTTPS.

```sh
certbot --nginx -d example.com
```