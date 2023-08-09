import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/root'
import 'react-toastify/dist/ReactToastify.min.css'
import './assets/styles.css'
import reportWebVitals from './reportWebVitals'
import { GenresContextProvider } from './context/GenresContext'
import { AuthContextProvider } from './context/AuthContext'
import { NewsletterContextProvider } from './context/NewsletterContext'
import { MovieDetailsContextProvider } from './context/MovieDetailsContext'
import { MovieListsContextProvider } from './context/MovieListsContext'
import { TVShowDetailsContextProvider } from './context/TVShowDetailsContext'
import { TVShowListsContextProvider } from './context/TVShowListsContext'
import { TVSeasonDetailsContextProvider } from './context/TVSeasonDetailsContext'
import { UserListsContextProvider } from './context/UserListsContext'
import { SearchContextProvider } from './context/SearchContext'
import { PeopleContextProvider } from './context/PeopleContext'

const App = () => {
  return (
    <React.StrictMode>
      <AuthContextProvider>
        <GenresContextProvider>
          <UserListsContextProvider>
            <MovieDetailsContextProvider>
              <MovieListsContextProvider>
                <TVShowListsContextProvider>
                  <TVSeasonDetailsContextProvider>
                    <TVShowDetailsContextProvider>
                      <NewsletterContextProvider>
                        <SearchContextProvider>
                          <PeopleContextProvider>
                            <RouterProvider router={router} />
                          </PeopleContextProvider>
                        </SearchContextProvider>
                      </NewsletterContextProvider>
                    </TVShowDetailsContextProvider>
                  </TVSeasonDetailsContextProvider>
                </TVShowListsContextProvider>
              </MovieListsContextProvider>
            </MovieDetailsContextProvider>
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
