import React, {
  type InputHTMLAttributes,
  type ReactNode,
  forwardRef,
} from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: 'small' | 'medium' | 'large'
  errorMessage?: ReactNode
  isRounded?: boolean
}

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      inputSize = 'medium',
      className,
      errorMessage,
      isRounded = false,
      ...props
    }: Props,
    ref
  ) => {
    const classes = classNames(styles.input, className, {
      [styles.small]: inputSize === 'small',
      [styles.large]: inputSize === 'large',
      [styles.rounded]: isRounded,
    })

    return (
      <div className={styles.container}>
        <input className={classes} {...props} ref={ref} />
        <ErrorMessage errorMessage={errorMessage} />
      </div>
    )
  }
)

function ErrorMessage({
  errorMessage,
}: Pick<Props, 'errorMessage'>): JSX.Element {
  if (!errorMessage) {
    return <></>
  }

  const classes = classNames(styles.descriptionText, styles.errorMessage)

  return <div className={classes}>{errorMessage}</div>
}
