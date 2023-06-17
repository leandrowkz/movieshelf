import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/root'
import './assets/styles.css'
import reportWebVitals from './reportWebVitals'
import { Root } from './pages/Root'
import { MovieListsContextProvider } from './context/MovieListsContext'
import { MovieDetailsContextProvider } from './context/MovieDetailsContext'
import { NewsletterContextProvider } from './context/NewsletterContext'
import { TVShowListsContextProvider } from './context/TVShowListsContext'
import { TVShowDetailsContextProvider } from './context/TVShowDetailsContext'
import { TVSeasonDetailsContextProvider } from './context/TVSeasonDetailsContext'
import { GenresContextProvider } from './context/GenresContext'
import { AuthContextProvider } from './context/AuthContext'

const App = () => {
  return (
    <React.StrictMode>
      <AuthContextProvider>
        <GenresContextProvider>
          <MovieListsContextProvider>
            <MovieDetailsContextProvider>
              <TVShowListsContextProvider>
                <TVShowDetailsContextProvider>
                  <TVSeasonDetailsContextProvider>
                    <NewsletterContextProvider>
                      <Root>
                        <RouterProvider router={router} />
                      </Root>
                    </NewsletterContextProvider>
                  </TVSeasonDetailsContextProvider>
                </TVShowDetailsContextProvider>
              </TVShowListsContextProvider>
            </MovieDetailsContextProvider>
          </MovieListsContextProvider>
        </GenresContextProvider>
      </AuthContextProvider>
    </React.StrictMode>
  )
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement
)

root.render(<App />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)
