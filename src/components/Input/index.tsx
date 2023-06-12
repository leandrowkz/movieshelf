import React, { InputHTMLAttributes, forwardRef } from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'
import { useScreenSize } from '../../hooks/useScreenSize'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: 'small' | 'medium' | 'large'
}

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, Props>(
  ({ inputSize = 'medium', className, ...props }: Props, ref) => {
    const isMobile = useScreenSize('mobile')
    const classes = classNames(styles.input, className, {
      [styles.mobile]: isMobile,
      [styles.small]: inputSize === 'small',
      [styles.large]: inputSize === 'large',
    })

    return <input className={classes} {...props} ref={ref} />
  }
)
