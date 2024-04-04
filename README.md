# mediporta
mediporta - zadanie rekrutacyjne - Junior React Developer

# Windows user
## windows node update fot storybook init
installing storybook on wsl encounters permit errors
avoid by using PowerShell

upgrade node version to >=20
```
winget upgrade -q NodeJS
```
after that if you use wsl Ubuntu for further development 
- you need to change the path name in .storybook/main.js to Linux syntax
- might have to remove node_module directory and reinstall all dependencies *npm i* from bash console because initing storybook with Windows creates System conflicts within files.

## windows: wsl
switch to Ubuntu-20 or higher for access to Node.js versions >=18
```
wsl -l -v
wsl --distribution Ubuntu-20.04
```

if Ubuntu-20.04 (or higher) is not on the wsl version list (wsl -l -v) download it from Microsoft Store and launch to configure
then go back to powerShell and retry above commands

install node with nvm (https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl)
```
sudo apt-get update
sudo apt-get upgrade
sudo apt install npm

sudo apt-get install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
nvm ls
nvm install --lts
nvm ls
node -v 
```

now you can run storybok from wsl
```
npm run storybook
``` 
