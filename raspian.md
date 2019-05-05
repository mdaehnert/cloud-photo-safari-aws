# Setup OS


## install nginx
```
sudo apt-get install nginx

```

## setup nginx -  /etc/nginx/sites-available/default 

```
server {
  ...
  location / {
    root   /home/pi/Documents/cloud-photo-safari-aws;
    index  index.html index.htm;
  }
}
```

## create directories

```
mkdir /home/pi/Documents/cloud-photo-safari-aws
```

## create autostart

```
sudo su

apt-get update -y && apt-get upgrade -y
apt-get install -y unclutter

autostartFile=/home/pi/.config/lxsession/LXDE-pi/autostart
echo "" >> $autostartFile
echo "@unclutter" >> $autostartFile
echo "@chromium-browser --kiosk http://localhost/" >> $autostartFile

exit
```


# Deploy
```
set PI_LOGIN=pi@192.168.2.129

ng build --prod
scp -r www/* %PI_LOGIN%:/home/pi/Documents/cloud-photo-safari-aws/

ssh %PI_LOGIN% 'sudo reboot'
```
