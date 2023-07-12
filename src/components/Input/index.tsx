import React, {
  type InputHTMLAttributes,
  type ReactNode,
  forwardRef,
} from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'
import { useScreenSize } from '../../hooks/useScreenSize'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: 'small' | 'medium' | 'large'
  errorMessage?: ReactNode
}

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, Props>(
  ({ inputSize = 'medium', className, errorMessage, ...props }: Props, ref) => {
    const isMobile = useScreenSize('mobile')
    const classes = classNames(styles.input, className, {
      [styles.mobile]: isMobile,
      [styles.small]: inputSize === 'small',
      [styles.large]: inputSize === 'large',
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
