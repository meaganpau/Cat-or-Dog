# Cat or Dog?

A quick reflex game — decide cat or dog before the timer runs out.

## Local development

This is a static site — `style.css` is committed directly, no build step required to run it. Serve it with any local HTTP server:

```
npx serve . -p 3001
```

or

```
python3 -m http.server 3001
```

Then open the printed local URL (e.g. `http://localhost:3001`) in your browser.

### Don't open `index.html` directly (`file://`)

Same reason as any static-proxy site here: `index.html` sets its base URL at runtime via a small inline script at the top of `<head>`, so relative asset paths (`style.css`, `images/dog/1.jpg`, etc.) resolve correctly both on its own and when proxied under `/cat-or-dog` in production. That script assumes it's served over HTTP from the project root — on `file://` it breaks. Always use a local server as above.

### Updating styles

`style.css` is a generated file compiled from `dev/styles/*.scss`. The `gulp`/`node-sass` toolchain in `package.json` is legacy and predates modern Node — don't try to revive it. To recompile after editing the Sass source, use modern Dart Sass directly:

```
npx sass dev/styles/cod.scss style.css
```

Then commit the updated `style.css` along with your source changes.

## Deployment

Deployed on Vercel as its own project (currently `cat-or-dog-omega.vercel.app`), and also reachable at `meaganpau.com/cat-or-dog` via a rewrite rule in the `meaganpau-portfolio` project (see that project's `vercel.json`). The base-URL script in `index.html` checks `location.pathname` at load time and sets `<base href="/cat-or-dog/">` only when actually being served under that prefix — no build-time configuration needed.
