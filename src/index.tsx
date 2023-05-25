import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/root'
import './assets/styles.css'
import reportWebVitals from './reportWebVitals'
import { MovieListsContextProvider } from './store/MovieListsContext'
import { MovieDetailsContextProvider } from './store/MovieDetailsContext'
import { MovieGenresContextProvider } from './store/MovieGenresContext'
import { Root } from './pages/Root'
import { NewsletterContextProvider } from './store/NewsletterContext'

const App = () => {
  return (
    <React.StrictMode>
      <MovieGenresContextProvider>
        <MovieListsContextProvider>
          <MovieDetailsContextProvider>
            <NewsletterContextProvider>
              <Root>
                <RouterProvider router={router} />
              </Root>
            </NewsletterContextProvider>
          </MovieDetailsContextProvider>
        </MovieListsContextProvider>
      </MovieGenresContextProvider>
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
