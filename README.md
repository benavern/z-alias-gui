# Z-ALIAS-GUI

> Edit your bash aliases the easy way

Why easy ? Well, it's a GUI ...

![Screenshot](/screenshot.png)
![Screenshot Dark](/screenshot-dark.png)

## About

This project provides an easy solution for using **aliases** from your command line. `z-alias-gui` solves the hassle of remembering how to create / edit / delete your aliases. You'll be able to do it on a simple GUI.

## Dependances

* [z-alias](https://github.com/benavern/z-alias) : manipulates the aliases file
* [Electron](https://www.electronjs.org/) : creates desktop app with js

## Config

In your `~/.bashrc`, `~/.zshrc`, ...

### Change aliases file path

You can change the default file path where your aliases will be stored

default: `~/.bash_aliases`

```
# Change aliases file path
export Z_ALIAS_FILE=/path/to/aliases
```

### Make your aliases available on all shells

You can make your aliases available on the shell you currently use by pasting this line just after you've used the app.

```
# Make aliases available
if [ -f ~/.bash_aliases ]; then source ~/.bash_aliases; fi
```

## Contribute

### Install dependancies

```bash
npm i
```

### Dev mode

```bash
npm run dev
```

### Package for your platform (test purpose)

```bash
npm run package
```

### Build for your platform (distribution purpose)

```bash
npm run build
```
