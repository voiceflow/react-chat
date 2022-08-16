OSS Template
=========================

## Semantic Release Setup steps:

### Update package.json
Go inside [/package.json](./package.json) and update all the `oss-template` references to the name of your package. This is especially important to update the `name`, `description`, and `author` (so you get the proper credit!).

### Give access
Give `vf-serviceaccount` and `Dev Team` access, "on Settings/Manage Access" - with WRITE access.
![Screen Shot 2021-09-27 at 12 06 54 PM](https://user-images.githubusercontent.com/5643574/134944856-43ca490f-d1b6-4bde-a7b8-b52b4365a801.png)

### Hook CircleCI
Reference your project on CircleCI:
https://app.circleci.com/projects/project-dashboard/github/voiceflow/

![Screen Shot 2021-09-27 at 12 02 56 PM](https://user-images.githubusercontent.com/5643574/134944358-9c4c1fac-ed20-4562-9d18-822c1e04741c.png)
![Screen Shot 2021-09-27 at 12 04 46 PM](https://user-images.githubusercontent.com/5643574/134944539-c243393c-f5a4-439f-b30a-9a24604072e0.png)

This hooks your repository with CircleCI and will trigger a CI/CD flow.

## Debugging
If husky or precommit doesn't seem to be working. Try running `git config --unset core.hookspath`