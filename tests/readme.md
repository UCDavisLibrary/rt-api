# Package Development

This is a convenience package. If your new feature won't make your life easier, don't code it.

```bash
cd src
npm i && npm link
```

```bash
cd tests
npm i && npm link @ucd-lib/rt-api
touch .env
echo 'TOKEN=xyz' >> .env
```