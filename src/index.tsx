import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/root'
import './assets/styles.css'
import reportWebVitals from './reportWebVitals'
import { MovieListsContextProvider } from './context/MovieListsContext'
import { NewsletterContextProvider } from './context/NewsletterContext'
import { TVShowListsContextProvider } from './context/TVShowListsContext'
import { TVSeasonDetailsContextProvider } from './context/TVSeasonDetailsContext'
import { GenresContextProvider } from './context/GenresContext'
import { AuthContextProvider } from './context/AuthContext'
import { UserListsContextProvider } from './context/UserListsContext'
import { ShowDetailsContextProvider } from './context/ShowDetailsContext'

const App = () => {
  return (
    <React.StrictMode>
      <AuthContextProvider>
        <GenresContextProvider>
          <UserListsContextProvider>
            <MovieListsContextProvider>
              <TVShowListsContextProvider>
                <TVSeasonDetailsContextProvider>
                  <ShowDetailsContextProvider>
                    <NewsletterContextProvider>
                      <RouterProvider router={router} />
                    </NewsletterContextProvider>
                  </ShowDetailsContextProvider>
                </TVSeasonDetailsContextProvider>
              </TVShowListsContextProvider>
            </MovieListsContextProvider>
          </UserListsContextProvider>
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
