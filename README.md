# node-docker

### Note
<p>
<strong>git@github.com: Permission denied (publickey). <br />
fatal: Could not read from remote repository.</strong>
<p>
You may encounter this error if you have not yet added an SSH key to your version control account. 

1. Open GitHub, click on your avatar on the top-right corner and click “Settings”
Click “SSH and GPG keys” in the sidebar
2. Add an SSH key to your account
3. To add an SSH key to your account, you must first have a key. You can generate one using the following commands:
```
ssh-keygen -t rsa -b 4096 -C "email@email.com"
ssh-add -K ~/.ssh-/id_rsa
```
Substitute “id_rsa” for the name of your key if you changed it when you were prompted to choose a key name from the first command. 

4. Then, run the following command to see your public key:
```
cat ~/.ssh/id_rsa.pub
```
5. This will give you the string you need to upload into your version control system.

### Reference
[Git Permission denied (publickey). fatal: Could not read from remote repository Solution](https://careerkarma.com/blog/git-permission-denied-publickey/)

EOF (2022/04/24)
