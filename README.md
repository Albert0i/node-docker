# node-docker

```
To add an SSH key to your account, you must first have a key. You can generate one using the following commands:

ssh-keygen -t rsa -b 4096 -C "email@email.com"
ssh-add -K ~/.ssh-/id_rsa
Substitute “id_rsa” for the name of your key if you changed it when you were prompted to choose a key name from the first command. 

» MORE:  Git Log: How to Use It
Then, run the following command to see your public key:

cat ~/.ssh/id_rsa.pub
This will give you the string you need to upload into your version control system.
```

# Reference:
1. [Git Permission denied (publickey). fatal: Could not read from remote repository Solution](https://careerkarma.com/blog/git-permission-denied-publickey/)

EOF (2022/04/24))
