import { useCallback } from 'react'
import { CreateFormDialog, FormValue } from '@/components/CreatePage/_component/CreateFormDialog'
import { usePersonaStream } from '@/hooks/usePersonaStream.tsx'
import Markdown from 'react-markdown'
import styles from './CreatePage.module.css'
import { Link } from 'react-router-dom'

export default function CreatePage() {
  const { personaStream, generatePersonaProfile, resetPersonaStream } = usePersonaStream()

  const handleSubmit = useCallback(
    async (values: FormValue) => {
      await generatePersonaProfile(values.age, values.gender, values.location, values.otherFeatures)
    },
    [generatePersonaProfile],
  )

  const handleReGenerate = useCallback(() => {
    resetPersonaStream()
  }, [])

  return (
    <div>
      {(() => {
        switch (personaStream.status) {
          case 'before_generate':
            return <CreateFormDialog onSubmit={handleSubmit} />
          case 'loading':
            return <div>Creating a persona...</div>
          case 'error':
            return <div>Failed to create a persona</div>
          case 'generating':
            return <PersonaMarkdown persona={personaStream.data}></PersonaMarkdown>
          case 'success':
            return (
              <>
                <div className={styles.resultContainer}>
                  <PersonaMarkdown persona={personaStream.data}></PersonaMarkdown>
                </div>
                <div className={styles.buttonContainer}>
                  <Link to={'/'} className={styles.topButton}>
                    Top
                  </Link>
                  <button
                    type="button"
                    onClick={handleReGenerate}
                    className={styles.regenerateButton}
                  >
                    ReGenerate
                  </button>
                </div>
              </>
            )
        }
      })()}
    </div>
  )
}

const PersonaMarkdown = ({ persona }: { persona: string }) => {
  const formattedPersona = persona.replace(/\\n/g, '\n')
  return <Markdown className={styles.markdown}>{formattedPersona}</Markdown>
}
