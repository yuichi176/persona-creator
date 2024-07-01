import { useState } from 'react'
import { CreateFormDialog, FormValue } from '@/components/CreatePage/_component/CreateFormDialog'

export default function CreatePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(true)

  const handleSubmit = (values: FormValue) => {
    console.log(values)
    setIsDialogOpen(false)
  }

  return (
    <div>
      <CreateFormDialog isOpen={isDialogOpen} onSubmit={handleSubmit} />
      <div>Creating a persona...</div>
    </div>
  )
}
