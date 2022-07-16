![gophish logo](https://raw.github.com/gophish/gophish/master/static/images/gophish_purple.png)

OwaSpoof
=======

Open-Source Phishing Site built with Node JS

OwaSpoof by [FortieHack](https://fortiehack.com) is an open-source phishing site designed for businesses and penetration testers. It uses a fake OWA Login page to collect credentials from users and store in MongoDB database. It can easily be setup in a matter of minutes.

### Install Dependencies
Install the following dependencies needed for your environment

```sh
sudo su
apt update
apt install docker.io -y
apt install golang-go -y
apt install certbot -y
```


### Clone this Repo
I have edited the config.json and other files to make it easier for you to get started.

```sh
git clone https://github.com/okon-emma/gophish-docker.git /opt/gophish
cd /opt/gophish
```

### Set up Letsencrypt
We will create a certificate by kickstarting a temporary server to validate our domain. Ensure that you have set this instance IP as an A Record in your DNS. It should map to the URL that you want to generate a certificate for.

```sh
letsencrypt certonly
```

Enter you email address; Enter the URL of the domain; and select the option to validate by setting up a temporary server. For other options, choose as you wish. This command will have created 2 files (certificate and key). Copy them to your gophish directory.

```sh
cp /etc/letsencrypt/live/example.com/fullchain.pem /opt/gophish
cp /etc/letsencrypt/live/example.com/privkey.pem /opt/gophish
```

example.com is just for illustration. The path should be same as the URL you used.


### Docker Image Build
Now we will build our image and run it to get our temporary password for the "admin" user. You can as well use your desired tag for the docker image.

```sh
docker build -t okon/gophish .
docker run -it -p 3333:3333 -p 443:443 okon/gophish
```

Once you do a docker run, immediately you will see your running config and also the temporary password. Copy it out and use it to login at the admin panel. It should look like: https://example.com:3333. You will be prompted to change your password immediately after login. Change the password to something you can remember and something strong.

### Start your GoPhish
Finally, all you need to do is to exit the previous docker container. The container will be stopped. Use this command ```docker ps -a``` to get the container id and start the container.

```sh
docker start <CONTAINER-ID>
```

