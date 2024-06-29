import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  return (
    <div id="error-page">
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/*@ts-expect-error*/}
          {error.status} : {error.statusText || error.message}
        </i>
      </p>
    </div>
  )
}
