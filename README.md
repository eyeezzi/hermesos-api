# HermeSOS

Schedule an SMS to your friend if you feel unsafe.

> * Hermes: Greek patron god of messengers
> * SOS: Morse code for *Help!*

## Dependencies

1. Node.js v10.4.1
2. npm v6.1.0

## Setup

	git clone <repo>
	cd <project>
	npm install
	npm run start

## Dev Notes

### Deployment to Heroku

You need:

1. Heroku CLI
2. *heroku-config* plugin. Install with `heroku plugins:install heroku-config`

Steps:

1. Create a heroku app `heroku create <app-name>`
2. Add your envars to heroku `heroku config:push --file <env-file>`
3. Push your code to heroku `git push heroku master`