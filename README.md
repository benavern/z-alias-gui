# Z-ALIAS-GUI

> Edit your bash aliases the easy way

Why easy ? Well, it's a GUI ...

## About

This project provides an easy solution for using **aliases** from your command line. `z-alias` solves the hassle of remembering how to create / edit / delete your aliases.

It uses the [z-alias](https://github.com/benavern/z-alias) package.

## Config

In your `~/.bashrc`, `~/.zshrc`, ...

### Change aliases file path

You can change the default file path where your aliases will be stored

default: `~/.bash_aliases`

```
# Change aliases file path
export Z_ALIAS_FILE="/path/to/aliases"
```

### Make your aliases available on all shells

You can make your aliases available on the shell you use

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

### Build for your platform (test purpose)

```bash
npm run build
```

### Build for distribution

```bash
npm run dist
```
