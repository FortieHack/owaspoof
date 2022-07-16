![gophish logo](https://raw.github.com/gophish/gophish/master/static/images/gophish_purple.png)

OwaSpoof
=======

Open-Source Phishing Site built with Node JS

OwaSpoof by [FortieHack](https://fortiehack.com) is an open-source phishing site designed for businesses and penetration testers. It uses a fake OWA Login page to collect credentials from users and store in  MongoDB database. It can easily be setup in a matter of minutes. Follow the steps below to get started

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
I have edited the config.json and other files to make it easier for you to get started.

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

Now end the docker command that is currently running. And follow this next step to start the mongodb container you have created. It will now run in the background. You will get the id for your container after running the ```docker ps -a``` command.

```sh
docker start <CONTAINER-ID>
docker build -t fortiehack/owaspoof .
docker run -it -p 8080:8080 fortiehack/owaspoof
docker run -d fortiehack/owaspoof
```

Once you do a docker run, immediately you will see your running config and also the temporary password. Copy it out and use it to login at the admin panel. It should look like: https://example.com:3333. You will be prompted to change your password immediately after login. Change the password to something you can remember and something strong.

### Start your GoPhish
Finally, all you need to do is to exit the previous docker container. The container will be stopped. Use this command ```docker ps -a``` to get the container id and start the container.

```sh
docker start <CONTAINER-ID>
```


### Set up Letsencrypt
We will now create a certificate for our domain. Ensure that you have set this instance IP as an A Record in your DNS. It should map to the URL that you want to generate a certificate for. 

First things first, let us ensure that our nginx.conf is working fine. Edit it to match what you have below.

```sh
letsencrypt certonly
```

Enter you email address; Enter the URL of the domain; and select the option to validate by setting up a temporary server. For other options, choose as you wish. This command will have created 2 files (certificate and key). Copy them to your gophish directory.

```sh
cp /etc/letsencrypt/live/example.com/fullchain.pem /opt/gophish
cp /etc/letsencrypt/live/example.com/privkey.pem /opt/gophish
```

NB: example.com is just for illustration. The path should be same as the URL you used.

