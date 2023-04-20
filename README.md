# 🍿 Movieshelf
An opensource movie, tv and cast catalog that uses The Movie Database API to fetch movies/tv data.
Take a look at this project running on https://movieshelf.app.

![Movieshelf showcase](./docs/movieshelf-showcase.gif)

## 📦 Dependencies
This project uses Create React APP, React Router, CSS modules and Context API. It also uses the
[@leandrowkz/tmdb](https://github.com/leandrowkz/tmdb) package to interact with the The Movie
Database API.

## ⏭️ Running locally
Since this is an free project, you're able to clone this repository and run it locally. The outcome
should be similar to the running website.

This project relies on [Vercel](https://vercel.com), especially for proxying api calls.
So before you start you'll need to [create a Vercel project](https://vercel.com/new) and attach it
to this repository (the copy you made it). You can use it the [Vercel CLI](https://vercel.com/docs/cli)
to do so. After creating and linking a Vercel project to the copy of this repository you need to
create an TMDB apikey and set it on your vercel project.

So, the steps you need to run this locally:
1. Install the [Vercel CLI](https://vercel.com/docs/cli)
2. Create a [new Vercel project](https://vercel.com/new)
3. Run `$ vercel link` to link your copied repository to your vercel created project
4. Create a [TMDB apikey](https://developers.themoviedb.org/3/getting-started/introduction)
5. Add the variable `REACT_APP_TMDB_API_ACCESS_TOKEN` to your Vercel project, with the value of TDMB apikey
6. Run `$ yarn` to install dependencies
7. Run `$ yarn start:dev` to start the project

If everything went right then you will have the project running on the http://localhost:3000.

## ☕ Contribute to this project
Help this project to be bigger by submitting a feature request, working on a new feature or
sponsoring it. Check it out the [project roadmap](https://github.com/users/leandrowkz/projects/1/views/1)
and the stay tuned for the upcoming features.

## 🎦 The Movie Database API
This product uses the TMDB API but is not endorsed or certified by TMDB.

All the information related to movies/tv displayed on carousels, lists, details, etc., comes from
the TMDB API. This is an incredible project that provides overall movies, tv and cast information
for those who need to their projects. A huge shout out to them for their amazing work and for making
this kind of projects (movieshelf) possible.

I recommend you to take a look at their [website](https://www.themoviedb.org/) and [join their
community](https://www.themoviedb.org/signup).

<p>
  <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" width="100">
</p>
