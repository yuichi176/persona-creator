import { z } from 'zod'
import styles from './CreateFormDialog.module.css'
import { Link } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'

type CreateFormDialogProps = {
  isOpen: boolean
  onSubmit: (values: FormValue) => void
}

const formValueSchema = z.object({
  age: z
    .string()
    .refine((value) => !isNaN(Number(value)), { message: 'Age must be a number' })
    .refine((value) => Number(value) >= 0, { message: 'Age must be greater than 0' })
    .refine((value) => Number(value) <= 100, { message: 'Age must be less than 100' }),
  gender: z.string(),
  otherFeature: z.string().max(500, { message: "Other feature's length must be less than 500" }),
})
export type FormValue = z.infer<typeof formValueSchema>

export const CreateFormDialog = ({ isOpen, onSubmit }: CreateFormDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValue>({
    mode: 'onChange',
    defaultValues: {
      age: '25',
      gender: 'Male',
      otherFeature: '',
    },
    resolver: zodResolver(formValueSchema),
  })

  const generatePersona: SubmitHandler<FormValue> = useCallback(
    (values) => {
      onSubmit(values)
    },
    [onSubmit],
  )

  return (
    isOpen && (
      <form onSubmit={handleSubmit(generatePersona)}>
        <div className={styles.formFieldContainer}>
          <div className={styles.formField}>
            <label>
              <p className={styles.label}>Age</p>
              <input className={styles.numberInput} {...register('age')} />
            </label>
            <p className={styles.errorMessage}>{errors.age?.message}</p>
          </div>
          <div className={styles.formField}>
            <label>
              <p className={styles.label}>Gender</p>
              <select className={styles.select} {...register('gender')}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </label>
          </div>
          <div className={styles.formField}>
            <label>
              <p className={styles.label}>Other Feature</p>
              <textarea
                className={styles.textarea}
                rows={5}
                placeholder="Other features..."
                {...register('otherFeature')}
              />
            </label>
            <p className={styles.errorMessage}>{errors.otherFeature?.message}</p>
          </div>
        </div>
        <div className={styles.formButtonContainer}>
          <button type="submit" className={styles.submitButton} disabled={!isValid}>
            Create
          </button>
          <Link to={'/'} className={styles.cancelButton}>
            Cancel
          </Link>
        </div>
      </form>
    )
  )
}
