import React from 'react'
import ReactDOM from 'react-dom/client'
import 'the-new-css-reset/css/reset.css'
import './index.css'
import Layout from '@/components/Layout'
import PersonaCreatorPresentation from '@/components/PersonaCreatorPresentation'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout>
      <PersonaCreatorPresentation />
    </Layout>
  </React.StrictMode>,
)
